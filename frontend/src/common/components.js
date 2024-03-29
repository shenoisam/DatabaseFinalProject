import _ from 'lodash';
import React from 'react';
import ReactSelect from 'react-select';
import * as ReduxForm from 'redux-form';
import * as Utils from './../alloy/utils/core-utils';
import * as Validation from './../alloy/utils/validation';
import * as Recharts from 'recharts'
const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;





function buildReduxValidator(validator, props) {
	return value => validator.spec(value) ? undefined : validator.error(props, value);
}

export class Select extends React.Component {
	render() {
		const { value, onBlur, onChange, mapper, options, clearable, ...props } = this.props;

		let resolvedMapper = i => i;
		if(!_.isNil(mapper)) {
			resolvedMapper = mapper;
		}

		let mappedValues = _.mapValues(_.groupBy(options, option => resolvedMapper(option.value)), ([element]) => element);
		let mappedOptions = _.map(options, ({label, value}) => ({label, value: resolvedMapper(value)}));

		let wrappedChange = (value) => {
			let resolvedValue = null;
			if(!_.isNil(value)) {
				resolvedValue = mappedValues[value.value].value;
			}

			onChange(resolvedValue);
		};

		let internalValue = '';
		if(!_.isNil(value) && value !== '') {
			internalValue = resolvedMapper(value);
		}

		let wrappedOnBlur = null;
		if(!_.isNil(onBlur)) {
			wrappedOnBlur = () => onBlur(value);
		}

		let clearAllowed = false;
		if(!_.isNil(clearable)) {
			clearAllowed = clearable;
		}

		return <ReactSelect
			clearable={clearAllowed}
			className={props.className}
			value={internalValue} // because react-select doesn't like the initial value of undefined
			onChange={wrappedChange}
			onBlur={wrappedOnBlur} // just pass the current value (updated on change) on blur
			options={mappedOptions}
			{...props} />;
	}
}

export class Field extends React.Component {
	getReifiedProps = () => {
		let reifiedProps = _.clone(this.props);
		if(_.isNil(reifiedProps.field)) {
			reifiedProps.field = <input className="form-control" placeholder="Value" />;
		}

		if(_.isNil(reifiedProps.label)) {
			reifiedProps.label = {type: 'text', text: reifiedProps.friendlyName};
		}

		this.reifiedProps = reifiedProps;

		return reifiedProps;
	};

	buildLabel = ({ label, validators }) => {
		return (
			<label className={this.props.stacked ? '' : 'col-4 col-Form.js-label'}>
				{ label.text }
				{ validators.map(validator => validator.spec).includes(Validation.required) && <span className="required">*</span> }
			</label>
		);
	};

	buildField = ({ field }, input) => {
		let resolvedField = null;

		if(_.isObject(field)) {
			resolvedField = Utils.extendComponent(field, input);
		}

		return resolvedField;
	};

	hasError = ({ touched, error }) => {
		return touched && error;
	};

	buildMessaging = (props, meta) => {
		if(!this.hasError(meta)) {
			return null;
		}

		return (
			<div className="alert alert-danger">
				<strong><span className="fa fa-warning" /></strong> { meta.error }
			</div>
		);
	};

	//TODO this could be more efficient
	renderField = ({ input, meta }) => {
		let props = this.getReifiedProps();

		let field = this.buildField(props, input);
		if(field.props.type === 'checkbox') {
			let { label, validators } = props;
			let resolvedCheckbox = null;
			if(_.isObject(field)) {
				resolvedCheckbox = Utils.extendComponent(field, {checked: field.props.value});
			}

			return (
				<div className={'Form.js-group ' + this.props.className}>
					<div className="form-check">
						{ resolvedCheckbox }
						{
							<label className={'Form.js-check-label'}>
								{ label.text }
								{ validators.map(validator => validator.spec).includes(Validation.required) && <span className="required">*</span> }
							</label>
						}
						{ this.buildMessaging(props, meta) }
					</div>
				</div>
			);
		}
		if(props.decorate) {
			return (
				<div>
					<div className={'Form.js-group' + (this.hasError(meta) ? ' has-error' : '') + (props.stacked ? '' : ' row')}>
						{ props.showLabel && this.buildLabel(props) }
						<div className={props.stacked ? '' : ('col-' + (props.showLabel ? '8' : '12'))}>
							{ field }
						</div>
					</div>
					{ this.buildMessaging(props, meta) }
				</div>
			);
		}
		else {
			if(this.hasError(meta)) {
				let className = field.props.className + ' has-error';
				return Utils.extendComponent(field, {className});
			}
			return field;
		}
	};

	render() {
		let props = this.getReifiedProps();

		return <ReduxForm.Field name={ props.name }
		              component={ this.renderField }
		              validate={ props.validators.map(validator => buildReduxValidator(validator, props)) } />;
	}
}

Field.defaultProps = {
	validators: [],
	showLabel: true,
	decorate: true,
	stacked: false
};

export class Button extends React.Component {
	static defaultProps = {
		className: 'btn btn-primary'
	};

	render() {
		let { children, className, disabled, loadingText, loading, ...props } = this.props;
		disabled = disabled || loading;
		if(_.isNil(loadingText)) {
			loadingText = children;
		}

		let buttonText = loading ? (<span>{loadingText} <span className="fa fa-spinner spinner"/></span>) : children;
		return <button disabled={disabled} className={className} {...props}>{buttonText}</button>;
	}
}





export class BarExample extends React.Component {
	constructor(props){
		super(props);
	
		this.state = {
			myData: [],
			rendered: false,
		};
	}

	async componentDidMount(){

		console.log("Data: ",this.props.data)
		this.state.myData= this.props.data
		this.setState(this.state);

	}
  
	render() {
		const myArray = [];
		for(let i = 0; i < this.state.myData.length; i = i + 3){
			myArray.push(
				<tr>
					<td style={{width: '15%', border : '1px solid black'}}>
						{this.state.myData[i].name}
					</td>
					<td style={{width : '15%',border : '1px solid black'}}>
						{this.state.myData[i].pv}
					</td>
					<td style={{width: '15%',border : '1px solid black'}}>
						{this.state.myData[i+1].name}
					</td>
					<td style={{width : '15%',border : '1px solid black'}}>
						{this.state.myData[i+1].pv}
					</td>
					<td style={{width: '15%',border : '1px solid black'}}>
						{this.state.myData[i+2].name}
					</td>
					<td style={{width : '15%',border : '1px solid black'}}>
						{this.state.myData[i+2].pv}
					</td>
					
				</tr>
			)
		}
	  return (
		<div>
			<div className="container padded">
						{/* display info in a chart */}
						{this.state.myData.length === 0 &&
							<div>
								No Sections During This Semester
							</div>
						}
						{myArray.length !== 0 &&
							<table style = {{width: '100%', border: '1px solid black'}}>
								{myArray}
							</table>
						}
						

					</div>
			
		</div>
	  );
	}
  }






