# Klontongpedia

This repository contains the take-home test project for BRIK.

## Key Features

- Mobile-friendly user interface
- Product search functionality
- Feature to add new products
- Authentication

## Pre-requisites

Ensure that the following tools are installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Install Docker and Docker Compose:**
   - Follow the installation guide for [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

3. **Check Port Availability:**
   - Ensure the ports `5432`, `3000`, and `3001` are not in use on your machine.

4. **Build and Run the Docker Containers:**
   ```bash
   docker-compose up --build
   ```
   - Wait for the frontend service to become ready. This may take a few minutes.

5. **Access the Application:**
   - Open your web browser and navigate to [http://localhost:3001](http://localhost:3001).

6. **Log In:**
   - To log in as a seeded user, use the following credentials:
     - Username: `default`
     - Password: `password123`

## Additional Information

- If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
