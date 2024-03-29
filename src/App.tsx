import './App.css';

import { PrimaryPage } from './pages/PrimaryPage';
import { ViewPlayerPage } from './pages/ViewPlayerPage';
import { AddPlayerPage } from './pages/AddPlayerPage';

import  React, {Context, createContext, useState} from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Player } from './models/Player';



export let DataContext: React.Context<{
    players: Player[];
    updatePlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}>;
function App() {
    

    const [players, updatePlayers] = useState<Player[]>([new Player(1, 'I_HATE_THIS', 100, 1), new Player(2, 'ME_TOO', 420, 2),
                                                         new Player(3, 'IDK_ANYMORE', 69, 0), new Player(4, 'Yeah', 123, 1),
                                                         new Player(5, 'HOW', 50, 2), new Player(6, 'Maybe', 70, 2), 
                                                         new Player(7, 'COME', 143, 4), new Player(8, 'TRY', 200, 6),
                                                         new Player(9, 'IDK_ANYMORE', 269, 7), new Player(10, 'Yeah', 123, 1),
                                                         new Player(11, 'PAUSE', 32, 2), new Player(12, 'RANDOM', 200, 3), 
                                                         new Player(13, 'WORDS', 196, 4), new Player(14, 'NO', 432, 9) ]);
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
