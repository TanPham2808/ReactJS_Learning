import React, { useState } from "react";
import AddUser from "./AddUser";
import DisplayInfo from "./DisplayInfo";


const MyComponent = () => {
    const [listUser, setListUser] = useState(
        [
            { id: 1, name: 'Ku Bim', age: 28 },
            { id: 2, name: 'Xuân Tân', age: 14 },
            { id: 3, name: 'Xí Muội', age: 17 },
            { id: 4, name: 'Bánh Tét', age: 31 }
        ]
    )

    const handleAddNewUser = (userObject) => {
        setListUser([userObject, ...listUser]);
    }

    const handleDeleteUser = (userId) => {
        let lstUserClone = listUser;
        lstUserClone = lstUserClone.filter(item => item.id !== userId);
        setListUser(lstUserClone);
    }

    return (
        <>
            <div className="a">
                <AddUser handAddNewUser={handleAddNewUser} />
            </div>
            <br /><br />
            <div className="b">
                <DisplayInfo
                    listUser={listUser}
                    handleDeleteUser={handleDeleteUser}
                />
            </div>
        </>
    )
}

export default MyComponent;

