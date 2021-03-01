import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions'
import NavigationBar from './NavigationBar';
import './HomePage.css'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Accounts from '../Pages/Accounts';
import Goals from '../Pages/Goals';
import Stats from '../Pages/Stats';
import Transactions from '../Pages/Transactions';
import Leaderboard from '../Pages/Leaderboard';
import Header from './Header'

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

        <>
        
        <Router>
        <NavigationBar />
        <Switch>
          <Route path='/accounts' exact component={Accounts}/>
          <Route path='/goals' component={Goals}/>
          <Route path='/stats' component={Stats}/>
          <Route path='/transactions' render={(props) => <Transactions userid={user.id}/>}/>
          <Route path='/leaderboard' component={Leaderboard}/>
        </Switch>
        </Router>
        </>
    );
}

export { HomePage };