import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                <UserInfo />

                <br /><br />

                <DisplayInfo name="Pham Xuan Tan" age={32} />
            </div>
        )
    }
}
export default MyComponent;

