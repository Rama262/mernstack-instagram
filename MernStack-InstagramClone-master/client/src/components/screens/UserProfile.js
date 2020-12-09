import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [userProfile, setProfile] = useState(null);

  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)
        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <>
      {userProfile ? (
        <div style={{ maxWidth: '550px', margin: '10% auto' }}>
          <div
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
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '80px',
                  }}
                  src={userProfile.user.pic}
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
                  {userProfile.user.name}
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                  }}
                >
                  {userProfile.user.email}
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
                    <p>{userProfile.user.followers.length} followers</p>
                    <p>{userProfile.user.following.length} following</p>
                  </div>
                </div>
                {showfollow ? (
                  <button
                    style={{
                      margin: '7px 0',
                      backgroundColor: 'rgb(246, 70, 70)',
                      fontWeight: '500',
                    }}
                    className='btn'
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    style={{
                      margin: '7px 0',
                      backgroundColor: 'rgb(246, 70, 70)',
                      fontWeight: '500',
                    }}
                    className='btn'
                    onClick={() => unfollowUser()}
                  >
                    UnFollow
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='gallery'>
            {userProfile.posts.map((item) => {
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
      ) : (
        <div className='preloader-wrapper big active' style={{position:'absolute',top:'45%',left:'40%'}}>
          <div className='spinner-layer spinner-red-only'>
            <div className='circle-clipper left'>
              <div className='circle'></div>
            </div>
            <div className='circle-clipper right'>
              <div className='circle'></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
