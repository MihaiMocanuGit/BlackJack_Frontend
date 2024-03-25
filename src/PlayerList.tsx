import React from 'react'
import { useNavigate} from "react-router-dom";
import { Context, useContext, createContext } from 'react'
import { Link } from 'react-router-dom';

import { Player } from './models/Player'
import { PlayersContext } from './pages/PrimaryPage'
import { PlayersContextType } from './pages/PrimaryPage'


export let PlayerContext : React.Context<{
    player: Player
}>;

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export function ChartsOverviewDemo() {
    const {players, addPlayer, removePlayer, modifyPlayer} = useContext<PlayersContextType>(PlayersContext)
  return (
    <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
function PlayerList()
{   

    const navigate = useNavigate(); 
    const {players, addPlayer, removePlayer, modifyPlayer} = useContext<PlayersContextType>(PlayersContext)
    const viewOnClick = (player: Player) => {
        PlayerContext = createContext({player});
        navigate("/ViewPlayerPage");
    }
    //
    
    return(
        <ul style={{listStyleType:"square", maxWidth: "350px", overflowWrap: "break-word"}}>
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