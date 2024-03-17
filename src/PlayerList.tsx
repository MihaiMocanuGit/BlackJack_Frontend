import React from 'react'
import { Player } from './models/Player'
import { DataContext } from './App'
import { PlayersContextType } from './App'
import { useContext } from 'react'


function PlayerList()
{
    const {players, addPlayer, removePlayer} = useContext<PlayersContextType>(DataContext)

    return(
        <ul>
            {players.map((el: Player, index: number) => {
                return <li key={index}>{el.getUsername()}, {el.getLevel()}, {el.getBank()}
                <button onClick={() => {removePlayer(el.getUid())}}>Quit</button>
                </li>
            })}
        </ul>
    );
}

export default PlayerList