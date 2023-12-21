import React from "react";

class DisplayInfo extends React.Component {

    render() {
        // Sử dụng Destructuring 
        const { listUser } = this.props; // object
        return (
            <div>
                {listUser.map((user) => {
                    return (
                        <div key={user.id}>
                            <div>My name's {user.name}</div>
                            <div>My age's {user.age}</div>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default DisplayInfo