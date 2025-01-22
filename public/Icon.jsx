// Icon.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faCloudMoon, faChartColumn } from '@fortawesome/free-solid-svg-icons';
// 아이콘 모음 객체
const icons = {
    faExclamation: faExclamation,
    faCloudMoon: faCloudMoon,
    faChartColumn: faChartColumn,
};

// 공통 Icon 컴포넌트
const Icon = ({ name, style, className, onClick, color, width, height, fontSize }) => {
    // 아이콘 콘텍스트 전달
    const icon = icons[name]; // 전달받은 이름으로 아이콘 선택
    if (!icon) {
        console.error(`Icon "${name}" not found!`);
        return null;
    }

    return (
        <FontAwesomeIcon
            icon={icon}
            className={className}
            onClick={onClick}
            style={{ color: color, width: width, height: height, fontSize: fontSize }}
        />
    );
};

export default Icon;
