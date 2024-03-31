import { BarGraph } from "../components/Graphs"

export function GraphsPage()
{
    return (
        <div style={{backgroundColor:"cyan", padding: "1rem", width: "95%"}} className="App">
            <div className='header'>
                    <p>
                        Graphs
                    </p>
            </div>
            <BarGraph />
        </div>
    )
}