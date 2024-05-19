import { Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import { Home } from '../pages/home';

const App = () => {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route path="/home" element={<Home />}/>
          </Routes>
        </BrowserRouter>
      </>
  );
};

export default App;
