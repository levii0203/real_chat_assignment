# real_chat_assignment
Chat Application

This is a real-time chat application built with a Node.js/Express backend, MongoDB for persistent storage, and WebSocket for bi-directional communication. The frontend is a JavaScript-based client that connects to the backend via WebSocket to send and receive messages. The application supports user joining, message broadcasting, and chat history retrieval.
Table of Contents

Local Setup and Running Instructions:

Backend Setup
Frontend Setup

Architecture Overview
Concurrency Handling
WebSocket Communication


Assumptions and Design Choices
Deployed Application Access

Local Setup and Running Instructions
Backend Setup
The backend is located in the backend folder and uses Node.js, Express, MongoDB, and the ws library.
Prerequisites:

Node.js (v18 or higher)
MongoDB (local or cloud instance, e.g., MongoDB Atlas)
Git

Steps:

Clone the Repository:
    git clone https://github.com/levii0203/real_chat_assignment
    cd backend


Install Dependencies:
    npm install


Set Up Environment Variables:

Create a .env file in the backend folder:
    PORT=5000
    MONGO_URI=mongodb+srv://......


Replace MONGO_URI with your MongoDB connection string (local or cloud).


Run the Backend:
    npm run dev 


The server runs on http://localhost:5000.
WebSocket is available at ws://localhost:3000/ws.


Test the API:

Access http://localhost:3000/ to verify the server is running (returns { "message": "api/v1" }).


Test WebSocket:

Use wscat to connect:npm install -g wscat
    wscat -c ws://localhost:3000/ws


Send a join message:{"type":"join","username":"testUser"}
Expect a chat history response.


Frontend Setup
The frontend is located in the frontend folder and is assumed to be a JavaScript-based client (e.g., React or vanilla JS).
Prerequisites:

Node.js (v18 or higher)
A modern browser

Steps:

Navigate to Frontend Folder:
    cd frontend


Install Dependencies:
    npm install


Set Up Environment Variables (if applicable):

For React, create a .env file in the frontend folder:REACT_APP_WS_URL=ws://localhost:3000/ws


Adjust REACT_APP_WS_URL if using a different port.


Run the Frontend:
    npm start


The frontend typically runs on http://localhost:5173 (or another port, e.g., 3000 for Create React App).
Open the URL in your browser to access the chat interface.


Test WebSocket Connection:

Open the browser’s developer console (F12 > Console).
Join the chat with a username and send messages.
Verify messages are received and broadcasted to other clients.



Architecture Overview
The application follows a client-server architecture with a Node.js/Express backend, MongoDB for persistence, and a WebSocket-based frontend for real-time communication.

Backend:

Express Server: Handles HTTP requests (e.g., health check at /).
WebSocket Server: Uses the ws library, attached to the same HTTP server, listening on /ws.
MongoDB: Stores chat messages with a schema including username, message, and createdAt.
Components:
index.js: Initializes Express and HTTP server, integrates WebSocket.
wsserver.js: Manages WebSocket connections, message broadcasting, and chat history retrieval.
db/dbConnect.js: Establishes MongoDB connection.
model/ChatModel.js: Defines the chat message schema.




Frontend:

A JavaScript client (e.g., React) connects to the WebSocket at ws://localhost:3000/ws (local) or wss://my-backend.onrender.com/ws (deployed).
Sends messages with types (join for history, message for chat).
Displays chat history and real-time messages.



Concurrency Handling

WebSocket Connections: The ws library maintains a set of connected clients (wsServer.clients). Each client has a unique WebSocket instance (ws).
Message Broadcasting: When a client sends a message, the server saves it to MongoDB and broadcasts it to all other connected clients using BroadcastMessage. This ensures real-time updates without polling.
Database Operations: MongoDB queries (e.g., ChatModel.create, ChatModel.find) are asynchronous (async/await) to prevent blocking the event loop.
Scalability Considerations:
Node.js’s single-threaded event loop handles concurrent WebSocket connections efficiently for small to medium loads.
For high concurrency, consider clustering or load balancing (not implemented here).



WebSocket Communication

Protocol: WebSocket (ws:// locally, wss:// on Render) on the /ws path.
Message Types:
join: Sent when a client connects with a username; server responds with chat history (last 50 messages).
message: Sent for regular chat messages; server saves to MongoDB and broadcasts to other clients.
error: Sent by server for invalid messages (e.g., missing username).


Flow:
Client connects to ws://localhost:3000/ws and sends { type: "join", username: "testUser" }.
Server retrieves chat history from MongoDB and sends it as { type: "history", message: [...] }.
Client sends { type: "message", username: "test", message: "hello" }.
Server saves the message and broadcasts { type: "message", message: { username, message, createdAt } } to other clients.



Assumptions and Design Choices

Assumptions:
Users provide unique usernames for identification (no authentication implemented).
MongoDB is used for persistent storage; a local or cloud instance is available.
Frontend is a JavaScript-based client capable of WebSocket communication.
Render is used for deployment with a single Web Service (HTTP and WebSocket on one port).


Design Choices:
Single Port: WebSocket and HTTP share the same port (process.env.PORT) to comply with Render’s architecture and simplify deployment.
WebSocket Path (/ws): Distinguishes WebSocket traffic from HTTP routes.
Message Limit (50): Limits chat history to 50 messages to optimize performance.
No Authentication: Simplifies the prototype; production would require user authentication and session management.
Error Handling: Client-side errors (e.g., missing username) are sent as WebSocket messages; server-side errors are logged for debugging.
CORS: Configured to allow frontend connections from specific origins (e.g., http://localhost:5173 locally, frontend URL on deployment).



Deployed Application Access
The application is deployed on Render, with the backend and WebSocket hosted on a single Web Service.

Backend URL: https://my-backend.onrender.com
Health check: https://my-backend.onrender.com/ (returns { "message": "api/v1" }).


WebSocket URL: wss://my-backend.onrender.com/ws
Frontend URL: (Replace with your frontend’s deployed URL, e.g., https://my-frontend.vercel.app)

Access Instructions:

Open the Frontend:
Visit the frontend URL in a browser.
Enter a username to join the chat.
Send and receive messages in real-time.


Test WebSocket:
Use a WebSocket client (e.g., Postman or wscat):wscat -c wss://my-backend.onrender.com/ws


Send:{"type":"join","username":"testUser"}


Receive chat history and broadcasted messages.


Notes:
Render’s free tier spins down after 15 minutes of inactivity, causing WebSocket disconnections. A paid plan is recommended for production.
Ensure your frontend is configured to use wss://my-backend.onrender.com/ws.
If CORS errors occur, verify the backend’s CORS configuration allows your frontend’s URL.



Troubleshooting:

Check Render logs in the dashboard for backend errors.
Ensure MONGO_URI is set in Render’s environment variables.
Contact the repository owner for deployment-specific issues.

