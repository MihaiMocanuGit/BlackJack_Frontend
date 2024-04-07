
import { BarChart } from '@mui/x-charts/BarChart';
import * as api from '../service/backendApi'
import { Player } from '../models/Player';

let result: any;
function onFullfiled(players: Player[])
{
    console.log("ACCEPTED: " + players);
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
    result = <BarChart
            series={ [{data: avgBank}] }
            height={390}
            xAxis={[{label: 'Average bank per level', data: levelsArr, scaleType: 'band' }]}
            margin={{ top: 30, bottom: 40, left: 30, right: 30 }}
            />
}
function onRejected()
{
    console.log("REJECTECTEDDDDD");
    result = 
            <BarChart
                series={ [{}] }
                height={390}
                xAxis={[{label: 'Average bank per level', scaleType: 'band' }]}
                margin={{ top: 30, bottom: 40, left: 30, right: 30 }}
                />
}
export function BarGraph() {
    const response = api.getAll(null);
    response.then(onFullfiled, onRejected);
    return result;

}