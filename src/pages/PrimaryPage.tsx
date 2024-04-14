
import { createContext, useContext, useEffect, useState } from 'react';
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
    const [connectionStatus, updateConnectionStatus] = useState<number>(1);
    const {pageNo, updatePageNo, pageSize, listSize, updateListSize } = useContext(PageContext);


    const navigate = useNavigate(); 
    const addPlayer = (username: string, bank:number, level:number) => {
        api.status(updateConnectionStatus);

        if(connectionStatus != 1)
        {
            navigate("/Error");
            return;
        }

        api.newPlayer(new Player(-1, username, bank, level));
        api.getPage(updatePlayers, pageNo, pageSize);
        
        //optimistic response
        updatePlayers(basicAdd(players, username, bank, level));
    
    };

    const removePlayer = (playerUid: number) => {
        api.status(updateConnectionStatus);

        if(connectionStatus != 1)
        {
            navigate("/Error");
            return;
        }

        api.deletePlayer(playerUid);
        api.getPage(updatePlayers, pageNo, pageSize);
        
        //optimistic response
        updatePlayers(basicRemove(players, playerUid));
    };
    
    const modifyPlayer = (playerUid: number, username: string, bank:number, level:number) =>
    {
        api.status(updateConnectionStatus);

        if(connectionStatus != 1)
        {
            navigate("/Error");
            return;
        }

        api.replacePlayer(playerUid, new Player(-1, username, bank, level));
        api.getPage(updatePlayers, pageNo, pageSize);
        
        //optimistic response
        updatePlayers(basicModify(players, playerUid, username, bank, level));
    }


    const sortOnClick = () => {
        api.status(updateConnectionStatus);

        if(connectionStatus != 1)
        {
            navigate("/Error");
            return;
        }
        api.getAndSort(null, sortAscending);
        api.getPage(updatePlayers, pageNo, pageSize);
        updateSortAscending(!sortAscending);
    }

    const getMaxPage = (pageSize: number) => {
        api.status(updateConnectionStatus);

        if(connectionStatus != 1)
        {
            navigate("/Error");
            return 0;
        }

        api.getSize(updateListSize);
        if (listSize == 0) return 0;
        return Math.floor((listSize - 1)/pageSize);
    }
    
    PlayersContext = createContext<PlayersContextType>({players, addPlayer, removePlayer, modifyPlayer}) ;

   
    const joinOnClick = () => {
        api.status(updateConnectionStatus);

        if(connectionStatus != 1)
        {
            navigate("/Error");
            return;
        }
    
        navigate("/AddPlayerPage");
    }

    const seeGraphOnClick = () => {

        api.status(updateConnectionStatus);

        if(connectionStatus != 1)
        {
            navigate("/Error");
            return;
        }

        navigate("/GraphsPage")
    }

    // useEffect(() => {
    //     if(api.isConnectionBad())
    //     {
    //         navigate("/Error");
    //     }
    // });


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
                <button style={{marginLeft: "25px"}} onClick={() => {seeGraphOnClick()}}> Checkout graphs</button>
            </div>
            <div style={{display: 'flex', justifyContent:'stretch'}}>
                <PlayersContext.Provider value={{ players, addPlayer, removePlayer, modifyPlayer}} >
                        <PlayerList />                      
                </PlayersContext.Provider>
            </div>
            
        </div>
    )
}