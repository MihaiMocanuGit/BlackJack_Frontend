import React from 'react'
import { useNavigate} from "react-router-dom";
import {useContext, createContext } from 'react'
import { Link } from 'react-router-dom';

import { Player } from '../models/Player'
import { PlayersContext } from '../pages/PrimaryPage'
import { PlayersContextType } from '../pages/PrimaryPage'

export let PlayerContext : React.Context<{
    player: Player
}>;


function PlayerList()
{   

    const navigate = useNavigate(); 
    const {players, removePlayer} = useContext<PlayersContextType>(PlayersContext)
    const viewOnClick = (player: Player) => {
        PlayerContext = createContext({player});
        navigate("/ViewPlayerPage");
    }
    //
    
    return(
        <ul >
            {players.map((el: Player) => {
                return( <>
               
                <li key={el.getUid()}>
                    <p>Username: {el.getUsername()}</p>
                    <p>Bank: {el.getBank()}</p>
                    <p>Level:    {el.getLevel()}</p> 
                </li>
                <div style={{display: 'grid', justifyContent:'flex-end'}}>
                <button onClick={() => {removePlayer(el.getUid())}}>Kick</button>
                <button onClick={() => {viewOnClick(el)}}>View</button>
                </div>
                </>
                )
            })}
        </ul>
    );
}

export default PlayerList