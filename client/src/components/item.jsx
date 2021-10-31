import React, { useState } from "react";
import axios from "axios";

export default function Item(props) {

    //state
    const [isDone,setIsDone] = useState(false);

    //fetch the mark data about the item
    axios.get('http://localhost:3001/api/home').then(res => {
        if(res.data.Message) {
            console.log(res.data.Message);
        } else {
            for (const e of res.data) {
                if(e.name === props.text) {
                    setIsDone(e.checked);
                }
            }
        }
    });

    //function to check for user's click on the text
    function handleClick() {
        setIsDone(!isDone);
        props.onMark(props.text);
    }

    //functions for delete and edit buttons
    function handleDelete() {
        props.onDelete(props.text,props.id);
    }

    function handleEdit() {
        var editText = window.prompt("What do you want to change the item with ?");
        props.onEdit(props.id,props.text,editText);
    }

    return (
        <div className="container">
            <li onClick={handleClick} className="list-group-item list-Of-Items p-2" 
                style={{ textDecoration: isDone ? "line-through" : "none" }}> {props.text}
            </li>
            <button onClick={handleDelete} type="submit" className="btn btn-danger btns-Of-List">Delete</button>
            <button onClick={handleEdit} type="submit" className="btn btn-warning btns-Of-List">Edit</button>
        </div>
    );
}