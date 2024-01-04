
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignUser } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';

export default function AssignQuiz(props) {

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({})

    // Call API lấy danh sách
    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                // Chuyển lại định dạng của combobox
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const fetchUser = async () => {
        let res = await getAllUsers();
        console.log(">>> check res", res);
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                // Chuyển lại định dạng của combobox
                return {
                    value: item.id,
                    label: `${item.username} -${item.email}`
                }
            })
            setListUser(newQuiz);
        }
    }

    const handleAssignUser = async (quizSelected, userSelected) => {
        console.log(">>>check data", quizSelected.value, userSelected.value)
        let res = await postAssignUser(quizSelected.value, userSelected.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }

    useEffect(() => {
        fetchListQuiz();
        fetchUser();
    }, [])

    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select User:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button className='btn btn-warning mt-3' onClick={() => handleAssignUser(selectedQuiz, selectedUser)}>Assign Save</button>
            </div>
        </div>
    )
}