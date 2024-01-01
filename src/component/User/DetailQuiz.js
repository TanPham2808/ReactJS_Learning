import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Hook của thư viện
import { getDataQuiz } from '../../services/ApiServices'
import _, { values } from 'lodash';
import './DetailQuiz.scss';

const DetailQuiz = (props) => {
    // Lấy param trên URL
    const params = useParams();
    // lấy data được truyền từ ListQuiz
    const location = useLocation();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        const data = await getDataQuiz(quizId);
        if (data && data.EC === 0) {
            // Sử dụng kỹ thuật groupby data bằng lodash
            let dataFilter = _.chain(data.DT)
                .groupBy("id")
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
                    <div className='question'>Question 1 : How are you ? </div>
                    <div className='answer'>
                        <div className='a-child'>A. asdwd</div>
                        <div className='a-child'>B. asdwd</div>
                        <div className='a-child'>C. asdwd</div>
                    </div>
                </div>
                <div className='footer'>
                    <button className='btn btn-secondary'>Prev</button>
                    <button className='btn btn-primary'>Next</button>
                </div>
            </div>
            <div className='right-content'>
                count down
            </div>
        </div>
    )
}

export default DetailQuiz;