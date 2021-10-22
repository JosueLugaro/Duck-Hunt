import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Home from './components/Home'
import { authenticate } from './store/session';
import { useModal } from './context/Modal';
import Modal from './components/Modal';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { closeModal } = useModal();
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (() => {
      window.onpopstate = () => {
        closeModal();
      };
    })()
  })

  if (!loaded) {
    return null;
  }

  // REMEMBER TO ADD THE NAV BAR COMPONENT TO THE ROUTES THAT NEED IT
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <Home />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
