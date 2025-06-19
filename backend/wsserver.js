const ws = require('ws');
const ChatModel = require('./model/ChatModel')
require('dotenv').config();


/** Limiting the query */
const DOC_LIMIT = 50;


module.exports = (httpServer)=>{

    const wsServer = new ws.WebSocketServer({
        server: httpServer,
        path: '/ws',
    })


    /** broadcasting to all other connected clients */
    const BroadcastMessage=(msg,wss)=>{
        wsServer.clients.forEach((client)=>{
            if(client.readyState===ws.WebSocket.OPEN && client!==wss){
                client.send(JSON.stringify({type:'message', message:msg}));
            }
        })
    }

    wsServer.on('connection',(ws)=>{
        console.log('New client connected!');
        /**
         * @event receive_message_from_clients 
         * if username not provided , throws an error
         */
        ws.on('message',async(message)=>{
        try {
            
                const msg = await JSON.parse(message);
                /** client has recently connected */
                if(msg.type==="join"){  
                    if(!msg.username || msg.username.length===0){
                        throw new Error("No username");
                    }
                    const queries = await ChatModel.find().sort({createdAt: -1}).limit(DOC_LIMIT)
                    ws.send(JSON.stringify({type:"history", message:queries.reverse()}));

                }
                else {
                    /** normal messages */
                    if(!msg.username){
                        throw new Error("No username");
                    }
                    await ChatModel.create({
                        username: msg.username,
                        message: msg.message,
                    })
                    .then(()=>{
                        console.log("Message saved successfully");
                    })
                    .catch(err=>{
                        console.error(err);
                        throw new Error("Internal Server Error")
                    })
                    const doc = {
                        username: msg.username,
                        message: msg.message,
                        createdAt: new Date().toISOString()
                    }
                    BroadcastMessage(doc,ws);
                    
                }

        }
        catch(err){
            ws.send(JSON.stringify({type:'error', message:err.message}))
        }
        
        })

        /**
         * @event client_socket_closing
         */
        ws.on('close',()=>{
            console.log('A client disconnected!')
        })
    })


    wsServer.on('close',()=>{
        console.log("Error occurred")
    })
}