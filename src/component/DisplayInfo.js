import React from "react";
import './DisplayInfo.scss';

class DisplayInfo extends React.Component {

    // Cách viết chuẩn đối với Class
    constructor(props) {

        // Component con sẽ nhận đầy đủ props của thằng cha truyền xuống
        super(props);

        // Khởi tạo state cho 1 component
        this.state = {
            isShowListUser: true
        }
    }

    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }

    render() {
        // Sử dụng Destructuring 
        const { listUser } = this.props; // object
        return (
            // Nên có 1 class cha bọc ngoài để viết scss cho dễ
            <div className="display-info-container">
                <div>
                    <span onClick={() => { this.handleShowHide() }}>{this.state.isShowListUser ? "Hide list user" : "Show list user"} </span>
                </div>

                {this.state.isShowListUser &&
                    <>
                        {listUser.map((user) => {
                            return (
                                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                                    <div>
                                        <div>My name's {user.name}</div>
                                        <div>My age's {user.age}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => { this.props.handleDeleteUser(user.id) }}>X</button>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                    </>
                }
            </div>
        )
    }
}

export default DisplayInfo