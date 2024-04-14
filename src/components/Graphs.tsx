
import { BarChart } from '@mui/x-charts/BarChart';
import * as api from '../service/backendApi'
import { Player } from '../models/Player';
import { useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';

let result: any;

function onFullfiled(players: Player[])
{
    const levels = new Set<number>();
    const avgBank: number[] = []
    const levelsArr: number[] = [];

    players.forEach((x) => levels.add(Math.floor(x.getLevel())));

    for (const level of levels) {
        let sum: number = 0;
        let count: number = 0;

        players.forEach((player) => {
            if (Math.floor(player.getLevel()) === level)
            {
                sum += player.getBank();
                count += 1;
            }
        })

        const avg = sum / count;
        avgBank.push(avg);
        levelsArr.push(level);
    }

    if (avgBank.length == 0)
        return <p>MUI(E)</p>
    
    return <BarChart
            series={ [{data: avgBank}] }
            height={390}
            xAxis={[{label: 'Average bank per level', data: levelsArr, scaleType: 'band' }]}
            margin={{ top: 30, bottom: 40, left: 30, right: 30 }}
            />
  
}



export const BarGraph = () => {
    const [data, setData] = useState<Player[]>([]);
    const getPlayers = async () => {
       const players =  await api.getAll();
       setData(players);
    }

    useEffect( () => 
    {getPlayers()
    }, [])
    return onFullfiled(data); 
}