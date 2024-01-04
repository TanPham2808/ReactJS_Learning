import { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { CgAdd } from "react-icons/cg";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { HiMinusCircle } from "react-icons/hi";
import { LuBadgePlus } from "react-icons/lu";
import { FaImage } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from '../../../../services/ApiServices';

export default function Questions() {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({})

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

    useEffect(() => {
        fetchListQuiz();
    }, [])


    const [questions, setQuestions] = useState(
        [
            {
                // object câu hỏi
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                // Bố cục câu trả lời
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    );

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                // object câu hỏi
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                // Bố cục câu trả lời
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }

            // Copy object rồi chèn xuống cuối mảng
            setQuestions([...questions, newQuestion]);
        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);

            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }

        console.log(type, id);
    }

    const handleAddRemoveAnswer = (type, answerId, questionId) => {
        let questionClone = _.cloneDeep(questions);

        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            let index = questionClone.findIndex(question => question.id === questionId);
            if (index !== -1) {
                questionClone[index].answers.push(newAnswer);
                setQuestions(questionClone);
            }
        }

        if (type === 'REMOVE') {
            let index = questionClone.findIndex(question => question.id === questionId);
            if (index !== -1) {
                // Hàm filter sẽ trả ra 1 array mới
                questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId);
                setQuestions(questionClone);
            }
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(questions);

            let index = questionClone.findIndex(question => question.id === questionId);
            if (index !== -1) {
                questionClone[index].description = value;
                setQuestions(questionClone);
            }

        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(question => question.id === questionId);
        if (index !== -1 && event.target && event.target.files) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone);
        }

        console.log(questionClone);
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(question => question.id === questionId);
        if (index !== -1) {
            questionClone[index].answers =
                questionClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answer.description = value
                        }
                    }
                    return answer;
                })
            setQuestions(questionClone);
        }
    }

    // Submit câu hỏi (call 2 API cùng lúc trong Promise)
    const handSubmitQuestionForQuiz = async (questions) => {
        console.log(">>>question: ", questions, selectedQuiz.value);

        await Promise.all(questions.map(async (question) => {
            let q = await postCreateNewQuestionForQuiz(
                selectedQuiz.value,
                question.description,
                question.imageFile);

            await Promise.all(question.answers.map(async (answer) => {
                console.log(">>>check answer: ", answer);
                await postCreateNewAnswerForQuestion(
                    q.DT.id,
                    answer.description,
                    answer.isCorrect
                )
            }))
        }));
    }

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })
    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(question => question.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setIsPreviewImage(true);
        }
    }

    return (
        <div className="question-container">
            <div className="title">
                Manage Question
            </div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz:</label>

                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>

                <div className='mt-3 mb-2'>
                    Add question:
                </div>

                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-5'>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label>Question {index + 1} description</label>
                                    </div>

                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}
                                            className='label-upload'><FaImage />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type="file"
                                            hidden
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                        />
                                        <span>{question.imageName ?
                                            <span
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handlePreviewImage(question.id)}>
                                                {question.imageName}
                                            </span>
                                            :
                                            '0 file is uploaded'}</span>
                                    </div>

                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <CgAdd className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <MdOutlineRemoveCircleOutline className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answer-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(e) =>
                                                        handleAnswerQuestion('CHECKBOX', answer.id, question.id, e.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={answer.description}
                                                        onChange={(e) =>
                                                            handleAnswerQuestion('INPUT', answer.id, question.id, e.target.value)}
                                                    />
                                                    <label>Answers {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', '', question.id)}>
                                                        <LuBadgePlus className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', answer.id, question.id)}>
                                                            <HiMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handSubmitQuestionForQuiz(questions)}
                            className='btn btn-warning'>Save Question</button>
                    </div>
                }

                {isPreviewImage &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    ></Lightbox>
                }
            </div>
        </div>
    )
}

