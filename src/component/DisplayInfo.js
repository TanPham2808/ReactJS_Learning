import React from "react";
import './DisplayInfo.scss';

// class DisplayInfo extends React.Component {

//     render() {
//         // Sử dụng Destructuring 
//         const { listUser } = this.props; // object
//         return (
//             // Nên có 1 class cha bọc ngoài để viết scss cho dễ
//             <div className="display-info-container">
//                 {true &&
//                     <>
//                         {listUser.map((user) => {
//                             return (
//                                 <div key={user.id} className={user.age > 18 ? "green" : "red"}>
//                                     <div>
//                                         <div>My name's {user.name}</div>
//                                         <div>My age's {user.age}</div>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => { this.props.handleDeleteUser(user.id) }}>X</button>
//                                     </div>
//                                     <hr />
//                                 </div>
//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfo = (props) => {
    const { listUser } = props; // object

    return (
        <div className="display-info-container">
            {true &&
                <>
                    {listUser.map((user) => {
                        return (
                            <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                                <div>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                </div>
                                <div>
                                    <button onClick={() => { props.handleDeleteUser(user.id) }}>X</button>
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