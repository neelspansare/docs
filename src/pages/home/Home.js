import './Home.css';
import Logo from '../../assets/icons/logo.png';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const fullName = location.state?.fullName
  return (
    <>
      <img width={165} height={25} src={Logo} alt='logo' className="heading" />
      <div style={styles.container}>
        <h2 className="f-24 text-white">Hello {fullName}</h2>
      </div>
    </> 
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: "url(/assets/background.png) no-repeat 100% 90%"
  },
}

export default Home;
