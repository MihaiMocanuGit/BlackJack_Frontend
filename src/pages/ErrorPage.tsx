import { useNavigate } from "react-router-dom";

export function ErrorPage()
{
    const navigate = useNavigate(); 
    return <div style={{backgroundColor:"cyan", padding: "1rem", width: "100%"}} className="App">
                <div className='header'>
                        <p>
                            Error: connection has been lost!
                        </p>
                </div>
                <button onClick={() => navigate("/")}>Try again</button>
            </div>
}