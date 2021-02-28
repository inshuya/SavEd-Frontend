import React from 'react';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';


class NavigationBar extends React.Component {
  render() {
    return (
      <div>
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({itemId}) => {
              // maybe push to the route
            }}
            items={[
              {
                title: 'Accounts',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                //elemBefore: () => <Icon name="inbox" />,
              },
              {
                title: 'Budget',
                itemId: '/management',
                //elemBefore: () => <Icon name="users" />,
                // subNav: [
                //   {
                //     title: 'Projects',
                //     itemId: '/management/projects',
                //   },
                //   {
                //     title: 'Members',
                //     itemId: '/management/members',
                //   },
                // ],
              },
              {
                title: 'Bills and Income',
                itemId: '/another',
                // subNav: [
                //   {
                //     title: 'Teams',
                //     itemId: '/management/teams',
                //   },
                // ],
              },
              {
                title: 'Leaderboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                //elemBefore: () => <Icon name="inbox" />,
              },
              {
                title: 'Goal',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                //elemBefore: () => <Icon name="inbox" />,
              },
            ]}
          />
          </div>
    );
  }
}

export default NavigationBar;