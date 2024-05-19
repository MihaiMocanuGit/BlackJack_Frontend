import axios from 'axios';
import * as serverInterfaces from '../interface/interface';
import { Player } from '../models/Player';
import { useNavigate } from 'react-router-dom';

export const serverAddress = "http://localhost:8080";

const api = axios.create({
    baseURL: serverAddress,
    timeout: 60000,
    withCredentials: false
    // proxy: {
    //     protocol: 'https',
    //     host: 'localhost',
    //     port: 8080,
    // }
})
function convertServerPlayerToLocalPlayer(response: serverInterfaces.playerFromServer)
{
    const player: Player = new Player(response.uid, response.username, response.bank, response.level);
    return player;
}

function convertLocalPlayerToServerPlayer(player: Player)
{
    return {
           // uid: player.getUid(),
            username: player.getUsername(),
            bank: player.getBank(),
            level: player.getLevel()
            }
}
function convertServerListToLocalList(response: serverInterfaces.playerListFromServer) {
    const playerList: Player[] = response._embedded.playerList.map((entity: serverInterfaces.playerFromServer) => {
        return convertServerPlayerToLocalPlayer(entity)
    });

    return playerList;
}




export async function status(updateStatus: React.Dispatch<React.SetStateAction<number>>) {

    try
    {
        const  {data} = await api.get("/status"); 
        updateStatus(data);
        return data;
    }
    catch(error)
    {
        updateStatus(-1);
        return -1;
    }

}

export async function getAll(sessionToken: string, updatePlayerState?: React.Dispatch<React.SetStateAction<Player[]>>)
{
    //console.log("Connection Bad: " + isConnectionBad());
    const {data} = await api.get('/players', {headers: { Authorization: `Bearer ${sessionToken}` }});

    const playerList = convertServerListToLocalList(data);


    if (updatePlayerState)
        updatePlayerState(playerList);
    return playerList;
}

export async function getPage(sessionToken: string, updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>>, pageNo: number, pageSize: number)
{
    //console.log("Connection Bad: " + isConnectionBad());
    
    const {data} = await api.get('/players/' + pageNo.toString() + '/' + pageSize.toString(), {headers: { Authorization: `Bearer ${sessionToken}` }})

    let playerList: Player[];
    try {
        playerList = convertServerListToLocalList(data);
    } catch(error){
        playerList = [];
    }

    updatePlayerState(playerList);
    return playerList;
}

export async function getPlayer(sessionToken: string, uid: number)
{
    //console.log("Connection Bad: " + isConnectionBad());

    const {data} = await api.get('/players/' + uid.toString(), {headers: { Authorization: `Bearer ${sessionToken}` }})

    const player = convertServerPlayerToLocalPlayer(data);

    //updatePlayerState(playerList);
    return player;
}

export async function getAndSort(sessionToken: string, updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>> | null, reverse: boolean)
{
    //console.log("Connection Bad: " + isConnectionBad());

    const {data} = await api.get('/players/sort/' + reverse, {headers: { Authorization: `Bearer ${sessionToken}` }});

    const playerList = convertServerListToLocalList(data);


    if (updatePlayerState != null)
        updatePlayerState(playerList);
    return playerList;
    
}

export async function getSize(sessionToken: string, updatePlayersSizeState: React.Dispatch<React.SetStateAction<number>>) 
{
    //console.log("Connection Bad: " + isConnectionBad());
    const {data} = await api.get('/players/size', {headers: { Authorization: `Bearer ${sessionToken}` }});

    const size: number = data;

    updatePlayersSizeState(size);

    return size;
    
}


export function newPlayer(sessionToken: string, player: Player){
    //console.log("Connection Bad: " + isConnectionBad());
    
    api.post("/players", convertLocalPlayerToServerPlayer(player), {headers: { Authorization: `Bearer ${sessionToken}` }});
}

export function deletePlayer(sessionToken: string, id: number)
{
    //isConnectionBad();
    //api.delete("/players", {data: {id: id}});
    api.delete("/players/" + id.toString(), {headers: { Authorization: `Bearer ${sessionToken}` }});
}

export function replacePlayer(sessionToken: string, id: number, newPlayer: Player)
{
    //console.log("Connection Bad: " + isConnectionBad());
    api.put("/players/" + id.toString(), convertLocalPlayerToServerPlayer(newPlayer), {headers: { Authorization: `Bearer ${sessionToken}` }});
}

export function fakers(sessionToken: string)
{
    api.post("/fakers", {headers: { Authorization: `Bearer ${sessionToken}` }});
}