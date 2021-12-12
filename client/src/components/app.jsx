import React, {useState, useEffect} from "react";
import { io } from "socket.io-client";
import Header from "./header";
import Input from "./input";
import Item from "./item";

export default function App() {

    //states
    const [items, setItems] = useState([]);
    const [socket, setSocket] = useState(null);

    // establish socket connection
    useEffect(() => {
        setSocket(io('http://192.168.0.11:3001'));
    }, []);

    //fetching data from api on every render
    useEffect( () => {
        if (!socket) return;

        socket.on('fromServer', (data) => {
            setItems([]);
            if(data.Message) {
                console.log(data.Message);
            } else {
                for (const e of data) {
                    setItems( (prevItems) => {
                        return [...prevItems,e.name];
                    });
                }
            }
        });

        return () => socket.disconnect();
    },[socket]);

    //function to add item to our array
    function addItem(input) {
        socket.emit('input', input);
    }

    //function to delete an item from our array
    function deleteItem(name) {
        socket.emit('delete', name);
    }

    //function to edit an item in our array
    function editItem(id, oldText, newText) {
        socket.emit('update', oldText, newText);
    }

    return (
        <div>
            <Header/>
            <Input onAdd={addItem} />
            <div>
                <ul className="list-group">
                    {items.map((todoItem, index) => (
                        <Item
                            key={index}
                            id={index}
                            text={todoItem}
                            onDelete={deleteItem}
                            onEdit={editItem}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}