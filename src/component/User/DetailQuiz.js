import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Hook của thư viện
import { getDataQuiz, postSubmitQuiz } from '../../services/ApiServices'
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';

const DetailQuiz = (props) => {
    // Lấy param trên URL
    const params = useParams();
    // lấy data được truyền từ ListQuiz
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState();
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        const data = await getDataQuiz(quizId);
        if (data && data.EC === 0) {
            // Sử dụng kỹ thuật groupby data bằng lodash
            let dataQ = _.chain(data.DT).groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        // Thêm trường mới để đánh dấu câu trả lời được check chưa
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })

                    return { questionId: key, answers, questionDescription, image }
                })
                .value();
            setDataQuiz(dataQ);
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }

    const handeNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    }

    const handleCheckBox = (answerId, questionId) => {
        // Dùng cloneDeep để clone tất cả các object lồng bên trong
        // Không thao tác trực tiếp trên dataQuiz
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)

        // Xử lý data khi check trên UI
        if (question && question.answers) {
            question.answers = question.answers.map(answer => {
                if (+answer.id === +answerId) {
                    answer.isSelected = !answer.isSelected; // Phủ định khi check
                }
                return answer;
            })
        }

        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;

            // Update lại data từ dataQuizClone
            setDataQuiz(dataQuizClone);
        }

    }

    const handleFinishQuiz = async () => {
        // Cần build ra template JSON này 
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        let payLoad = {
            quizId: +quizId,
            answers: []
        }
        let answers = [];

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                // todo: userAnswerId
                question.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id);
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payLoad.answers = answers;

            // Submit API
            let res = await postSubmitQuiz(payLoad);
            if (res && res.EC === 0) {

                // Đưa data vào ModalResult
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })

                // Mở Modal Result
                setIsModalResult(true);
            } else {
                alert('Wrong result')
            }
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className='left-content'>
                <div className='title'>
                    Quiz: {quizId} - {location?.state.quizTitle}
                </div>
                <hr />
                <div className='q-body'>
                    <img />
                </div>
                <div className='q-content'>
                    {/* Truyền data và index từ component cha vào component con để render lên giao diện  */}
                    <Question
                        index={index}
                        handleCheckBox={handleCheckBox}
                        data={dataQuiz && dataQuiz.length > 0
                            ? dataQuiz[index]
                            : []} />
                </div>
                <div className='footer'>
                    <button className='btn btn-secondary' onClick={() => handlePrev()}>Prev</button>
                    <button className='btn btn-primary' onClick={() => handeNext()}>Next</button>
                    <button className='btn btn-warning' onClick={() => handleFinishQuiz()}>Finish</button>
                </div>
            </div>
            <div className='right-content'>
                <RightContent dataQuiz={dataQuiz} />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz;