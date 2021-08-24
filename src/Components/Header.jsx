import React from 'react';
import logo from '../assert/images/logo.png';

const Header = () => {
    return (
       <header className="header">
           <nav>
               <div className="logo">
                   <img src={logo} alt="TodoList"></img>

               </div>
           </nav>

       </header>
    )
}

export default Header
    