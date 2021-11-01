import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    let errors = [];

    if (!email.includes('@')) errors.push("Please enter a valid email address");
    if (password !== repeatPassword) errors.push("Passwords must match")

    if (errors.length) {
      setErrors(errors);
      return null
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-view-port">
      <h1>Sign Up</h1>
      <div className="signup-form-container">
        <form onSubmit={onSignUp} className="signup-form">
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder="Username"
              className="signup-username input"
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder="Email"
              className="signup-email input"
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder="Password"
              className="signup-password input"
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder="Confirm Password"
              className="signup-confirm-password input"
            ></input>
          </div>
          <button type='submit' className="signup-button">Sign Up</button>
        </form>
          <p className="already-have">Already have an account?</p>
          <NavLink to="/login" className="login-page-link">
            Login!
          </NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;
