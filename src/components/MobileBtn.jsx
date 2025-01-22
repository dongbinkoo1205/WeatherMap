import './MobileBtn.css';
function MobileBtn({ handleToggle, isToggled }) {
    // 하나라도 true인지 확인
    return (
        <div className="navContainer">
            <div
                className="navItem"
                onClick={(e) => {
                    e.stopPropagation();
                    handleToggle('airMap');
                }}
            >
                <span className="icon">🏠</span>
            </div>
            <div className="navItem" onClick={() => handleToggle('weatherData')}>
                <span className="icon">🔔</span>
            </div>

            <div className="navItem" onClick={() => handleToggle('airAlert')}>
                <span className="icon">🔖</span>
            </div>
        </div>
    );
}

export default MobileBtn;
