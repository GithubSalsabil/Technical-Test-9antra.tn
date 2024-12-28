# Landing Page & Admin Interface with CRUD Operations

This project demonstrates how to build a landing page and an admin interface with CRUD operations using **Node.js**, **React**, and **MongoDB**.


Demo LandingPage AdminPanel: https://github.com/user-attachments/assets/b0ffc579-7182-44dc-ac53-b9b7631ec58b




## Project Structure

The project is divided into two main parts:
- **Backend**: Built with Node.js and MongoDB to handle the server-side logic and database interactions.
- **Frontend**: Built with React to manage the user interface and provide an admin panel for managing data.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **React**: JavaScript library for building user interfaces.
- **Axios**: HTTP client for making requests from React to Node.js.
- **Mongoose**: MongoDB object modeling tool for Node.js.

## Features

- **Landing Page**: A simple landing page to display general information.
- **Admin Interface**: A user-friendly admin interface to manage data (Create, Read, Update, Delete operations).
- **CRUD Operations**: Fully functional admin dashboard for managing resources in the database.
- **MongoDB Database**: Stores user data, which can be accessed or modified by the admin.

## Backend Setup

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB

### Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/your-repository-name
    cd backend_node
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file to store your MongoDB URI and other environment variables:
    ```bash
    MONGO_URI=your-mongodb-uri
    ```

4. Start the server:
    ```bash
    node app.js
    ```

The server should now be running on `http://localhost:5000`.

## Frontend Setup

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm

## Usage

1. **Landing Page**: The landing page is accessible at the root of the React app. It contains general information about the application.
2. **Admin Interface**: Navigate to `/admin` to access the admin dashboard, where you can perform CRUD operations on data.
3. **Perform CRUD Operations**: Use the buttons in the admin interface to create, read, update, or delete items in the database.

## API Endpoints

### GET `/api/items`
Fetches all items from the database.

### POST `/api/items`
Creates a new item in the database.

### PUT `/api/items/:id`
Updates an existing item by its ID.

### DELETE `/api/items/:id`
Deletes an item by its ID.



