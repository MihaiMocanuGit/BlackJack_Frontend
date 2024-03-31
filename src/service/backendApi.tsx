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

// function getPage(pageNo: string, pageSize: string)
// {
//     get(address + '/players/' + pageNo + '/' + pageSize)
//     .then(function (response: any) {
//         // handle success
//         console.log(response);
//     })
//     .catch(function (error: any) {
//         // handle error
//         console.log(error);
//     })
//     .finally(function () {
//         // always executed
//     });
// }

// function getPlayer(uid: string)
// {
//     get(address + '/players/' + uid)
//     .then(function (response: any) {
//         // handle success
//         console.log(response);
//     })
//     .catch(function (error: any) {
//         // handle error
//         console.log(error);
//     })
//     .finally(function () {
//         // always executed
//     });
// }

// function getAndSort(reverse: string)
// {
//     get(address + '/players/' + reverse)
//     .then(function (response: any) {
//         // handle success
//         console.log(response);
//     })
//     .catch(function (error: any) {
//         // handle error
//         console.log(error);
//     })
//     .finally(function () {
//         // always executed
//     });
// }
