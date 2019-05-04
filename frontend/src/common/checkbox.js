import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
    state = {
        isChecked: this.props.defaultCheck,
    };

    toggleCheckboxChange = () => {
        const {handleCheckboxChange, name} = this.props;

        this.setState(({isChecked}) => (
            {
                isChecked: !isChecked,
            }
        ));

        handleCheckboxChange(name);
    };

    render() {
        const {label, name} = this.props;
        const {isChecked} = this.state;

        return (
            <label>
                <input
                    type="checkbox"
                    value={name}
                    checked={isChecked}
                    onChange={this.toggleCheckboxChange}
                    className={'mx-2'}/>
                {label}
            </label>
        );
    }
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    defaultCheck: PropTypes.bool,
};

export default Checkbox;
