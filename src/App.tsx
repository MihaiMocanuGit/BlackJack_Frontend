import './App.css';

import { PrimaryPage } from './pages/PrimaryPage';
import { ViewPlayerPage } from './pages/ViewPlayerPage';

import { Routes, Route, BrowserRouter } from 'react-router-dom';


function App() {
    


    return (
        <BrowserRouter>
           <Routes>
               <Route path='/' element={<PrimaryPage />} />
               <Route path='/ViewPlayerPage' element={<ViewPlayerPage />} />
           </Routes>
        </BrowserRouter>
    );
}

export default App;
