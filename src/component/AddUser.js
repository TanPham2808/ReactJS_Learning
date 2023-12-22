import React from "react";

class AddUser extends React.Component {

    state = {
        name: 'XTan',
        address: 'HCM',
        age: 32
    }

    // Cập nhật lại state khi onchange trong input
    handleOnChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmit = (event) => {

        // Ngăn chặn page reload lại
        event.preventDefault();

        // Lấy trong props ra và gọi ngược lên thằng cha
        this.props.handAddNewUser({
            id: Math.floor((Math.random() * 100) + 1),
            name: this.state.name,
            age: this.state.age
        });
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age} year old
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    Your name: <input
                        type="text"
                        onChange={(event) => { this.handleOnChangeName(event) }}
                    ></input>
                    Your age : <input
                        type="text"
                        onChange={(event) => { this.handleOnChangeAge(event) }}
                    ></input>
                    <button>submit</button>
                </form>
            </div>
        )
    }
}

export default AddUser;