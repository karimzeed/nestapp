# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Expose the port on which your Nest.js app is running (replace 3000 with your actual port if different)
EXPOSE 3000

# Set the command to run your Nest.js app
CMD [ "npm", "run" , "start"]
