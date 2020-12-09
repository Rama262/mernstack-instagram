import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';
const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
 
  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'invalid email or password', classes: '#c62828 red darken-3' });
      return;
    }
    setLoading(true)
    fetch('/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'USER', payload: data.user });
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return loading ? (
    <div
      className='preloader-wrapper big active'
      style={{ position: 'absolute', top: '45%', left: '40%' }}
    >
      <div className='spinner-layer spinner-red-only'>
        <div className='circle-clipper left'>
          <div className='circle'></div>
        </div>
        <div className='circle-clipper right'>
          <div className='circle'></div>
        </div>
      </div>
    </div>
  ) : (
    <div className='mycard'>
      <div className='card auth-card input-field'>
        <h2 style={{ letterSpacing: '2px' }}>
          Viks<span className='viks-span'>Chat</span>
        </h2>
        <input
          type='text'
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />
        <button
          className='btn'
          style={{
            margin: '8px 0',
            fontWeight: '500',
            backgroundColor: 'rgb(246, 70, 70)',
          }}
          onClick={() => PostData()}
        >
          Login
        </button>
        <hr style={{ margin: '6px 0' }} />
        <p style={{ fontSize: '22px', fontWeight: '500' }}>
          <Link to='/signup'>Dont have an account ?</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
