
import { createContext, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlayerList from '../PlayerList';
import { Player } from '../models/Player';

import { DataContext } from '../App';
import { basicAdd } from '../CrudOperations';
import { basicRemove } from '../CrudOperations';
import { basicModify } from '../CrudOperations';



export type PlayersContextType = {

    players: Player[];
    addPlayer: (data: Player[], username: string, bank:number, level:number) => void;
    removePlayer: (data: Player[], playerUid: number) => void;
    modifyPlayer: (data: Player[], playerUid: number, username: string, bank:number, level:number) => void;
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
        // let validUid = players.length;

        // for (let index = 0; index < players.length; index++) {
        //     const element = players[index];

        //     if (element.getUid() > validUid ) 
        //         validUid = element.getUid()            
        // }
        // console.log( 'BEFORE' + players);
        // const newPlayer = new Player(validUid, username, bank, level);
        // const result = players.map((x: Player) =>x);
        // result.push(newPlayer);
        // updatePlayers(result);
        updatePlayers(basicAdd(players, username, bank, level));
        // console.log( 'AFTER' + result);

    };

    const removePlayer = (playerUid: number) => {
        // updatePlayers((prevState: Player[]) => prevState.filter((player) => player.getUid() !== playerUid));
        updatePlayers(basicRemove(players, playerUid));
    };
    
    const modifyPlayer = (playerUid: number, username: string, bank:number, level:number) =>
    {

        // for (let index = 0; index < players.length; index++) {
        //     const element = players[index];

        //     if (element.getUid() === playerUid) 
        //     {

        //         if (username != "")
        //         {
        //             element.setBank(bank);
        //             element.setLevel(level);
        //             element.setUsername(username);
        //         }

        //     }
        // }
        // updatePlayers((prevState: Player[]) => prevState.filter((player) => true));

        updatePlayers(basicModify(players, playerUid, username, bank, level));

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