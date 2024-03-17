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
    const [inputUsername, updateUsernameInput] = useState<string>("");
    const [inputBank, updateBankInput] = useState<number>(0);
    const [inputLevel, updateLevelInput] = useState<number>(0);

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
        <div style={{backgroundColor:"cyan", minWidth: "10%", minHeight: "10%", maxWidth: "30%", maxHeight: "30%"}} className="App">

            <p>Username: <input  style={{textAlign:'right'}} value={inputUsername} onChange={(field) => {
                updateUsernameInput(field.target.value);
            }}>
            </input></p>

            <p>Bank: <input  style={{textAlign:'right'}} value={inputBank} onChange={(field) => {
                let inputNo = +field.target.value;
                if (isNaN(inputNo))
                    inputNo = 0;
                
                updateBankInput(inputNo);
            }}>
            </input></p>

            <p>Level: <input  style={{textAlign:'right'}} value={inputLevel} onChange={(field) => {
                let inputNo = +field.target.value;
                if (isNaN(inputNo))
                    inputNo = 0;
                
                updateLevelInput(inputNo);
            }}>
            </input></p>
            <button onClick={() => {
                if(inputUsername !== "") 
                    addPlayer(inputUsername, inputBank, inputLevel)}}>
                        
                Join As:
            </button>
                <DataContext.Provider value={{ players, addPlayer, removePlayer }}>
                <PlayerList />
            </DataContext.Provider>

        </div>
    );
}

export default App;
