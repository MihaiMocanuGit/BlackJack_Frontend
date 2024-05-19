import './App.css';

import { PrimaryPage } from './pages/PrimaryPage';
import { ViewPlayerPage } from './pages/ViewPlayerPage';
import { AddPlayerPage } from './pages/AddPlayerPage';

import Login from "./auth/Login"
import Logout from "./auth/Logout";
import Registration from "./auth/Registration";
import Dashboard from "./auth/Dashboard";
import { AuthProvider } from "./auth/AuthContext";


import  React, { createContext, useEffect, useState} from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
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

    
    // useEffect(() => {
    //     console.log("Loading players...")
    //     const load = () => api.getPage(updatePlayers, pageNo, pageSize);
    //     load();
    //   }, [pageNo, pageSize])


    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Registration />} />{" "}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                    <Route path='/PrimaryPage' element={<PrimaryPage />} /> 
                    <Route path='/ViewPlayerPage' element={<ViewPlayerPage />} />
                    <Route path='/AddPlayerPage' element={<AddPlayerPage />} />
                    <Route path='/GraphsPage' element={<GraphsPage />} />
                    <Route path='/Error' element={<ErrorPage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
