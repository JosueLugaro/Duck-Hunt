import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="view-port">
      <div className="login-heading text">
        <h1>Welcome to Duck Hunt!</h1>
      </div>
      <div className="login-form-container">
        <form onSubmit={onLogin} className="login-form">
          <div className="input-container">
            <div className="email-input-container">
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
                className="email-input"
                />
            </div>
            <div className="password-input-container">
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                className="password-input"
                />
            </div>
            <button type='submit' className="login-button">Login</button>
          </div>
          <div className="errors-container">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
