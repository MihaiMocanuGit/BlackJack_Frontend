import React from 'react'
import { Player } from './models/Player'
import { DataContext } from './App'
import { PlayersContextType } from './App'
import { useContext } from 'react'


function PlayerList()
{
    const {players, addPlayer, removePlayer} = useContext<PlayersContextType>(DataContext)

    return(
        <ul style={{listStyleType:"square"}}>
            {players.map((el: Player, index: number) => {
                return( 
                <li key={index}>
                    <p>Username: {el.getUsername()}</p>
                    <p>Bank: {el.getBank()}</p>
                    <p>Level:    {el.getLevel()}</p> 
                    <button onClick={() => {removePlayer(el.getUid())}}>Kick</button>
                    <button onClick={() => {removePlayer(el.getUid())}}>Modify</button>
                </li>
                )
            })}
        </ul>
    );
}

export default PlayerList