import './App.css';
import { Player } from './models/Player';
import { useState, createContext } from 'react';
import PlayerList from './PlayerList';

const player1: Player = new Player(1, 'I_HATE_THIS', 100, 1);
const player2: Player = new Player(2, 'ME_TOO', 420, 2);
const player3: Player = new Player(3, 'IDK_ANYMORE', 69, 0);


export type PlayersContextType = {
    players: Player[];
    addPlayer: (username: string, bank:number, level:number) => void;
    removePlayer: (playerUid: number) => void;
};


export const DataContext = createContext<PlayersContextType>({
    players: [],
    addPlayer: () => {},
    removePlayer: () => {}
});

function App() {
    const [players, updatePlayers] = useState<Player[]>([player1, player2, player3]);

    const addPlayer = (username: string, bank:number, level:number) => {
        let validUid = players.length;

        for (let index = 0; index < players.length; index++) {
            const element = players[index];

            if (element.getUid() > validUid ) 
                validUid = element.getUid()            
        }

        const newPlayer = new Player(validUid, username, bank, level);
        updatePlayers((prevState: Player[]) => [...prevState, newPlayer]);
    };

    const removePlayer = (playerUid: number) => {
        updatePlayers((prevState: Player[]) => prevState.filter((player) => player.getUid() !== playerUid));
    };



    return (
        <div style={{backgroundColor:"greenyellow", minWidth: "90%", minHeight: "90%"}} className="App">
            <DataContext.Provider value={{ players, addPlayer, removePlayer }}>
                <PlayerList />
                <button onClick={() => addPlayer("Pavel", 0, 1)}>
                    Join As Pavel
                </button>
            </DataContext.Provider>

        </div>
    );
}

export default App;
