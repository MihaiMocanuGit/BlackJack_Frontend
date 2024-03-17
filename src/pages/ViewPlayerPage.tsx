import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ViewPlayerPage.css';
import { Player } from '../models/Player';

import { PlayerContext, PlayerContextType } from '../PlayerList'
export function ViewPlayerPage()
{

    const {player} = useContext<PlayerContextType>(PlayerContext)
    return(
        <div style={{backgroundColor:"cyan", padding: "1rem", minWidth: "10%", minHeight: "10%", maxWidth: "60%", maxHeight: "50%"}} className="App">           
        <div className='header'>
            <nav className='navbar'>
                <div className='links'>
                    <div>
                        <Link to='/' className='link'>
                            Primary Page
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
        <div>
            <p>Username: {player?.getUsername()}</p>
            <p>Bank: {player?.getBank()}</p>
            <p>Level: {player?.getLevel()}</p> 
        </div>
    </div>)
}