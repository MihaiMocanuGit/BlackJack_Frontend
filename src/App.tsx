import './App.css';

import { PrimaryPage } from './pages/PrimaryPage';
import { ViewPlayerPage } from './pages/ViewPlayerPage';
import { AddPlayerPage } from './pages/AddPlayerPage';

import  React, {Context, createContext, useState} from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Player } from './models/Player';

const player1: Player = new Player(1, 'I_HATE_THIS', 100, 1);
const player2: Player = new Player(2, 'ME_TOO', 420, 2);
const player3: Player = new Player(3, 'IDK_ANYMORE', 69, 0);

export let DataContext: React.Context<{
    players: Player[];
    updatePlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}>;
function App() {
    

    const [players, updatePlayers] = useState<Player[]>([player1, player2, player3]);
    DataContext = createContext({players,updatePlayers});
    
    return (
        <BrowserRouter>
           <Routes>
               <Route path='/' element={<PrimaryPage />} />
               <Route path='/ViewPlayerPage' element={<ViewPlayerPage />} />
               <Route path='/AddPlayerPage' element={<AddPlayerPage />} />
           </Routes>
        </BrowserRouter>
    );
}

export default App;
