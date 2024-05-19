import { useNavigate } from "react-router-dom";
import { BarGraph } from "../components/Graphs"

export function GraphsPage()
{
    const navigate = useNavigate();

    return (
        <div style={{backgroundColor:"cyan", padding: "1rem", width: "95%"}} className="App">
            <div className='header'>
                    <p>
                        Graphs
                    </p>
            </div>
            <BarGraph />
            <button onClick={() => {navigate("/PrimaryPage");}}>Return</button>
        </div>
    )
}