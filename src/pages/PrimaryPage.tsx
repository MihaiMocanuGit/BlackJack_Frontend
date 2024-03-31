
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerList from '../components/PlayerList';
import { Player } from '../models/Player';

import { DataContext } from '../App';
import { basicAdd, basicRemove, basicModify } from '../utils/CrudOperations';


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
        const copy = [...players];
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
        copy.forEach((player: Player) => console.log(player.getLevel()));
    }
    PlayersContext = createContext<PlayersContextType>({players, addPlayer, removePlayer, modifyPlayer}) ;

    const navigate = useNavigate(); 
    const joinOnClick = () => {

        navigate("/AddPlayerPage");
    }

    return (
        <div style={{backgroundColor:"cyan", padding: "1rem", width: "100%"}} className="App">
            <div className='header'>
                    <p>
                        Home
                    </p>
            </div>
            <div>
                <button onClick={() => {joinOnClick()}}>
                    Join:
                </button>
                <button style={{marginLeft: "250px"}} onClick={() => {sortOnClick()}}> Sort By Level</button>
                <button style={{marginLeft: "25px"}} onClick={() => {navigate("/GraphsPage")}}> Checkout graphs</button>
            </div>
            <div style={{display: 'flex', justifyContent:'stretch'}}>
                <PlayersContext.Provider value={{ players, addPlayer, removePlayer, modifyPlayer}} >
                        <PlayerList />                      
                </PlayersContext.Provider>
            </div>
            
        </div>
    )
}