
import { BarChart } from '@mui/x-charts/BarChart';
import * as api from '../service/backendApi'
import { Player } from '../models/Player';
import { useActionData, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';

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
        return <p>MUI</p>
    
    return <BarChart
            series={ [{data: avgBank}] }
            height={390}
            xAxis={[{label: 'Average bank per level', data: levelsArr, scaleType: 'band' }]}
            margin={{ top: 30, bottom: 40, left: 30, right: 30 }}
            />
  
}



export const BarGraph = () => {
    const [data, setData] = useState<Player[]>([]);
    const { token, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect( () => 
        {getPlayers()
        }, [])
        

    if (loading) {
        return null;
    }

    if (!token) {
            navigate("/login");
            return;
    }
 

    const getPlayers = async () => {
       const players =  await api.getAll(token);
       setData(players);
    }


    return onFullfiled(data); 
}