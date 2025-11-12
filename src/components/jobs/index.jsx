import './index.css';
import Header from '../Header';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import FilterSection from '../filterSection';
import { lazy,Suspense } from 'react';
import { HiH1 } from 'react-icons/hi2';
const DisplayAllJobs = lazy(()=>import("../displayAllJobs"));

const Jobs = () => {

    const [allValues,setValues] = useState({
        jobsArr : [],
        userIn : "",
        salary: "",
        emp : []
    }) 

    useEffect(()=>{
        const fetchJobs = async() => {

            const {userIn,salary,emp} = allValues;

            console.log(emp);

            const api = `https://apis.ccbp.in/jobs?employment_type=${emp}&minimum_package=${salary}&search=${userIn}`;
            const token = Cookies.get("myToken");

            const options = {
                method: "Get",
                headers: {
                    Authorization : `Bearer ${token}`
                } 
            }

            try {
                const response = await fetch(api,options);
                const data = await response.json();
                console.log(data);
                if(response.ok){
                    setValues({...allValues,jobsArr:data.jobs})
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobs();
    },[allValues.userIn,allValues.emp,allValues.salary])

    const onUpdateUserIn = (e) => {
        //console.log(e.key);
        if(e.key === "Enter"){
            setValues({...allValues,userIn: e.target.value});
        }
    }

    const onChangeEmpType = (isChecked,value) => {
        if(isChecked){
            setValues({...allValues,emp: [...allValues.emp,value]});
        }
        else{
            setValues({...allValues,emp: allValues.emp.filter(each => each !== value)});
        }
    }

    const onChangeSalary = (value) => {
        setValues({...allValues, salary: value});
    };

    return(
        <>
            <Header/>
            <br />
            <div className='w-100 d-flex justify-content-center'>
                <input onKeyUp = {onUpdateUserIn} type="search" className='form-control border border-pimary w-50' placeholder='Enter your Domain'/>
            </div>
            
            <br />
            <div className='container'>
                <div className='row'>
                    <div className='col-4 p-3 '>
                        <FilterSection onChangeEmpType = {onChangeEmpType} onChangeSalary={onChangeSalary}/>
                    </div>
                    <Suspense fallback = {<h1>Loading...</h1>}>
                        <ul style={{listStyle:"none"}} className='col-8 p-3 '>
                            {
                                allValues.jobsArr.map(each=><DisplayAllJobs key={each.id} jobsItem = {each}/>)
                            }
                        </ul>
                    </Suspense>
                </div>
            </div>
        </>
    )
} 

export default Jobs;