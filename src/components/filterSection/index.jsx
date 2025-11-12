import { useEffect, useState } from 'react';
import './index.css';
import Cookies from 'js-cookie';

const empArr = [
    {
        id: "FULLTIME",
        title: "Full Time"
    },
    {
        id: "PARTTIME",
        title: "Part Time"
    },
    {
        id: "FREELANCE",
        title: "Freelance"
    },
    {
        id: "INTERNSHIP",
        title: "Internship"
    }
]

const salaryArr = [
    {
        id: "1000000",
        title: "10 LPA and above"
    },
    {
        id: "2000000",
        title: "20 LPA and above"
    },
    {
        id: "3000000",
        title: "30 LPA and above"
    },
    {
        id: "4000000",
        title: "40 LPA and above"
    },
]

const FilterSection = ({onChangeEmpType, onChangeSalary}) => {

    const [allValues,setValues] = useState({
        userProfile: {}
    })

    useEffect(()=>{
        
        const fetchProfile = async() =>{
            const api = "https://apis.ccbp.in/profile";
            const token = Cookies.get("myToken");
            const options = {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const response = await fetch(api,options);
                const data = await response.json();
                console.log(data);
                if(response.ok){
                    setValues({...allValues,userProfile: data.profile_details});
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile();
    },[])

    const displayProfile = () => (
        <div className='shadow p-2 rounded'>
            <img src={allValues.userProfile.profile_image_url}/>
            <h4>{allValues.userProfile.name}</h4>
            <p>{allValues.userProfile.short_bio}</p>
        </div>  
    )

    const displayEmpList = () =>{

        const changeEmp = (e) => {
            onChangeEmpType(e.target.checked,e.target.value);
        }

        return(
            <ul className='mt-4'>
                {
                    empArr.map(each => (
                        <li style={{listStyle:"none"}} key={each.id}>
                            <input onChange={changeEmp} className='mr-3' id={each.id} type="checkbox" value={each.id}/>
                            <label htmlFor={each.id}>{each.title}</label>
                        </li>
                    ))
                }
            </ul>
        )
    }

    const displaySalaryFilter = () => {

        const changeSalary = (e) => {
            onChangeSalary(e.target.value);
        };

        return (
            <ul>
                {
                    salaryArr.map(each => (
                        <li style={{listStyle:"none"}} key={each.id}>
                            <input name='salary' className='mr-3' id={each.id} type="radio" value={each.id} onChange={changeSalary}/>
                            <label htmlFor={each.id}>{each.title}</label>
                        </li>
                    ))
                }
            </ul>

        )
    }

    return(
        <div>
            {displayProfile()}<br/>
            <h3>Employment Type</h3>
            {displayEmpList()}
            <hr />
            <h3>Salary Range</h3><br/>
            {displaySalaryFilter()}
        </div>
    )
} 

export default FilterSection;