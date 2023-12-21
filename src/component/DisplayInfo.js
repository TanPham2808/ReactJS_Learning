import React from "react";

class DisplayInfo extends React.Component {

    render() {
        // Sử dụng Destructuring 
        const { name, age } = this.props; // object
        return (
            <div>
                <div>My name's {name}</div>
                <div>My age's {age}</div>
            </div>
        )
    }
}

export default DisplayInfo