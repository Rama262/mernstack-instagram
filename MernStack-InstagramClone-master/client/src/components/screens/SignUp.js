import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
const SignIn = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);
  const uploadPic = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'new-insta');
    data.append('cloud_name', 'cnq');
    fetch('https://api.cloudinary.com/v1_1/cnq/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        setLoading(false);
        history.push('/SignIn');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'invalid email', classes: '#c62828 red darken-3' });
      return;
    }
    
    setLoading(true);
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
          
        } else {
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
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
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />
        <div className='file-field input-field'>
          <div className='btn' style={{ backgroundColor: 'rgb(246, 70, 70)' }}>
            <span style={{ fontWeight: '500' }}>Profile Pic</span>
            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className='file-path-wrapper'>
            <input
              className='file-path validate'
              type='text'
              placeholder='its optional'
            />
          </div>
        </div>
        <button
          className='btn'
          style={{
            fontWeight: 'bold',
            marginBottom: '14px',
            backgroundColor: 'rgb(246, 70, 70)',
          }}
          onClick={() => PostData()}
        >
          Register
        </button>
        <hr />
        <p style={{ fontSize: '22px', fontWeight: '500' }}>
          <Link to='/signin'>Already have an account ?</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
