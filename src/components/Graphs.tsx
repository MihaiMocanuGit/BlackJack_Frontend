
import { BarChart } from '@mui/x-charts/BarChart';
import { PlayersContext, PlayersContextType } from '../pages/PrimaryPage';
import { useContext } from 'react';
import { Player } from '../models/Player';



export function ChartsOverviewDemo() {
    const {players} = useContext<PlayersContextType>(PlayersContext);
    const levels = new Set<number>();
    const avgBank: number[] = []
    const levelsArr: number[] = [];
    players.forEach((x) => levels.add(x.getLevel()));

    for (const level of levels) {
        let sum: number = 0;
        let count: number = 0;

        players.forEach((player) => {
            if (player.getLevel() === level)
            {
                sum += player.getBank();
                count += 1;
            }
        })

        const avg = sum / count;
        avgBank.push(avg);
        levelsArr.push(level);
    }
    
    return(
        <BarChart
        series={ [{data: avgBank}] }
        height={290}
        xAxis={[{ data: levelsArr, scaleType: 'band' }]}
        margin={{ top: 40, bottom: 30, left: 150, right: 10 }}
        />
  );
}