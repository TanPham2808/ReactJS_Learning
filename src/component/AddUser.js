import React, { useState } from "react";

const AddUser = (props) => {
    // Từ thằng cha truyền vào
    const { handAddNewUser } = props;

    const [name, setName] = useState();
    const [age, setAge] = useState();

    const handleOnSubmit = (event) => {
        // Ngăn chặn page reload lại
        event.preventDefault();

        // Trả data ra cho thằng cha    
        handAddNewUser({
            id: Math.floor((Math.random() * 100) + 1),
            name: name,
            age: age
        })
    }

    const handleOnChangeName = (event) => {
        setName(event.target.value);
    }

    const handleOnChangeAge = (event) => {
        setAge(event.target.value);
    }

    return (
        <div>
            <div>My name is {name} and I'm {age} year old</div>
            <form onSubmit={(event) => handleOnSubmit(event)}>
                Your name: <input
                    type="text"
                    onChange={(event) => handleOnChangeName(event)}
                ></input>
                Your age : <input
                    type="text"
                    onChange={(event) => handleOnChangeAge(event)}
                ></input>
                <button>submit</button>
            </form>
        </div>
    )
}

export default AddUser;