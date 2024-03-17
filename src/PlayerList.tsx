import React from 'react'
import { Player } from './models/Player'
import { DataContext } from './App'
import { PlayersContextType } from './App'
import { useContext } from 'react'


function PlayerList()
{
    const {players, addPlayer, removePlayer, modifyPlayer} = useContext<PlayersContextType>(DataContext)

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
                </div>
                </>
                )
            })}
        </ul>
    );
}

export default PlayerList