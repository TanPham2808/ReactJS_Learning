import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook của thư viện
import { getDataQuiz } from '../../services/ApiServices'
import _, { values } from 'lodash';

const DetailQuiz = (props) => {
    // Lấy param trên URL
    const params = useParams();

    const quizId = params.id;

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        const data = await getDataQuiz(quizId);
        if (data && data.EC === 0) {
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
            console.log("datafgilter >>> : ", dataFilter);
        }

    }


    return (
        <div className="detail-quiz">
            Detail Quiz
        </div>
    )
}

export default DetailQuiz;