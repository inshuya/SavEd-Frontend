import React from 'react';
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";
import { bindActionCreators } from 'redux';

export const NavbarData = [
    {
        title: 'Accounts',
        path: '/accounts',
        icon: <GiIcons.GiBank />,
        cName: 'nav-text'
    },
    {
        title: 'Budget',
        path: '/goals',
        icon: <GiIcons.GiStairsGoal />,
        cName: 'nav-text'
    },
    {
        title: 'Bills and Income',
        path: '/transactions',
        icon: <GiIcons.GiTakeMyMoney />,
        cName: 'nav-text'
    },
    {
        title: 'Monthly Expense Report',
        path: '/expense',
        icon: <GiIcons.GiExpense />,
        cName: 'nav-text'
    },
    {
        title: 'Expense Stats',
        path: '/savings',
        icon: <BiIcons.BiStats />,
        cName: 'nav-text'
    }
]