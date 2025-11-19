import './index.css';
import Header from '../Header';
import home_background from '../../assets/home_back2.png';
import { Link } from 'react-router-dom';

const Home = () => {

    

    return(
        <div className='main' style={{backgroundImage:`url(${home_background})`, backgroundSize:"cover",width:"100%",height:"100vh"}}>
            <Header/>
            <div className='home-cont p-5'>
                <h1 style={{fontSize:"70px"}}>Find your Perfect Job.</h1>
                <h1 style={{fontSize:"70px"}}>Any Time, Any Where.</h1>
                <br /><br />
                <Link to = "/jobs" className="btn btn-light" style={{width:"20%",borderRadius:"20px"}}>Search Jobs</Link>
            </div>
        </div>
    )
} 

export default Home;