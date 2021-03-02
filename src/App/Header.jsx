import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'

import { useDispatch, useSelector } from 'react-redux';

function Header() {
    const user = useSelector(state => state.authentication.user);
    return(
        <div class="container"  className='header'>
            <div class="row">
            <div class="col-3">
                </div>
                <div class="col-6">
                    <h1>SavED</h1>
                </div>
                <div className='col-3'>
                        <span style={{fontSize:'18px'}}>Hi {user? user.firstName:'Guest'}!</span>
                        <span>
                            {user? <Link to="/login" style={{fontSize:'12px'}}>Logout</Link> : ''}
                        </span>
                        </div>
                </div>
            
            
        </div>
        
    )
}

export default Header;