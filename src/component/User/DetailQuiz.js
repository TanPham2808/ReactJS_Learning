import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook của thư viện
import { getDataQuiz } from '../../services/ApiServices'

const DetailQuiz = (props) => {
    // Lấy param trên URL
    const params = useParams();

    const quizId = params.id;

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        const data = await getDataQuiz(quizId);
        console.log("Check data >>>>: ", data);
    }


    return (
        <div className="detail-quiz">
            Detail Quiz
        </div>
    )
}

export default DetailQuiz;