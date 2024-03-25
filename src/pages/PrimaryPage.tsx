
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


let sortAscending = true;
export function PrimaryPage()
{
    document.title = 'Primary';

    const {players, updatePlayers} = useContext(DataContext);
    const [sortAscending, updateSortAscending] = useState<boolean>(true);


    const addPlayer = (username: string, bank:number, level:number) => {

        updatePlayers(basicAdd(players, username, bank, level));
    };

    const removePlayer = (playerUid: number) => {
        updatePlayers(basicRemove(players, playerUid));
    };
    
    const modifyPlayer = (playerUid: number, username: string, bank:number, level:number) =>
    {
        updatePlayers(basicModify(players, playerUid, username, bank, level));

    }


    const sortOnClick = () => {
        console.log("Ascending " + sortAscending);
        console.log("Before:")
        let copy = [...players];
        copy.forEach((player: Player) => console.log(player.getLevel()));
        if(sortAscending === true)
        {
            copy.sort((n1,n2) => n1.getLevel() - n2.getLevel());  
        }
        else
        {
            copy.sort((n1,n2) => n2.getLevel() - n1.getLevel());
            
        }
        updateSortAscending(!sortAscending);
        updatePlayers(copy);
        console.log("After:")
        copy.forEach((player: Player) => console.log(player.getLevel()));
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
                <button onClick={() => {sortOnClick()}}> Sort By Level</button>
            <PlayersContext.Provider value={{ players, addPlayer, removePlayer, modifyPlayer}}>
                <PlayerList />
                
            </PlayersContext.Provider>
        </div>
    )
}