# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY angular.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port (e.g., 4200) that your Angular app is running on
EXPOSE 4200

# Define the command to start your Angular app
CMD ["npm", "start"]
