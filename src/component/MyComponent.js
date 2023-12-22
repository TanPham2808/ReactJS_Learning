import React from "react";
import AddUser from "./AddUser";
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

    handAddNewUser = (userObject) => {
        this.setState({
            listUser: [userObject, ...this.state.listUser] // Cập nhật vào đầu mảng
        })
    }

    render() {
        return (
            <>
                <div className="a">
                    {/* Truyền function từ cha xuống con thông qua props handAddNewUser */}
                    {/* Đang tham chiếu tới func nên KHÔNG DÙNG DẤU (). Nếu dùng () thì thực thi sử dụng func luôn */}
                    <AddUser handAddNewUser={this.handAddNewUser} />
                </div>
                <br /><br />
                <div className="b">
                    <DisplayInfo
                        listUser={this.state.listUser}
                    />
                </div>
            </>
        )
    }
}
export default MyComponent;

