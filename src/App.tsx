import './App.css';

import { PrimaryPage } from './pages/PrimaryPage';
import { ViewPlayerPage } from './pages/ViewPlayerPage';
import { AddPlayerPage } from './pages/AddPlayerPage';

import  React, { createContext, useEffect, useState} from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Player } from './models/Player';
import { GraphsPage } from './pages/GraphsPage';
import * as api from './service/backendApi';
import { ErrorPage } from './pages/ErrorPage';

export let DataContext: React.Context<{
    players: Player[];
    updatePlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}>;

export let PageContext: React.Context<{
    pageNo: number;
    updatePageNo: React.Dispatch<React.SetStateAction<number>>;
    pageSize: number;
    updatePageSize: React.Dispatch<React.SetStateAction<number>>;
    listSize: number;
    updateListSize: React.Dispatch<React.SetStateAction<number>>;
}>;
function App() {
   
    const [players, updatePlayers] = useState<Player[]>([]);                                          
    DataContext = createContext({players,updatePlayers});
    
    const [pageNo, updatePageNo] = useState<number>(0);
    const [pageSize, updatePageSize] = useState<number>(8);
    const [listSize, updateListSize] = useState<number>(0);
    PageContext = createContext({pageNo,updatePageNo, pageSize, updatePageSize, listSize, updateListSize});

    
    useEffect(() => {
        console.log("Loading players...")
        const load = () => api.getPage(updatePlayers, pageNo, pageSize);
        load();
      }, [pageNo, pageSize])


    return (
        <BrowserRouter>
           <Routes>
               <Route path='/' element={<PrimaryPage />} />
               <Route path='/ViewPlayerPage' element={<ViewPlayerPage />} />
               <Route path='/AddPlayerPage' element={<AddPlayerPage />} />
               <Route path='/GraphsPage' element={<GraphsPage />} />
               <Route path='/Error' element={<ErrorPage />} />
           </Routes>
        </BrowserRouter>
    );
}

export default App;
