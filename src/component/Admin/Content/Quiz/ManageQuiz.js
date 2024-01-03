
import { useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { postCreateQuiz } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';
import QuizTable from './QuizTable';
import Accordion from 'react-bootstrap/Accordion';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [isLoadData, setIsLoadData] = useState(false);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        // validate nếu thấy cần thiết 
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }

        // Call API Create Quiz
        let res = await postCreateQuiz(name, description, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setImage(null);
            setIsLoadData(true);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto ox-3">Add new Quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your quiz name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Description..."
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label>Description</label>
                                </div>
                                <div className="my-3">
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                    />
                                </div>
                                <div className="more-actions form-group">
                                    <label className="mb-1">Upload Image</label>
                                    <input
                                        type='file'
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                    ></input>
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-warning' onClick={() => handleSubmitQuiz()}>Save</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className="list-detail">
                <QuizTable isLoadData={isLoadData} setIsLoadData={setIsLoadData} />
            </div>

        </div>
    )
}

export default ManageQuiz;