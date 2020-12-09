import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';

const CretePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url) {
      fetch('/createpost', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          title,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: '#c62828 red darken-3' });
          } else {
            M.toast({
              html: 'Created post Successfully',
              classes: '#43a047 green darken-1',
            });
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
    setLoading(true);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'ViksChat');
    data.append('cloud_name', 'viks');
    fetch('https://api.cloudinary.com/v1_1/viks/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        setLoading(false);
        history.push('/');
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
    <div
      className='card input-filed'
      style={{
        margin: '40% auto',
        maxWidth: '500px',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <p
        style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}
      >
        Create ur new post
      </p>
      <input
        type='text'
        placeholder='Caption for post'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className='file-field input-field'>
        <div
          className='btn'
          style={{ backgroundColor: 'rgb(246, 70, 70)', fontWeight: '500' }}
        >
          <span>Upload Image</span>
          <input type='file' onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className='file-path-wrapper'>
          <input className='file-path validate' type='text' />
        </div>
        <p style={{color:'grey'}}>as if now only photos are allowed to upload</p>
      </div>
      <button
        className='btn'
        style={{ fontWeight: '500', backgroundColor: 'rgb(246, 70, 70)' }}
        onClick={() => postDetails()}
      >
        Add post
      </button>
    </div>
  );
};

export default CretePost;
