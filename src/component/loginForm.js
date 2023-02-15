import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {

    let navigate = useNavigate();
    const [error, setError] = useState("");
    const [data, setData] = useState({name:"", room:""});

     
const handleChange = (event)=>{
  // console.log(event.target.name ,  event.target.value);
  setData({
    ...data,
    [event.target.name]: event.target.value
  })
}

//  to check input like (name and chat room) are filled or not.
const validation =()=>{
    if(!data.name){
        setError("Please Enter your name")
        return false;

    }
    if(!data.room){
        setError("Please Enter your chat room")
        return false;
        
    }
    setError("")
    return true;
}
 

 
const handleSubmit=(event)=>{
    event.preventDefault()      // this line stop to refresh page
    const isValid = validation();
    // console.log(isValid);
    if(isValid){
        navigate(`/chat/${data.room}`,{state: data});
    }
}
 
  return (
     <div className='px-3 py-4 shadow bg-white text-dark border rounded row '>
        <form onSubmit={handleSubmit}>
            <div className='from-group mb-4'>
           <h2 className='text-success mb-4'> Welcome to the Gap-Sap app</h2>
            </div>
            <div className='from-grup mb-4'>
          <input type="text" 
          onChange={handleChange}
          className='from-control bg-light' name ="name" placeholder='Please Enter Your Name'/>
            </div>
            <div className='from-grup mb-4'>
           <select className='from-select bg-light' 
           onChange={handleChange}
           name='room'>
            <option value="">Select Room</option>
            <option value="office">Office Room</option>
            <option value="friends">Friends Room</option>
            <option value="family">Family Room</option>
           </select>
            </div> 
            <button type='submit' className='btn btn-success w-100 mb-2'>Submit</button>
            {
                error ? <small className='text-warning  m-auto'>{error}</small>:""
            }
        </form>
     </div>
  )
}
 