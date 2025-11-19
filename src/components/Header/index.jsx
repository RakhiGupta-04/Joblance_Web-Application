import './index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import joblanceLogo from '../../assets/joblance_logo_t2.png';
import Cookies from 'js-cookie'

const Header = () => {

    const navigate = useNavigate();

    const onLogOut = () => {
        
            Cookies.remove("myToken",{ path: "/" }); 
            navigate("/login");
          
    }

    return(
        <nav>
            <Link to = "/">
                <img src={joblanceLogo} width="200px" className='rounded' />
            </Link>

            <ul className='my-items'>
                <li className='mr-4'>
                    <Link to = "/" style={{color:"white"}}>Home</Link>
                </li>
                <li>
                    <Link to = "/jobs" style={{color:"white"}}>Jobs</Link>
                </li>
            </ul>

            <button onClick={onLogOut} className='btn btn-danger'>Logout</button>
        </nav>
    )
} 

export default Header;