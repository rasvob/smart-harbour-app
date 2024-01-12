import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DatetimeComponent = ({date, time}) => {
    return (
        <div>
            <span className="text-sm text-gray-500">{date}</span>
            <span className="text-4xl">{time}</span>
        </div>
    );
};

const Home = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex justify-between my-4">
                <p className="text-4xl">Aktuální přehled</p>
                <DatetimeComponent date={date} time={time} />
            </div>    
        </div>
    );
};  

export default Home;