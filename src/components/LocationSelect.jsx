import { region } from '../category/region'; // 지역 데이터 가져오기
import './LocationSelect.css';
const LocationSelector = ({ moveToLocation }) => {
    const handleLocationChange = (event) => {
        const value = event.target.value;
        if (value) {
            const [lat, lng] = value.split(',');
            moveToLocation(parseFloat(lat), parseFloat(lng));
        }
    };

    return (
        <div className="selectRegion">
            <div className="selectRegionText">
                <p>지역을 선택하시겠어요?</p>
            </div>
            <select id="" onChange={handleLocationChange}>
                <option value="">지역을 선택하세요</option>
                {region.map((location, index) => (
                    <option key={index} value={`${location.lat},${location.lng}`}>
                        {location.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LocationSelector;
