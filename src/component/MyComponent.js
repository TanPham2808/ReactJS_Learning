import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {

    state = {
        listUser: [
            { id: 1, name: 'Ku Bim', age: 28 },
            { id: 2, name: 'Xuân Tân', age: 14 },
            { id: 3, name: 'Xí Muội', age: 17 },
            { id: 4, name: 'Bánh Tét', age: 31 }
        ]
    }

    render() {
        return (
            <div>
                <UserInfo />
                <br /><br />
                <DisplayInfo
                    listUser={this.state.listUser}
                    user={this.state.listUser}
                />
            </div>
        )
    }
}
export default MyComponent;

