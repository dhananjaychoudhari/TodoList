import React from 'react'
import {FaInbox,FaRegCalendarAlt,FaRegCalendar} from 'react-icons/fa';

const Side = ({selectedtab,setselectedtab}) => {
    return (
        <div className="side">
            <div className={selectedtab = "INBOX" ? "active": ""} onClick={()=>setselectedtab("INBOX")}>
            <FaInbox className="icon"/>    
            Inbox</div>
            <div  onClick={()=>setselectedtab("TODAY")}>
                <FaRegCalendarAlt className="icon"/>
                Today</div>
            <div onClick={()=>setselectedtab("NEXT_7")}>
            <FaRegCalendar className="icon"/>
                Next 7 days</div>
        
        </div>
    )
}

export default Side
