import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../contexts/AuthProvider";
import Figure from "react-bootstrap/Figure";

const Home = () => {
    const { logout, user } = useContext(AuthContext);

    return (
        <div>
            <h1>Home: {user.displayName}, {user.email}</h1>
            <Figure.Image src={user.photoURL} referrerPolicy="no-referrer"/>
            <Button onClick={logout}>Sair</Button>
        </div>
    );
}

export default Home;