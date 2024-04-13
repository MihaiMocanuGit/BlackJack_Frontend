import axios from 'axios';
import * as serverInterfaces from '../interface/interface';
import { Player } from '../models/Player';

const address = "http://localhost:8080";
const api = axios.create({
    baseURL: address,
    timeout: 1000
})
function convertServerPlayerToLocalPlayer(response: serverInterfaces.playerFromServer)
{
    const player: Player = new Player(response.Uid, response.username, response.bank, response.level);
    return player;
}

function convertLocalPlayerToServerPlayer(player: Player)
{
    return {
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

export async function status() {
    const data = await api.get('/status');
    return data;
}

export async function getAll(updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>> | null)
{
    const {data} = await api.get('/players');

    const playerList = convertServerListToLocalList(data);


    if (updatePlayerState != null)
        updatePlayerState(playerList);
    return playerList;
}

export async function getPage(updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>>, pageNo: number, pageSize: number)
{
    
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
    const {data} = await api.get('/players/' + uid.toString())

    const player = convertServerPlayerToLocalPlayer(data);

    //updatePlayerState(playerList);
    return player;
}

export async function getAndSort(updatePlayerState: React.Dispatch<React.SetStateAction<Player[]>> | null, reverse: boolean)
{
    const {data} = await api.get('/players/sort/' + reverse);

    const playerList = convertServerListToLocalList(data);


    if (updatePlayerState != null)
        updatePlayerState(playerList);
    return playerList;
    
}

export async function getSize(updatePlayersSizeState: React.Dispatch<React.SetStateAction<number>>) 
{
    const {data} = await api.get('/players/size');

    const size: number = data;

    updatePlayersSizeState(size);

    return size;
    
}


export function newPlayer(player: Player){
    api.post("/players", convertLocalPlayerToServerPlayer(player));
}

