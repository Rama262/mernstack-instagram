import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState('');
  useEffect(() => {
    fetch('/mypost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
  }, []);
  useEffect(() => {
    if (image) {
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
          fetch('/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                'user',
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: 'UPDATEPIC', payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };
  return (
    <div style={{ maxWidth: '550px', margin: '10% auto' }}>
      <div
        data-aos='fade-down'
        style={{
          margin: '18px 0px',
          borderBottom: '1px solid grey',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div style={{ paddingTop: '0.5rem' }}>
            <img
              style={{ width: '100px', height: '100px', borderRadius: '80px' }}
              src={state ? state.pic : 'loading'}
            />
          </div>
          <div>
            <p
              style={{
                fontSize: '1.9rem',
                fontWeight: 'bold',
                letterSpacing: '1px',
              }}
            >
              {state ? state.name : 'loading'}
            </p>

            <p
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                letterSpacing: '0.5px',
              }}
            >
              {state ? state.email : 'loading'}
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '108%',
              }}
            >
              <div
                style={{
                  marginTop: '10px',
                  fontSize: '15px',
                  fontWeight: '500',
                }}
              >
                <p>{mypics.length} posts</p>
                <p>{state ? state.followers.length : '0'} followers</p>
                <p>{state ? state.following.length : '0'} following</p>
              </div>
            </div>
          </div>
        </div>

        <div className='file-field input-field' style={{ margin: '10px' }}>
          <div
            className='btn'
            style={{ backgroundColor: 'rgb(246, 70, 70)', fontWeight: '500' }}
          >
            <span>Update Pic</span>
            <input
              type='file'
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
      </div>
      <div className='gallery'>
        {mypics.map((item) => {
          return (
            <img
              key={item._id}
              className='item'
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
