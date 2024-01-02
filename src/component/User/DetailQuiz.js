import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Hook của thư viện
import { getDataQuiz } from '../../services/ApiServices'
import _, { values } from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';

const DetailQuiz = (props) => {
    // Lấy param trên URL
    const params = useParams();
    // lấy data được truyền từ ListQuiz
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState();
    const [index, setIndex] = useState(0);

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
                        data={dataQuiz && dataQuiz.length > 0
                            ? dataQuiz[index]
                            : []} />
                </div>
                <div className='footer'>
                    <button className='btn btn-secondary' onClick={() => handlePrev()}>Prev</button>
                    <button className='btn btn-primary' onClick={() => handeNext()}>Next</button>
                </div>
            </div>
            <div className='right-content'>
                count down
            </div>
        </div>
    )
}

export default DetailQuiz;