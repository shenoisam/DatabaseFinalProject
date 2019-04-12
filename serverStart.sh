echo "Starting up backend web API" 
cd backendAPI 
echo "Installing npm packages...this might take some time" 
npm install 
echo "Running the backend website in the background. It will close once you close your terminal session"
npm start &
cd ..
cd frontend
echo "Installing frontend packages...this might take some time" 
npm install 
echo "Starting up front end" 
npm start 
