import React from "react";

class UserInfo extends React.Component {

    state = {
        name: 'XTan',
        address: 'HCM',
        age: 32
    }

    // Cập nhật lại state khi onchange trong input
    handleOnChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        // Ngăn chặn page reload lại
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age} year old
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    Your name <input
                        type="text"
                        onChange={(event) => { this.handleOnChange(event) }}
                    ></input>
                    <button>submit</button>
                </form>
            </div>
        )
    }
}

export default UserInfo;