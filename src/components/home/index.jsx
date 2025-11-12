import './index.css';
import Header from '../Header';
import { Link } from 'react-router-dom';

const Home = () => {

    

    return(
        <>
            <Header/>
            <div className='home-cont'>
                <h1>Welcome to our Application please click the button</h1>
                <br />
                <Link to = "/jobs" className="btn btn-primary">Find Jobs</Link>
            </div>
        </>
    )
} 

export default Home;