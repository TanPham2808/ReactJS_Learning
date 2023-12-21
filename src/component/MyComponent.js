import React from "react";

class MyComponent extends React.Component {

    state = {
        name: 'XTan',
        address: 'HCM',
        age: 32
    }

    // handle sự kiện click chuột
    handleClick() {
        console.log('>>Click me button');
    }

    // handle sự kiện hover chuột
    handleHover(event) {
        console.log('>>> Hover click and toa do X:', event.pageX);
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and I'm from {this.state.address}
                <button onClick={this.handleClick}>Click me</button>
                <button onMouseOver={this.handleHover}>Hover me</button>
            </div>

        )
    }
}
export default MyComponent;

