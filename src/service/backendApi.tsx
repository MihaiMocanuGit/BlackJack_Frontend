import axios from 'axios';
import * as serverInterfaces from '../interface/interface';
import { Player } from '../models/Player';

const address = "http://localhost:8080";

function convertServerPlayerToLocalPlayer(response: serverInterfaces.playerFromServer)
{
    const player: Player = new Player(response.Uid, response.username, response.bank, response.level);
    return player;
}
function convertServerListToLocalList(response: serverInterfaces.playerListFromServer) {
    const playerList: Player[] = response._embedded.playerList.map((entity: serverInterfaces.playerFromServer) => {
        return convertServerPlayerToLocalPlayer(entity)
    });

    return playerList;
}
export async function getAll(updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>>)
{
    const {data} = await axios.get(address + '/players');
    console.log("Data:");
    console.log(data);
    const playerList = convertServerListToLocalList(data);
    console.log("Converted Data:");
    console.log(playerList);
    updatePlayerState(playerList);
    return playerList;
}

export async function getPage(updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>>, pageNo: number, pageSize: number)
{
    
    const {data} = await axios.get(address + '/players/' + pageNo.toString() + '/' + pageSize.toString())
    console.log("Data:");
    console.log(data);
    let playerList: Player[];
    try {
        playerList = convertServerListToLocalList(data);
    } catch(error){
        playerList = [];
    }
    console.log("Converted Data:");
    console.log(playerList);
    updatePlayerState(playerList);
    return playerList;
}

export async function getPlayer(uid: number)
{
    const {data} = await axios.get(address + '/players/' + uid.toString())
    console.log("Data:");
    console.log(data);
    const player = convertServerPlayerToLocalPlayer(data);
    console.log("Converted Data:");
    console.log(player);
    //updatePlayerState(playerList);
    return player;
}

export async function getAndSort(updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>> | null, reverse: boolean)
{
    const {data} = await axios.get(address + '/players/sort/' + reverse);
    console.log("Data:");
    console.log(data);
    const playerList = convertServerListToLocalList(data);
    console.log("Converted Data:");
    console.log(playerList);

    if (updatePlayerState != null)
        updatePlayerState(playerList);
    return playerList;
    
}

export async function getSize() : Promise<number>
{
    const {data} = await axios.get(address + '/players/size');
    console.log("Data:");
    console.log(data);
    const size: number = data;
    console.log("Converted Data:");
    console.log(size);

    return size;
    
}
