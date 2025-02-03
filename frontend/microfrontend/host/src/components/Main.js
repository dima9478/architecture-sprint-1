import React, { lazy } from 'react';

const ProfilePanel = lazy(() => import('profile/ProfilePanel').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
}));
const AddPlacePanel = lazy(() => import('cards/AddPlacePanel').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
}));
const CardList = lazy(() => import('cards/CardList').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
}));

function Main({ currentUser }) {
  return (
    <main className="content">
      <ProfilePanel currentUser={currentUser}>
          <AddPlacePanel />
      </ProfilePanel>
      <CardList currentUser={currentUser}/>
    </main>
  );
}

export default Main;
