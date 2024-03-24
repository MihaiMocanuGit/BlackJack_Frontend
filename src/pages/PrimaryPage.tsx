
import { useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import { Player } from '../models/Player';
import PlayerList from '../PlayerList';

const player1: Player = new Player(1, 'I_HATE_THIS', 100, 1);
const player2: Player = new Player(2, 'ME_TOO', 420, 2);
const player3: Player = new Player(3, 'IDK_ANYMORE', 69, 0);

export type PlayersContextType = {

    players: Player[];
    addPlayer: (username: string, bank:number, level:number) => void;
    removePlayer: (playerUid: number) => void;
    modifyPlayer: (playerUid: number, username: string, bank:number, level:number) => void;
};

export let PlayersContext = createContext<PlayersContextType>({
    players: [],
    addPlayer: () => {},
    removePlayer: () => {},
    modifyPlayer: () => {}
});


export function PrimaryPage()
{
    document.title = 'Primary';

    const [players, updatePlayers] = useState<Player[]>([player1, player2, player3]);


    const addPlayer = (username: string, bank:number, level:number) => {
        let validUid = players.length;

        for (let index = 0; index < players.length; index++) {
            const element = players[index];

            if (element.getUid() > validUid ) 
                validUid = element.getUid()            
        }
        console.log( 'BEFORE' + players);
        const newPlayer = new Player(validUid, username, bank, level);
        updatePlayers((prevState: Player[]) => [...prevState, newPlayer]);
        console.log( 'AFTER' + players);

    };

    const removePlayer = (playerUid: number) => {
        updatePlayers((prevState: Player[]) => prevState.filter((player) => player.getUid() !== playerUid));
    };
    
    const modifyPlayer = (playerUid: number, username: string, bank:number, level:number) =>
    {

        for (let index = 0; index < players.length; index++) {
            const element = players[index];

            if (element.getUid() === playerUid) 
            {

                if (username != "")
                {
                    element.setBank(bank);
                    element.setLevel(level);
                    element.setUsername(username);
                }

            }
        }
        updatePlayers((prevState: Player[]) => prevState.filter((player) => true));

    }

    const navigate = useNavigate(); 
    const joinOnClick = () => {
        PlayersContext = createContext<PlayersContextType>({players, addPlayer, removePlayer, modifyPlayer}) ;
        navigate("/AddPlayerPage");
    }

    return (
        <div style={{backgroundColor:"cyan", padding: "1rem", minWidth: "10%", minHeight: "10%", maxWidth: "60%", maxHeight: "50%"}} className="App">
                <div>
                    <button onClick={() => {
                        joinOnClick()}}>
                        Join:
                    </button>
                </div>
            <PlayersContext.Provider value={{ players, addPlayer, removePlayer, modifyPlayer}}>
                <PlayerList />
            </PlayersContext.Provider>
        </div>
    )
}