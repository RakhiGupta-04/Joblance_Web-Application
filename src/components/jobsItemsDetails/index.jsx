import './index.css'
import Header from '../Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaStar, FaLocationDot, FaBriefcase } from 'react-icons/fa6';

const JobsItemDetails = () =>{

  const {id} = useParams();  // Get the job id from URL  
  const [allValues, setValues] = useState({
    jobDetails: {},
    jobsSkills: [],
    lifeAtCompany: {},
    similarJobs: []
  });

  useEffect(() => {
    const fetchJobDetails = async () => {

      const token = Cookies.get("myToken");
      const api = `https://apis.ccbp.in/jobs/${id}`;
        
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(api, options);
        const data = await response.json();

        console.log(data);

        if (response.ok) {
          setValues({
            jobDetails: data.job_details,
            jobsSkills: data.job_details.skills,   
            lifeAtCompany: data.job_details.life_at_company, 
            similarJobs: data.similar_jobs,
          });
        }
      } catch (error) {
        console.log(error);
      } 
    };

    fetchJobDetails();
  
  }, [id]);

  const { jobDetails,jobsSkills,lifeAtCompany,similarJobs } = allValues;
  
  return (
   
    
      <div className='main w-100'>
        <Header/>
        <div className='jobs_card shadow mb-3 p-4 rounded w-75'>
            <div className='d-flex'>
              <img src={jobDetails.company_logo_url} width="70px" height="70px"/>
              <div className='m-3'>
                <h3>{jobDetails.title}</h3>
                <FaStar className='text-warning mr-2'/>
                <span>{jobDetails.rating}</span>
              </div>
            </div>
            <div className='mt-3 d-flex justify-content-between align-items-center'>
              <div>
                <FaLocationDot className='mr-2'/>
                  <span className='mr-4'>{jobDetails.location}</span>
                  <FaBriefcase  className='mr-2'/>
                  <span>{jobDetails.employment_type}</span>
              </div>
              <h4>{jobDetails.package_per_annum}</h4>
            </div>
            <hr className='bg-primary'/>
            <p>{jobDetails.job_description}</p>
            
        </div>

        <div className="shadow mb-3 p-3 rounded w-75 skills_req">
          <h3>Skills Required</h3>
          <ul className="d-flex flex-wrap">
            {jobsSkills.map(skill => (
              <li key={skill.name} className="d-flex align-items-center mr-5">
                <img
                  src={skill.image_url}
                  alt={skill.name}
                  width="40px"
                  height="40px"
                />
                <span className="m-3">{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="shadow mb-3 p-4 rounded w-75 life_at_company">
          <h3>Life at Company</h3>
          <div className='d-lg-flex '>
            <p className='mr-3'>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="life" width="90%" />
          </div>
        </div>

        <div className='w-75'>
        <h3>Similar Jobs</h3>
        <div className="row">
          {similarJobs.map((job) => (
            <div key={job.id} className="col-md-4 mb-4">
              <div className="card shadow p-3" style={{backgroundColor: "rgb(221, 236, 249)"}}>
                <div className='d-flex'>
                  <img src={job.company_logo_url} alt="logo" width="60" height="60"/>
                  <div>
                    <h4 className="ml-3 mt-3">{job.title}</h4>
                    <p>
                      <FaStar className="text-warning ml-3" /> {job.rating}
                    </p>
                  </div>
                </div>
                <div className='d-flex'>
                  <p className='mr-3'>
                    <FaLocationDot className='mr-1'/> 
                    {job.location}
                  </p>
                  <p>
                    <FaBriefcase className='mr-1'/> 
                    {job.employment_type}
                  </p>
                </div>
                <hr className='bg-primary'/>
                <p style={{ fontSize: "12px" }}>
                  {job.job_description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
   
  )
}

export default JobsItemDetails;
