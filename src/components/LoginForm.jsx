import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function LoginForm({ route, method }) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const Page_name = method === "login" ? "Login" : "Register";

    const handlesubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (e){
            alert(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{Page_name}</h2>
            <form onSubmit={handlesubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
