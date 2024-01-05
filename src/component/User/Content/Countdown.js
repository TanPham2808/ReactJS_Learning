import { useState, useEffect } from "react"

export default function Countdown(props) {
    const [count, setcount] = useState(300);

    useEffect(() => {
        if (count === 0) {
            props.onTimeUp();
            return;
        };

        const timer = setInterval(() => {
            setcount(count - 1);
        }, 1000) // sau 1s sẽ chạy lại

        // Clean up (dọn dẹp hiệu ứng)
        return () => {
            clearInterval(timer);
        }

        // setTimeout(() => { // chỉ chạy 1 lần (sau 5s)
        //     clearInterval(timer); // Xóa đi việc lặp vô hạn
        // }, 5000)

    }, [count])

    return (
        <div className="countdown-container">
            {count}
        </div>
    )
}