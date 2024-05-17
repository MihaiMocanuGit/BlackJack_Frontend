import axios from 'axios';
import * as serverInterfaces from '../interface/interface';
import { Player } from '../models/Player';
import { useNavigate } from 'react-router-dom';

const address = "http://localhost:8080";
const api = axios.create({
    baseURL: address,
    timeout: 60000
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

export async function getAll(updatePlayerState?: React.Dispatch<React.SetStateAction<Player[]>>)
{
    //console.log("Connection Bad: " + isConnectionBad());
    const {data} = await api.get('/players');

    const playerList = convertServerListToLocalList(data);


    if (updatePlayerState)
        updatePlayerState(playerList);
    return playerList;
}

export async function getPage(updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>>, pageNo: number, pageSize: number)
{
    //console.log("Connection Bad: " + isConnectionBad());
    
    const {data} = await api.get('/players/' + pageNo.toString() + '/' + pageSize.toString())

    let playerList: Player[];
    try {
        playerList = convertServerListToLocalList(data);
    } catch(error){
        playerList = [];
    }

    updatePlayerState(playerList);
    return playerList;
}

export async function getPlayer(uid: number)
{
    //console.log("Connection Bad: " + isConnectionBad());

    const {data} = await api.get('/players/' + uid.toString())

    const player = convertServerPlayerToLocalPlayer(data);

    //updatePlayerState(playerList);
    return player;
}

export async function getAndSort(updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>> | null, reverse: boolean)
{
    //console.log("Connection Bad: " + isConnectionBad());

    const {data} = await api.get('/players/sort/' + reverse);

    const playerList = convertServerListToLocalList(data);


    if (updatePlayerState != null)
        updatePlayerState(playerList);
    return playerList;
    
}

export async function getSize(updatePlayersSizeState: React.Dispatch<React.SetStateAction<number>>) 
{
    //console.log("Connection Bad: " + isConnectionBad());
    const {data} = await api.get('/players/size');

    const size: number = data;

    updatePlayersSizeState(size);

    return size;
    
}


export function newPlayer(player: Player){
    //console.log("Connection Bad: " + isConnectionBad());

    api.post("/players", convertLocalPlayerToServerPlayer(player));
}

export function deletePlayer(id: number)
{
    //isConnectionBad();
    //api.delete("/players", {data: {id: id}});
    api.delete("/players/" + id.toString());
}

export function replacePlayer(id: number, newPlayer: Player)
{
    //console.log("Connection Bad: " + isConnectionBad());
    api.put("/players/" + id.toString(), convertLocalPlayerToServerPlayer(newPlayer));
}

export function fakers()
{
    api.post("/fakers");
}