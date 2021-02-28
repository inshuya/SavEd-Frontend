import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions'
import NavigationBar from './NavigationBar';
import './HomePage.css'

function HomePage() {
    const user = useSelector(state => state.authentication.user);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(userActions.getAll());
    // }, []);

    // function handleDeleteUser(id) {
    //     dispatch(userActions.delete(id));
    // }

    return (
        // <div className="col-lg-8 offset-lg-2">
        //     <h1>Hi {user.firstName}!</h1>
        //     <p>
        //         <Link to="/login">Logout</Link>
        //     </p>
        
        // </div>
        <div id="wrapper">
      <div class="header">
        <p>
          SavEd
        </p>
      </div>
      <div>
      <div class="leftpanel">
      <NavigationBar/>
      </div>
      <div class="rightpanel">
        Data
      </div>
      </div>
    </div>
    );
}

export { HomePage };