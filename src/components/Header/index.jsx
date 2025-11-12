import './index.css';
import { Link } from 'react-router-dom';
import joblanceLogo from '../../assets/joblance_logo2.png';

const Header = () => {

    

    return(
        <nav>
            <Link to = "/">
                <img src={joblanceLogo} width="150" className='rounded' />
            </Link>

            <ul className='my-items'>
                <li className='mr-4'>
                    <Link to = "/" style={{color:"white"}}>Home</Link>
                </li>
                <li>
                    <Link to = "/jobs" style={{color:"white"}}>Jobs</Link>
                </li>
            </ul>

            <button className='btn btn-danger'>Logout</button>
        </nav>
    )
} 

export default Header;