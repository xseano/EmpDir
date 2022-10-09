import { Navigate } from 'react-router-dom';

const Home = () => {
    const user = JSON.parse(localStorage.getItem("auth.user"));

    if (user !== null) {
        return <Navigate to="/search" />;
    } else {
        return <Navigate to="/login" />;
    }  
};
  
  export default Home;