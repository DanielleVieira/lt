import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";

const Home = () => {
    const { logoutGoogle } = useContext(AuthGoogleContext);

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={logoutGoogle}>Sair</Button>
        </div>
    );
}

export default Home;