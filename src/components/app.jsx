import React, {useState} from "react";
import Header from "./header";
import Input from "./input";
import Item from "./item";

export default function App() {

    //state
    const [items, setItems] = useState([]);

    //fucntion to add item to our array
    function addItem(input) {
        setItems( (prevItems) => {
            return [...prevItems,input];
        });
    }

    //function to delete an item from our array
    function deleteItem(id) {
        setItems(prevItems => {
          return prevItems.filter((item, index) => {
            return index !== id;
          });
        });
    }

    //function to edit an item in our array
    function editItem(id, newText) {

        items[id] = newText;
        setItems( (prevItems) => {
            return [...prevItems];
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
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
