import React from "react";

class DisplayInfo extends React.Component {

    state={
        isShowListUser: true
    }
    
    handleShowHide = () => {
        this.setState({
            isShowListUser : !this.state.isShowListUser
        })
    }

    render() {
        // Sử dụng Destructuring 
        const { listUser } = this.props; // object
        return (
            <div>
                <div>
                    <span onClick={()=>{this.handleShowHide()}}>{this.state.isShowListUser ? "Hide list user" : "Show list user"} </span>
                </div>

                {this.state.isShowListUser &&
                    <div>
                        {listUser.map((user) => {
                            return (
                                <div>
                                    <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                                        <div>My name's {user.name}</div>
                                        <div>My age's {user.age}</div>
                                        <hr />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default DisplayInfo