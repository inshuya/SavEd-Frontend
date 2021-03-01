import React from 'react';
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";

export const NavbarData = [
    {
        title: 'Accounts',
        path: '/accounts',
        icon: <GiIcons.GiStairsGoal />,
        cName: 'nav-text'
    },
    {
        title: 'Budget Stats',
        path: '/stats',
        icon: <BiIcons.BiStats />,
        cName: 'nav-text'
    },
    {
        title: 'Bills and Income',
        path: '/transactions',
        icon: <GiIcons.GiTakeMyMoney />,
        cName: 'nav-text'
    },
    {
        title: 'Leaderboard',
        path: '/leaderboard',
        icon: <GiIcons.GiPodiumWinner />,
        cName: 'nav-text'
    },
    {
        title: 'Goals',
        path: '/goals',
        icon: <GiIcons.GiStairsGoal />,
        cName: 'nav-text'
    }
]