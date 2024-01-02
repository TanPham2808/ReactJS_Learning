import { useEffect, useState } from 'react';
import { getAllQuizForAdmin } from '../../../../services/ApiServices';

const QuizTable = (props) => {

    const [listQuiz, setListQuiz] = useState([]);

    // Call API lấy danh sách
    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    useEffect(() => {
        fetchListQuiz();
    }, [])

    return (
        <>
            <div>List Quiz</div>
            <table className="table table-hover table-bordered mt-2 my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
                        return (
                            <tr key={`quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button className='btn btn-warning mx-3'>Edit</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </>
    )
}

export default QuizTable