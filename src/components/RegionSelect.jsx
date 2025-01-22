import { useState, useRef } from 'react';
import { region } from '../category/region'; // 지역 데이터 가져오기
import closeBtn from '../../public/close.png';

import './RegionSelect.css';

const RegionSearch = ({ moveToLocation }) => {
    const searchRef = useRef();
    const searchClearRef = useRef();
    const [regionInput, setRegionInput] = useState('');

    const handleInputChange = (event) => {
        setRegionInput(event.target.value);
    };
    const handleSearch = () => {
        // region 배열에서 검색
        const matchingLocation = region.find((spot) =>
            spot.name.trim().toLowerCase().includes(regionInput.trim().toLowerCase())
        );

        if (matchingLocation) {
            // 검색된 위치로 이동
            moveToLocation(parseFloat(matchingLocation.lat), parseFloat(matchingLocation.lng));
        } else {
            alert('올바른 지역을 입력해주세요. (강남, 양천, 종로 등)');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const handleClear = () => {
        setRegionInput('');
    };

    return (
        <>
            <div className="regionInput">
                <div className="regionInputText">
                    <p>지역을 검색하시겠어요?</p>
                </div>
                <label className="regionLabel">
                    <input
                        ref={searchRef}
                        type="text"
                        value={regionInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="지역검색 예시 : 종로, 양천, 강서 등"
                    />
                    <button
                        className="btnClear"
                        ref={searchClearRef}
                        onClick={handleClear}
                        style={{ display: regionInput ? 'block' : 'none' }}
                    >
                        <img src={closeBtn} alt="" />
                    </button>
                </label>
                <button className="btnSearch" disabled onClick={handleSearch}>
                    검색
                </button>
            </div>
        </>
    );
};

export default RegionSearch;
