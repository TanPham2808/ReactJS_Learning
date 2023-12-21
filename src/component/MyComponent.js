import React from "react";

class MyComponent extends React.Component {

    state = {
        name: 'XTan',
        add: 'HCM',
        age: 32
    }

    render() {
        return (
            <div>My name is {this.state.name} </div>
        )
    }
}
export default MyComponent;

