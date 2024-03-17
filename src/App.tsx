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
    modifyPlayer: (playerUid: number) => void;
};


export const DataContext = createContext<PlayersContextType>({
    players: [],
    addPlayer: () => {},
    removePlayer: () => {},
    modifyPlayer: () => {}
});

function App() {
    const [players, updatePlayers] = useState<Player[]>([player1, player2, player3]);
    let [inputUsername, updateUsernameInput] = useState<string>("");
    let [inputBank, updateBankInput] = useState<number>(0);
    let [inputLevel, updateLevelInput] = useState<number>(0);

    const addPlayer = (username: string, bank:number, level:number) => {
        let validUid = players.length;

        for (let index = 0; index < players.length; index++) {
            const element = players[index];

            if (element.getUid() > validUid ) 
                validUid = element.getUid()            
        }

        const newPlayer = new Player(validUid, username, bank, level);
        updatePlayers((prevState: Player[]) => [...prevState, newPlayer]);

        updateUsernameInput("");
        updateLevelInput(0);
        updateBankInput(0);
    };

    const removePlayer = (playerUid: number) => {
        updatePlayers((prevState: Player[]) => prevState.filter((player) => player.getUid() !== playerUid));
    };

    const modifyPlayer = (playerUid: number) =>
    {

        for (let index = 0; index < players.length; index++) {
            const element = players[index];

            if (element.getUid() === playerUid) 
            {
                const newUsername = inputUsername;
                const newBank = inputBank;
                const newLevel = inputLevel;

                if (newUsername != "")
                {
                    element.setBank(newBank);
                    element.setLevel(newLevel);
                    element.setUsername(newUsername);
                }

                inputUsername = "";
                inputLevel = 0;
                inputBank = 0;

                updateUsernameInput(inputUsername);
                updateLevelInput(inputLevel);
                updateBankInput(inputBank);
            }
        }
        updatePlayers((prevState: Player[]) => prevState.filter((player) => true));

    }


    return (
        <div style={{backgroundColor:"cyan", padding: "1rem", minWidth: "10%", minHeight: "10%", maxWidth: "60%", maxHeight: "50%"}} className="App">
                <div>
                    <p><label htmlFor="usernameInput">Username: </label>
                    <input  id="usernameInput" style={{textAlign:'right'}} value={inputUsername} onChange={(field) => {
                        updateUsernameInput(field.target.value);
                    }}>
                    </input></p>

                    <p><label htmlFor="bankInput">Bank: </label>
                    <input id="bankInput" style={{textAlign:'right'}} value={inputBank} onChange={(field) => {
                        let inputNo = +field.target.value;
                        if (isNaN(inputNo))
                            inputNo = 0;
                        
                        updateBankInput(inputNo);
                    }}>
                    </input></p>

                    <p><label htmlFor="levelInput">Level: </label>
                    <input id="levelInput" style={{textAlign:'right'}} value={inputLevel} onChange={(field) => {
                        let inputNo = +field.target.value;
                        if (isNaN(inputNo))
                            inputNo = 0;
                        
                        updateLevelInput(inputNo);
                    }}>
                    </input></p>
                    <button onClick={() => {
                        if(inputUsername !== "") 
                            addPlayer(inputUsername, inputBank, inputLevel)}}>       
                        Join:
                    </button>
                    
                </div>
                <DataContext.Provider value={{ players, addPlayer, removePlayer, modifyPlayer}}>
                    <PlayerList />
                </DataContext.Provider>
        </div>

    );
}

export default App;
