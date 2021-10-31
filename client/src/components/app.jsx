import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./header";
import Input from "./input";
import Item from "./item";

export default function App() {

    //state
    const [items, setItems] = useState([]);

    //fetching data from api on every render
    useEffect( () => {
        axios.get('http://localhost:3001/api/home').then(res => {
            setItems([]);
            if(res.data.Message) {
                console.log(res.data.Message);
            } else {
                for (const e of res.data) {
                    setItems( (prevItems) => {
                        return [...prevItems,e.name];
                    });
                }
            }
        });
    },[]);

    //fucntion to add item to our array
    function addItem(input) {

        axios.post('http://localhost:3001/api/',{newItem: input}).then( res => {
            setItems([]);
            for (const e of res.data) {
                setItems( (prevItems) => {
                    return [...prevItems,e.name];
                });
            }
        });
    }

    //function to delete an item from our array
    function deleteItem(name,id) {

        axios.delete('http://localhost:3001/api/',{ data: { itemName: name } });
        setItems(prevItems => {
            return prevItems.filter((item, index) => {
                return index !== id;
            });
        });
    }

    //function to edit an item in our array
    function editItem(id, oldText, newText) {

        axios.put('http://localhost:3001/api/', { oldItem: oldText, newItem: newText});
        items[id] = newText;
        setItems( (prevItems) => {
            return [...prevItems];
        });
    }

    //function to mark an item in our array
    function markItem(name) {
        axios.post('http://localhost:3001/api/mark',{itemName: name}).then( res => {
            console.log(res.data);
        });
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
                            onMark={markItem}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}