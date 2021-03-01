import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
    const user = useSelector(state => state.authentication.user);
    return(
        <div className='header'>
            <table>
                <tbody width="100%">
                <tr>
                    <td width = "20%">
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
        
    )
}

export default Header;