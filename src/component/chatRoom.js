import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import Moment from 'react-moment';
 
 
const { io } = require("socket.io-client");


export const ChatRoom = () => {

const location = useLocation();
const msgBoxRef = useRef()
const [data, setData]  = useState({});
 const [ msg, setMsg ] = useState("");
const [allMsg, setAllMsg] = useState([]);
const [socket, setSocket] = useState();

// coction for backend -------------
useEffect(()=>{
  const socket = io("https://gap-sab-app-backend.onrender.com");
   setSocket(socket);
  socket.on("connect", () => {
    // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.emit("roomConnection",location.state.room);
  });
        
}, [])

// data get from login page--------
  useEffect(()=>{
     setData(location.state);
     console.log(data);
  },[location]);

  // for store last msg---------
useEffect(()=>{
  if(socket){
    socket.on("getRecentMsg",newMsg=> {
      setAllMsg([...allMsg, newMsg]);
      msgBoxRef.current.scrollIntoView({behavior: "smooth"})
      setMsg("");
   })
  }
  
},[socket,allMsg])


  const handalChange =(event)=>{
    setMsg(event.target.value)
  }
  const handalKeyDown = e=> e.keyCode===13 ? send() : ""
  const send=()=>{
    if(msg){
      const newMsg = { time:new Date(), msg, name: data.name};
      // setAllMsg([...allMsg, newMsg]);
      socket.emit("newMsg", {newMsg, room: data.room})
    }
     
  }
  return ( 
    
    <div className="py-4 m-5 w-50 shadow bg-white text-dark border rounded container" >
        <div className="text-center px-3 mb-4 text-capitalize">
          <h1 className='text-success mb-4'>Apna {data?.room} Gap-Sap !</h1>
        </div>
        <div className="bg-light border rounded p-3 mb-4" style={{height: "450px", overflowY:"scroll"}}>
        {
          allMsg.map((Msg)=>{
            return data.name === Msg.name
            ?
            <div className="row justify-content-end pl-5 ">
            <div className="d-flex flex-column align-items-end m-2 shadow p-2 bg-info border rounded w-auto">
                <div>
                    <strong className="m-1">{Msg.name}</strong>
                    {/* <small className="text-muted m-1">{Msg.time}</small>  */}
                    <small className="text-muted m-1"><Moment fromNow>{Msg.time}</Moment></small>

                </div>
                <h4 className="m-1">{Msg.msg}</h4>
            </div>
        </div>
        :
          <div className="row justify-content-start">
                                <div className="d-flex flex-column m-2 p-2 shadow bg-warning border rounded w-auto">
                                    <div>
                                        <strong className="m-1">{Msg.name}</strong>
                                        <small className="text-mmuted m-1"><Moment fromNow>{Msg.time}</Moment></small>
                                    </div>
                                    <h4 className="m-1">{Msg.msg}</h4>
                                </div>
                            </div>
          })
        }
        <div ref={msgBoxRef} >  </div>
        </div>
        <div className="form-group d-flex">
        {/* <input type="text" className="form-control bg-light" name="message" onChange={handalChange} placeholder="Type your message" /> */}
        <input type="text" className="form-control bg-light" name="message" 
        onKeyDown={handalKeyDown}
        onChange={handalChange}
        value={msg}
        placeholder="Type your message" />
        <button type="button" className="btn text-success mx-2" 
        onClick={send}
        >Send</button>
        </div>
         </div> 
  )
}
