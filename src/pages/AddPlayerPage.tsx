import React from 'react'
import { useContext, createContext } from 'react'
import { useState } from 'react';
import { useNavigate} from "react-router-dom";
import { PlayersContext } from './PrimaryPage'
import { PlayersContextType } from './PrimaryPage'
import { Player } from '../models/Player';

export function AddPlayerPage()
{
    let {addPlayer} = useContext<PlayersContextType>(PlayersContext)

    let [inputUsername, updateUsernameInput] = useState<string>("");
    let [inputBank, updateBankInput] = useState<number>(0);
    let [inputLevel, updateLevelInput] = useState<number>(0);

    const addFinalPlayer = (username: string, bank:number, level:number) => {
        addPlayer(username, bank, level);

        updateUsernameInput("");
        updateLevelInput(0);
        updateBankInput(0);
    };

    return (
        <div>
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
                    if(inputUsername !== "") 
                    {
                        addFinalPlayer(inputUsername, inputBank, inputLevel);
                        //navigate("/");
                    }}}>       
                    Join:
                </button>
        </div>
    )
}