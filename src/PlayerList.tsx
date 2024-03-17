import React from 'react'
import { useNavigate} from "react-router-dom";
import { useContext, createContext } from 'react'
import { Link } from 'react-router-dom';

import { Player } from './models/Player'
import { DataContext } from './pages/PrimaryPage'
import { PlayersContextType } from './pages/PrimaryPage'

export type PlayerContextType = {

    player: Player | null;
};
export let PlayerContext = createContext<PlayerContextType>({
    player: null
})
function PlayerList()
{   

    const navigate = useNavigate(); 
    const {players, addPlayer, removePlayer, modifyPlayer} = useContext<PlayersContextType>(DataContext)
    const viewOnClick = (player: Player) => {
        PlayerContext = createContext<PlayerContextType>({player});
        navigate("/ViewPlayerPage");
    }
    return(
        <ul style={{listStyleType:"square", maxWidth: "350px", overflowWrap: "break-word"}}>
            {players.map((el: Player, index: number) => {
                return( <>
               
                <li key={index}>
                    <p>Username: {el.getUsername()}</p>
                    <p>Bank: {el.getBank()}</p>
                    <p>Level:    {el.getLevel()}</p> 
                </li>
                <div style={{display: 'grid', justifyContent:'flex-end'}}>
                <button onClick={() => {removePlayer(el.getUid())}}>Kick</button>
                <button onClick={() => {modifyPlayer(el.getUid())}}>Modify</button>
                <button onClick={() => {viewOnClick(el)}}>View</button>
                </div>
                </>
                )
            })}
        </ul>
    );
}

export default PlayerList