# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container
COPY ./ /usr/src/app

# Install the project dependencies
RUN npm install

# Build the project
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]
