import React from 'react';
import * as GiIcons from "react-icons/gi";

export const NavbarData = [
    {
        title: 'Accounts',
        path: '/accounts',
        icon: <GiIcons.GiBank />,
        cName: 'nav-text'
    },
    {
        title: 'Bills and Income',
        path: '/transactions',
        icon: <GiIcons.GiTakeMyMoney />,
        cName: 'nav-text'
    },
    {
        title: 'Expense Report',
        path: '/expense',
        icon: <GiIcons.GiExpense />,
        cName: 'nav-text'
    },
    {
        title: 'Savings Report',
        path: '/savings',
        icon: <GiIcons.GiPiggyBank />,
        cName: 'nav-text'
    },
    {
        title: 'Set Goals',
        path: '/goals',
        icon: <GiIcons.GiStairsGoal />,
        cName: 'nav-text'
    }
]