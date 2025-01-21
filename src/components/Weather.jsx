import { useState, useEffect } from 'react';
import { GetWeatherData } from './GetWeatherData';

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const data = await GetWeatherData();
            setWeatherData(data);
        };
        fetchWeatherData();
    }, []);

    return (
        <div>
            <h2>Weather Information</h2>
            {weatherData.length === 0 ? (
                <p>데이터를 불러오는 중...</p>
            ) : (
                weatherData.map((item, index) => (
                    <div key={index}>
                        <p>날짜: {item.baseDate}</p>
                        <p>시간: {item.baseTime}</p>
                        <p>항목: {item.category}</p>
                        <p>관측값: {item.obsrValue}</p>
                        <p>위도: {item.lat}</p>
                        <p>경도: {item.lng}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Weather;
