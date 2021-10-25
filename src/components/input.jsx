import React, { useState } from "react";

export default function Input(props) {

    //state
    const [inputText,setInputText] = useState("");

    //functions to handle change in input element and button clicked
    function handleChange(event) {
        setInputText(event.target.value);
    }

    return(
        <div className="col-lg-6 input-form">
            <div className="container">
                <div className="input-group mb-3">
                    <input onChange={handleChange} value={inputText} type="text" className="form-control input" placeholder="Add a new item . . ." />
                    <button type="submit" className="btn btn-Input"
                            onClick={ ()=> {
                                props.onAdd(inputText);
                                setInputText("");
                            }}>Add</button>
                </div>
             </div>
        </div>
    );
}