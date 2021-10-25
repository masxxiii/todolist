import React, { useState } from "react";

export default function Item(props) {

    //state
    const [isDone,setIsDone] = useState(false);

    //function to check for user's click on the text
    function handleClick() {
        setIsDone( (prevValue) => {
            return !prevValue;
        });
    }

    //functions for delete and edit buttons
    function handleDelete() {
        props.onDelete(props.id);
    }

    function handleEdit() {
        var editText = window.prompt("What do you want to change the item with ?");
        props.onEdit(props.id,editText);
    }

    return (
        <div className="container">
            <li onClick={handleClick} class="list-group-item list-Of-Items p-2" 
                style={{ textDecoration: isDone ? "line-through" : "none" }}> {props.text}
            </li>
            <button onClick={handleDelete} type="submit" class="btn btn-danger btns-Of-List">Delete</button>
            <button onClick={handleEdit} type="submit" class="btn btn-warning btns-Of-List">Edit</button>
        </div>
    );
}