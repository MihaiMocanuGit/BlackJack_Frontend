
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerList from '../components/PlayerList';
import { Player } from '../models/Player';

import { DataContext } from '../App';
import { PageContext } from '../App';
import { basicAdd, basicRemove, basicModify } from '../utils/CrudOperations';
import * as api from '../service/backendApi'


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

    const {pageNo, updatePageNo, pageSize, listSize, updateListSize } = useContext(PageContext);


    const addPlayer = (username: string, bank:number, level:number) => {
        console.log("Adding");
        api.newPlayer(new Player(-1, username, bank, level));
        api.getPage(updatePlayers, pageNo, pageSize);
        //updatePlayers(basicAdd(players, username, bank, level));
    };

    const removePlayer = (playerUid: number) => {
        updatePlayers(basicRemove(players, playerUid));
    };
    
    const modifyPlayer = (playerUid: number, username: string, bank:number, level:number) =>
    {
        updatePlayers(basicModify(players, playerUid, username, bank, level));

    }


    const sortOnClick = () => {
        api.getAndSort(null, sortAscending);
        api.getPage(updatePlayers, pageNo, pageSize);
        updateSortAscending(!sortAscending);
    }

    const getMaxPage = (pageSize: number) => {
        api.getSize(updateListSize);
        return Math.floor((listSize - 1)/pageSize);
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
                <button style={{marginLeft: "50px"}} onClick={() => {updatePageNo((pageNo <= 0)? 0 : pageNo - 1)}}> &lt; </button>
                <>{pageNo} / {getMaxPage(pageSize)}</>
                <button style={{marginLeft: "25px"}} onClick={() => {updatePageNo((pageNo >= getMaxPage(pageSize))? getMaxPage(pageSize) : pageNo + 1)}}> &gt; </button>
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