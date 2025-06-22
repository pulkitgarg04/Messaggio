# Messaggio

![Built with](https://img.shields.io/badge/Built_with-MERN_Stack-blue) ![LICENSE](https://img.shields.io/badge/LICENSE-MIT-green) ![Protocol](https://img.shields.io/badge/Protocol-Websocket-red)

![Messaggio](https://socialify.git.ci/pulkitgarg04/Messaggio/image?font=Source+Code+Pro&language=1&name=1&owner=1&theme=Dark)

**Messaggio** is a real-time chat application built with the MERN stack. It features WebSocket-based instant messaging, secure user authentication, and image sharing capabilities. The app is designed to provide a seamless communication experience with a modern UI and backend.

## Features
- **Real-Time Messaging**: Instant chat using WebSockets.
- **User Authentication**: Secure signup and login with JWT.
- **Image Sharing**: Upload and share images in chat via Cloudinary.
- **Online User Tracking**: Displays a list of currently online users.
- **Recent Chats**: Shows the most recent chats with the latest messages.

## Tech Stack
- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB
- **Cloud Storage**: Cloudinary (for image uploads)

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.0.0)
- MongoDB (local or Atlas)
- Cloudinary Account (for image uploads)

### Installation
- Clone the repository:
    ```bash
    git clone https://github.com/pulkitgarg04/messaggio.git
    cd messaggio
    ```

#### Server Setup:
- Navigate to the server folder:
    ```bash
    cd server
    ```

- Install dependencies:
    ```bash
    npm install
    ```

- Copy `.env.example` file to `.env` file:
    ```env
    PORT=5000
    MONGODB_URL=<your-mongodb-url>
    JWT_SECRET=<your-jwt-secret>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    ```

- Start the server:
    ```bash
    npm start
    ```

#### Frontend Setup:

- Navigate to the frontend folder:
    ```bash
    cd ../client
    ```

- Install dependencies:
    ```bash
    npm install
    ```

- Start the frontend:
    ```bash
    npm start
    ```

- Access the App:
    - Open your browser and navigate to: http://localhost:5173.

## Usage
1. Login/Signup: Create an account or log in with existing credentials.
2. Start a Chat: Select a user from the sidebar to start chatting.
3. Share Images: Upload images to enrich your conversations.
4. See Who’s Online: Check the list of currently active users.

## Contribution
Contributions are welcome! If you’d like to improve the app or add new features:

- Fork the repository.
    - Create a new branch:
        ```bash
        git checkout -b feature-name  
        ```
- Commit your changes:
    ```bash
    git commit -m "Add feature-name"  
    ```
- Push to the branch:
    ```bash
    git push origin feature-name  
    ```
- Open a Pull Request.

## License
This project is licensed under the MIT License (LICENSE). See the [LICENSE](LICENSE) file for details.