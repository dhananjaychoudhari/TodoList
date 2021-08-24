import React, { useState } from 'react'
import Side from './Side'
import Task from './Task'

const Content = () => {
    const [selectedtab,setselectedtab]=useState("INBOX")
    return (
        <section className="content"> 
            <Side selectedtab={selectedtab} setselectedtab={setselectedtab} />
            <Task selectedtab={selectedtab}/>
        </section>
    )
}

export default Content
