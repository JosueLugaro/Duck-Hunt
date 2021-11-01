
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../context/Modal';
import LogoutButton from './auth/LogoutButton';
import NewPostForm from './NewPostForm';
import './NavBar.css'

const NavBar = () => {
  const [isClosed, setIsClosed] = useState('')
  const { toggleModal, setModalContent } = useModal();
  let user = useSelector(state => state.session.user);

  function openNewPostFormModal() {
    setModalContent((
        <NewPostForm />
    ))
    toggleModal();
}

  return (
    <nav className="nav-container">
        <div className="left-side-nav">
          <div className="Logo-container">
            <NavLink to='/'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" className="duck-hunt-svg">
                <path d="m32.202 22.531h-5.6v18.938h5.6c2.865 0 4.862-1.41 5.993-4.232.617-1.549.927-3.393.927-5.531 0-2.953-.464-5.221-1.39-6.801-.927-1.583-2.77-2.374-5.53-2.374" fill="#8e24aa"/>
                <path d="m32 2c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30m10.959 39.094c-2.102 3.609-5.346 5.414-9.732 5.414h-12.511v-29.016h12.511c1.799.025 3.297.236 4.492.629 2.035.67 3.684 1.896 4.944 3.682 1.012 1.443 1.7 3.006 2.068 4.686s.552 3.281.552 4.803c0 3.858-.774 7.126-2.324 9.802" fill="#8e24aa"/>
              </svg>
            </NavLink>
          </div>
        </div>
        <div className="right-side-nav">
          <div className="new-post-container" onClick={() => openNewPostFormModal()}>
            <p className="new-post">New Post</p>
          </div>
          <div className="nav-options-container" onMouseOver={() => setIsClosed('hovered')} onMouseLeave={() => setIsClosed('')}>
              <div className="user-profile-pic-container">
                <img src={user.profile_pic} className="user-profile-pic" alt="user-profile-pic"/>
              </div>
              <div className={`action-container ${isClosed}`}>
                <div className="dropdown-option">
                  <LogoutButton />
                </div>
              </div>
            </div>
        </div>
    </nav>
  );
}

export default NavBar;
