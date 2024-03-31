
import { BarChart } from '@mui/x-charts/BarChart';
import { PlayersContext, PlayersContextType } from '../pages/PrimaryPage';
import { useContext } from 'react';


export function BarGraph() {
    const {players} = useContext<PlayersContextType>(PlayersContext);
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
    
    return(
        <BarChart
        series={ [{data: avgBank}] }
        height={390}
        xAxis={[{label: 'Average bank per level', data: levelsArr, scaleType: 'band' }]}
        margin={{ top: 30, bottom: 40, left: 30, right: 30 }}
        />
  );
}