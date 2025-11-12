import { Link } from 'react-router-dom';
import './index.css';
import { FaStar,FaLocationDot,FaBriefcase  } from "react-icons/fa6";
import { useEffect } from 'react';

const DisplayAllJobs = ({jobsItem}) => {

    

    return(
        <Link to={`/jobs/${jobsItem.id}`} style={{ textDecoration: "none", color: "black" }}>
            <li className='shadow mb-3 p-3 rounded'>
                <div className='d-flex'>
                    <img src={jobsItem.company_logo_url} width="70px" height="70px"/>
                    <div className='m-3'>
                        <h3>{jobsItem.title}</h3>
                        <FaStar className='text-warning mr-2'/>
                        <span>{jobsItem.rating}</span>
                    </div>
                </div>
                <div className='mt-3 d-flex justify-content-between align-items-center'>
                    <div>
                        <FaLocationDot className='mr-2'/>
                        <span className='mr-4'>{jobsItem.location}</span>
                        <FaBriefcase  className='mr-2'/>
                        <span>{jobsItem.employment_type}</span>
                    </div>
                    <h4>{jobsItem.package_per_annum}</h4>
                </div>
                <hr className='bg-primary'/>
                <p>{jobsItem.job_description}</p>
            </li>
        </Link>
    )
} 

export default DisplayAllJobs;