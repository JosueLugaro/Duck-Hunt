import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
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

    let errors = [];

    if (email.trim() === "") errors.push("Please provide an email");
    if (!email.includes('@')) errors.push("Please enter a valid email address");
    if (password.trim() === "") errors.push("Please provide an password");

    if (errors.length) {
      setErrors(errors)
      return null
    }

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault()
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data)
    }
  }

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
      <div className="main-content">
        <div className="blurb-about-duck-hunt">
          <h1>Welcome to Duck Hunt!</h1>
          <p>
            A lovely community of duck lovers who can share their
            interests and fascinations with each other!
          </p>
        </div>
        <div className="login-container">
          <div className="login-heading text">
            <h1>Login</h1>
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
                    className="login-email-input"
                    />
                </div>
                <div className="password-input-container">
                  <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                    className="login-password-input"
                    />
                </div>
                <div className="login-buttons-container">
                  <button type='submit' className="login-button">Login</button>
                  <button className="login-button" onClick={demoLogin}>Demo Login</button>
                </div>
              </div>
              <div className="errors-container">
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
            </form>
            <div className="outside-form-container">
              <p>Don't have an account?</p>
              <NavLink to="/sign-up" className="sign-up-link">
                Sign Up!
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="about-container">
        Engineered by Josue Lugaro (<a href="https://github.com/JosueLugaro" target="_blank" rel="noreferrer" className="my-name">Github</a>, {""}
        <a href="https://www.linkedin.com/in/josue-e-j-lugaro-3462131b8/" target="_blank" rel="noreferrer" className="my-name">LinkedIn</a>)
      </div>
    </div>
  );
};

export default LoginForm;
