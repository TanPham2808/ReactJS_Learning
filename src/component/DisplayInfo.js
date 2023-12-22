import React, { useState } from "react";
import './DisplayInfo.scss';


const DisplayInfo = (props) => {
    // props lấy từ thằng cha truyền vào
    const { listUser, handleDeleteUser } = props;

    const [isShowHideListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser);
    }

    return (
        <div className="display-info-container">
            <div>
                <span onClick={() => handleShowHideListUser()}>{isShowHideListUser === true ? "Hide List User" : "Show List User"}</span>
            </div>
            {isShowHideListUser &&
                <>
                    {listUser.map((user) => {
                        return (
                            <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                                <div>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                </div>
                                <div>
                                    <button onClick={() => { handleDeleteUser(user.id) }}>X</button>
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

export default DisplayInfo