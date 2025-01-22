import { createContext, useState, useContext } from 'react';

// Swiper Context 생성
export const SwiperContext = createContext(null);

function SwiperProvider({ children }) {
    const [swiperInstance, setSwiperInstance] = useState(null); // Swiper 인스턴스 관리

    return <SwiperContext.Provider value={{ swiperInstance, setSwiperInstance }}>{children}</SwiperContext.Provider>;
}

// Custom Hook for SwiperContext
export const useSwiperContext = () => {
    const context = useContext(SwiperContext);
    if (!context) {
        throw new Error('useSwiperContext must be used within a SwiperProvider');
    }
    return context;
};

export default SwiperProvider;
