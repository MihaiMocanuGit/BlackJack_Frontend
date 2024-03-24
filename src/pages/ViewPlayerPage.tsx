import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ViewPlayerPage.css';
import { Player } from '../models/Player';

import { PlayerContext} from '../PlayerList'
import { PlayersContext, PlayersContextType } from './PrimaryPage';


export function ViewPlayerPage()
{
    const [inputUsername, updateUsernameInput] = useState<string>("");
    const [inputBank, updateBankInput] = useState<number>(0);
    const [inputLevel, updateLevelInput] = useState<number>(0);
    
    const {player} = useContext(PlayerContext);
    const {players, modifyPlayer} = useContext<PlayersContextType>(PlayersContext);
    const navigate = useNavigate(); 
    return(
        <div style={{backgroundColor:"cyan", padding: "1rem", minWidth: "10%", minHeight: "10%", maxWidth: "60%", maxHeight: "50%"}} className="App">           
        <div className='header'>
            <div>
                <p>
                    View And Modify
                </p>
            </div>
        </div>
        <div>
            <p>Username: {player?.getUsername()}</p>
            <p>Bank: {player?.getBank()}</p>
            <p>Level: {player?.getLevel()}</p> 
            <button onClick={() => {navigate("/");}}>Return</button>
            <p><label htmlFor="usernameInput">Username: </label>
                <input  id="usernameInput" style={{textAlign:'right'}} value={inputUsername} onChange={(field) => {
                    updateUsernameInput(field.target.value);
                }}>
                </input></p>

                <p><label htmlFor="bankInput">Bank: </label>
                <input id="bankInput" style={{textAlign:'right'}} value={inputBank} onChange={(field) => {
                    let inputNo = +field.target.value;
                    if (isNaN(inputNo))
                        inputNo = 0;
                    
                    updateBankInput(inputNo);
                }}>
                </input></p>

                <p><label htmlFor="levelInput">Level: </label>
                <input id="levelInput" style={{textAlign:'right'}} value={inputLevel} onChange={(field) => {
                    let inputNo = +field.target.value;
                    if (isNaN(inputNo))
                        inputNo = 0;
                    
                    updateLevelInput(inputNo);
                }}>
                </input></p>
            <button onClick={() => {
                modifyPlayer(player.getUid(), inputUsername, inputBank, inputLevel)
            }}>Modify</button>


        </div>
    </div>)
}