# Use the official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy the backend directory files into the container at /usr/src/app
COPY ./ /usr/src/app

# Install the application dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start:prod"]