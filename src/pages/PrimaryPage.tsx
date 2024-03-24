
import { useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import { Player } from '../models/Player';
import PlayerList from '../PlayerList';

import { DataContext } from '../App';

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

    const {players, updatePlayers} = useContext(DataContext);


    const addPlayer = (username: string, bank:number, level:number) => {
        let validUid = players.length;

        for (let index = 0; index < players.length; index++) {
            const element = players[index];

            if (element.getUid() > validUid ) 
                validUid = element.getUid()            
        }
        console.log( 'BEFORE' + players);
        const newPlayer = new Player(validUid, username, bank, level);
        const result = players.map((x: Player) =>x);
        result.push(newPlayer);
        updatePlayers(result);
        console.log( 'AFTER' + result);

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
    PlayersContext = createContext<PlayersContextType>({players, addPlayer, removePlayer, modifyPlayer}) ;

    const navigate = useNavigate(); 
    const joinOnClick = () => {

        navigate("/AddPlayerPage");
    }

    return (
        <div style={{backgroundColor:"cyan", padding: "1rem", minWidth: "10%", minHeight: "10%", maxWidth: "60%", maxHeight: "50%"}} className="App">
            <div className='header'>
                    <p>
                        Home
                    </p>
            </div>
                <button style={{position: 'relative', alignSelf: 'self-end'}} onClick={() => {
                    joinOnClick()}}>
                    Join:
                </button>
            <PlayersContext.Provider value={{ players, addPlayer, removePlayer, modifyPlayer}}>
                <PlayerList />
            </PlayersContext.Provider>
        </div>
    )
}