## REAL CHAT APPLICATION

##INSTALLATION 

>>Clone the repository 
git clone <repo-url>

#BACKEND 

>>Install Dependencies:
npm install

>>Run the server:
npm run dev

>>Setup Envionment Variables

MONGODB_URI = mongodb+srv.....
PORT = 5000

#NOTE:  Replace MONGO_URI with your MongoDB connection string (local or cloud).

>>Test Websocket

npm install -g wscat
wscat -c ws://localhost:3000/ws

Send a join message:
{"type":"join","username":"test"}

Expect a chat history response.

#FRONTEND

>>Install Dependencies
npm install


Architecture Overview

The application follows a client-server architecture with a Node.js/Express backend, MongoDB for persistence, and a WebSocket-based frontend for real-time communication.


#Backend:
Express Server: Handles HTTP requests (e.g., health check at /).



WebSocket Server: Uses the ws library, attached to the same HTTP server, listening on /ws.



MongoDB: Stores chat messages with a schema including username, message, and createdAt.



>>Components:

index.js: Initializes Express and HTTP server, integrates WebSocket.



wsserver.js: Manages WebSocket connections, message broadcasting, and chat history retrieval.



db/dbConnect.js: Establishes MongoDB connection.



model/ChatModel.js: Defines the chat message schema.



#Frontend:



A JavaScript client (e.g., React) connects to the WebSocket at ws://localhost:3000/ws (local) or wss://my-backend.onrender.com/ws (deployed).



Sends messages with types (join for history, message for chat).



Displays chat history and real-time messages.

>>Concurrency Handling
WebSocket Connections: The ws library maintains a set of connected clients (wsServer.clients). Each client has a unique WebSocket instance (ws).



Message Broadcasting: When a client sends a message, the server saves it to MongoDB and broadcasts it to all other connected clients using BroadcastMessage. This ensures real-time updates without polling.



Database Operations: MongoDB queries (e.g., ChatModel.create, ChatModel.find) are asynchronous (async/await) to prevent blocking the event loop.



>>Scalability Considerations:
Node.js’s single-threaded event loop handles concurrent WebSocket connections efficiently for small to medium loads.



For high concurrency, consider clustering or load balancing (not implemented here).

WebSocket Communication





Protocol: WebSocket (ws:// locally, wss:// on Render) on the /ws path.



>>Message Types:
join: Sent when a client connects with a username; server responds with chat history (last 50 messages).



message: Sent for regular chat messages; server saves to MongoDB and broadcasts to other clients.



error: Sent by server for invalid messages (e.g., missing username).



>>Flow:
Client connects to ws://localhost:3000/ws and sends { type: "join", username: "test" }.



Server retrieves chat history from MongoDB and sends it as { type: "history", message: [...] }.



Client sends { type: "message", username: "test", message: "hello" }.



Server saves the message and broadcasts { type: "message", message: { username, message, createdAt } } to other clients.

Assumptions and Design Choices





>>Assumptions:

Users provide unique usernames for identification (no authentication implemented).



MongoDB is used for persistent storage; a local or cloud instance is available.



Frontend is a JavaScript-based client capable of WebSocket communication.



Render is used for deployment with a single Web Service (HTTP and WebSocket on one port).



>>Design Choices:

Single Port: WebSocket and HTTP share the same port (process.env.PORT) to comply with Render’s architecture and simplify deployment.



WebSocket Path (/ws): Distinguishes WebSocket traffic from HTTP routes.



Message Limit (50): Limits chat history to 50 messages to optimize performance.



No Authentication: Simplifies the prototype; production would require user authentication and session management.



Error Handling: Client-side errors (e.g., missing username) are sent as WebSocket messages; server-side errors are logged for debugging.



CORS: Configured to allow frontend connections from every origins


#Deployed Application Access

The application is deployed on Render, with the backend and WebSocket hosted on a single Web Service.


Backend URL: https://my-backend.onrender.com

Health check: https://my-backend.onrender.com/ (returns { "message": "api/v1" }).

WebSocket URL: wss://my-backend.onrender.com/ws



Frontend URL: (Replace with your frontend’s deployed URL, e.g., https://my-frontend.vercel.app)

>>Access Instructions:


Open the Frontend:


Visit the frontend URL in a browser.



Enter a username to join the chat.



Send and receive messages in real-time.



Test WebSocket:





Use a WebSocket client (e.g., Postman or wscat):

wscat -c wss://my-backend.onrender.com/ws



Send:

{"type":"join","username":"test"}



Receive chat history and broadcasted messages.



Notes:





Render’s free tier spins down after 15 minutes of inactivity, causing WebSocket disconnections. A paid plan is recommended for production.



Ensure your frontend is configured to use wss://my-backend.onrender.com/ws.



If CORS errors occur, verify the backend’s CORS configuration allows your frontend’s URL.













