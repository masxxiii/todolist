//Modules
const express = require("express");
const cors = require("cors");
const app = express();
const Todo = require("../src/controllers/ToDo");

//access-control-allow-credentials:true
const corsOptions ={
    origin: "*"
}

//The middleware for parsing and configuring
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));

const PORT = process.env.port || 3001;

let httpServer = app.listen(PORT, function(){
    console.log("Server is running on port " + PORT +".");
});

const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
    }
});
io.on('connection', async (socket) => {

    console.log('A user has connected.');

    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    });
    let data = await new Todo().getItems();
    socket.emit('fromServer', data);

    socket.on('input', async (itemNew) => {
        new Todo().addItem(itemNew);
        let data = await new Todo().getItems();
        socket.emit('fromServer', data);
    });

    socket.on('update', async (itemOld,itemNew) => {
        new Todo().updateItem(itemOld,itemNew);
        let data = await new Todo().getItems();
        socket.emit('fromServer', data);
    });

    socket.on('delete', async (itemName) => {
        new Todo().deleteItem(itemName);
        let data = await new Todo().getItems();
        socket.emit('fromServer', data);
    });
});
