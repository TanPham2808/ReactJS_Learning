import React from "react";

class MyComponent extends React.Component {

    state = {
        name: 'XTan',
        address: 'HCM',
        age: 32
    }

    // handle sự kiện click chuột
    handleClick = (event) => {

        // Cập nhật lại state (dùng keyword 'this') => Khi cập nhật lại state thì func render sẽ được call lại làm thay đổi UI
        this.setState({
            name: 'Ku Bim',
            age: Math.floor((Math.random() * 100) + 1)
        })
        // 'this' ở đây để ám chỉ chúng ta đang thao tác với component nào và muốn làm gì bên trong component
    }

    // handle sự kiện hover chuột
    handleHover(event) {
        console.log('>>> Hover click and toa do X:', event.pageX);
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age} year old

                <button onMouseOver={this.handleHover}>Hover me</button>

                <button onClick={(event) => { this.handleClick(event) }}>Click me</button>
            </div>

        )
    }
}
export default MyComponent;

