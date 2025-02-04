import { useEffect, useState } from 'react';
import { GetAirData } from './GetAirData';
import { useSwiperContext } from '../context/SwiperContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { GetDate } from './GetDate';

import 'swiper/css'; // Swiper 기본 스타일
import 'swiper/css/navigation'; // 네비게이션 모듈 스타일

import './AirContent.css';

function AirContent({ isToggled }) {
    const toggledStyle = isToggled
        ? {
              display: 'block',
          }
        : {
              display: 'none',
          };
    const { year, month, date, hours } = GetDate();
    const nowDate = `${year}년 ${month}월 ${date}일 ${hours}시 `; // base_date 계산

    const { setSwiperInstance } = useSwiperContext(); // Swiper 인스턴스 저장
    const [AirData, setAirData] = useState([]); // AirData 상태 관리

    useEffect(() => {
        const fetchAirData = async () => {
            try {
                const data = await GetAirData();
                setAirData(data);
            } catch (error) {
                console.error('Error fetching air data:', error);
            }
        };
        fetchAirData();
    }, []);

    return (
        <div className="AirInformation" style={toggledStyle}>
            {AirData.length === 0 ? (
                <p>데이터를 불러오는 중...</p>
            ) : (
                <div className="InfoWrap">
                    <h2>
                        금일 미세먼지 경보는 총 <span>{AirData.length}건</span> 발령되었습니다.
                    </h2>
                    <p>{nowDate} 기준으로 집계되었습니다.</p>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{ delay: 5000 }}
                        onSwiper={(swiper) => setSwiperInstance(swiper)} // Swiper 인스턴스 저장
                        className="AirSwiper"
                    >
                        {AirData.map((item, index) => (
                            <SwiperSlide key={index} className="AirDataSlide">
                                <div className="AirData">
                                    <span>
                                        {item.districtName}시({item.moveName})
                                    </span>
                                    <div className="DataLine">
                                        <p>
                                            <strong>발령일:</strong> 금일 <em>{item.issueTime}시</em>
                                        </p>
                                        <p>
                                            <strong>경보단계:</strong> {item.issueGbn}
                                        </p>
                                        <p>
                                            <strong>발령농도:</strong> {item.issueVal}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
}

export default AirContent;
