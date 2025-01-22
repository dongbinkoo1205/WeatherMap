import './MobileBtn.css';
import Icon from '../../public/Icon';

function MobileBtn({ handleToggle, isToggled }) {
    // 하나라도 true인지 확인
    return (
        <div className="navContainer">
            <div className="navWeb">
                <div
                    className="navItem"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggle('weatherData');
                    }}
                >
                    <Icon className={`faCloudMoon`} name="faCloudMoon" fontSize={'35px'} color={'white'} />
                    <p>전국날씨</p>
                </div>
            </div>
            <div className="navWeb">
                <div
                    className="navItem"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggle('airAlert');
                    }}
                >
                    <Icon className={`faExclamation`} name="faExclamation" fontSize={'35px'} color={'white'} />
                    <p>미세먼지</p>
                </div>
            </div>

            <div className="navWeb">
                <div
                    className="navItem"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggle('airMap');
                    }}
                >
                    <Icon className={`faChartColumn`} name="faChartColumn" fontSize={'35px'} color={'white'} />
                    <p>환경기준</p>
                </div>
            </div>
        </div>
    );
}

export default MobileBtn;
