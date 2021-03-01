import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from 'react-router-dom';
import {NavbarData} from './NavigationBarData';
import './Navbar.css';
import {IconContext} from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';

function NavigationBar() {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const user = useSelector(state => state.authentication.user);
    return (
      <>
      <IconContext.Provider value={{color: 'red'}}>
      <div className='header'>
            <table>
                <tbody width="100%">
                <tr>
                    <td width = "20%">
                    <div className="navbar">
                    <Link to="#" className='menu-bars'>
                      <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                  </div>
                    </td>
                    <td width = "60%">
                    <h1>SavED</h1>
                    </td>
                    <td width = "20%">
                    <div className='header-right'>
                        <span>Hi {user.firstName}!</span>
                        <span>
                            <Link to="/login">Logout</Link>
                        </span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
      
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className='menu-bars'>
            <AiIcons.AiOutlineClose/>
            </Link>
          </li>
          {NavbarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
      </>
    );
  }


export default NavigationBar; 