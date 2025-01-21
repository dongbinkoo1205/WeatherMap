import AccidentMap from './components/AccidentMap';
import SwiperProvider from './context/SwiperContext';
import MediaQueryContext from './context/MediaQueryContext';

function App() {
    return (
        <div>
            <SwiperProvider>
                <MediaQueryContext>
                    <AccidentMap />
                </MediaQueryContext>
            </SwiperProvider>
        </div>
    );
}

export default App;
