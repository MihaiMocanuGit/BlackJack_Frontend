import { useNavigate } from "react-router-dom";
import { BarGraph } from "../components/Graphs"
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export function GraphsPage()
{
    const navigate = useNavigate();
    const { token, loading } = useContext(AuthContext);
    if (loading) {
        return null;
    }

    if (!token) {
            navigate("/login");
            return;
    }
 
    return (
        <div style={{backgroundColor:"cyan", padding: "1rem", width: "95%"}} className="App">
            <div className='header'>
                    <p>
                        Graphs
                    </p>
            </div>
            <BarGraph />
            <button onClick={() => {navigate("/");}}>Return</button>
        </div>
    )
}