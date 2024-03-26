
import { BarChart } from '@mui/x-charts/BarChart';
import { PlayersContext, PlayersContextType } from '../pages/PrimaryPage';
import { useContext } from 'react';
import { Player } from '../models/Player';

const sort2Arrays = (sortFocus: number[], auxiliary: number[][]): [number[], number[][]] => {
    const len = sortFocus.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (sortFocus[j] > sortFocus[j + 1]) {
                [sortFocus[j], sortFocus[j + 1]] = [sortFocus[j + 1], sortFocus[j]];
                [auxiliary[j], auxiliary[j + 1]] = [auxiliary[j + 1], auxiliary[j]];
            }
        }
    }

    return [sortFocus, auxiliary];
}

export function ChartsOverviewDemo() {
    const {players} = useContext<PlayersContextType>(PlayersContext);
    const bankRelativeToLevel: number[][] = [];
    const levelIndex: number[] = [];

    players.forEach((player) => {
        let existingLevel = false;
        for (let i = 0; i < levelIndex.length; i++)
        {
            if (levelIndex[i] === player.getLevel())
            {
                bankRelativeToLevel[i].push(player.getBank());
                existingLevel = true;
            }
        }

        if (!existingLevel)
        {
            levelIndex.push(player.getLevel())
            bankRelativeToLevel.push([player.getBank()]);
        }
    })

    sort2Arrays(levelIndex, bankRelativeToLevel);
    
    console.log("Lenght: " + levelIndex.length);
    bankRelativeToLevel.forEach((list) => {console.log(list.length)})

    const chartSeries: {dataKey: string}[] = [];
    
    for (let i = 0; i < levelIndex.length; i++)     
    
  return (
    <BarChart
      series={[ 
        { data: [bankRelativeToLevel[0][0], bankRelativeToLevel[1][0], bankRelativeToLevel[2][0]] },
        { data: [bankRelativeToLevel[0][1], bankRelativeToLevel[1][1], bankRelativeToLevel[2][1]] },
        // { data: bankRelativeToLevel[1] },
        // { data: bankRelativeToLevel[2] }
      ]}
      height={290}
      xAxis={[{ data: levelIndex, scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 150, right: 10 }}
    />
  );
}