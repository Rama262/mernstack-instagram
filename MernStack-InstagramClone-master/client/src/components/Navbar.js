import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';


const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const renderList = () => {
    if (state) {
      return [
        <li key='1'>
          <Link to={state ? '/' : '/signin'}>
            <i className='fa fa-home'></i>
          </Link>
        </li>,
        <li key='2'>
          <Link to='/create'>
            <i className='fa fa-plus-circle'></i>
          </Link>
        </li>,
        <li key='3'>
          <Link to='/profile'>
            <i className='fa fa-user'></i>
          </Link>
        </li>,
        // <li key='4'>
        //   <Link to='/myfollowingpost'>My followers Posts</Link>
        // </li>,
        <li
          key='5'
          style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: 'white',
            letterSpacing: '1px',
            marginRight:'1.5rem'
          }}
          onClick={() => {
            localStorage.clear();
            dispatch({ type: 'CLEAR' });
            history.push('/signin');
          }}
        >
          Logout
        </li>,
      ];
    } else {
      return [
        <li style={{fontWeight:'bold',letterSpacing:'1.5px'}} key='6'>
          <Link to='/signin'>
            Login
          </Link>
        </li>,
        <li style={{fontWeight:'bold',letterSpacing:'1.5px'}} key='7'>
          <Link style={{ fontSize: '15px' }} to='/signup'>
            Register
          </Link>
        </li>,
      ];
    }
  };

  // const fetchUsers = (query) => {
  //   setSearch(query);
  //   fetch('/search-users', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       query,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((results) => {
  //       setUserDetails(results.user);
  //     });
  // };

  return (
    <div>
      <div className='my-logo'>
        {
          <Link to={state ? '/' : '/signin'}>
            <p>
              <i className='fab fa-vimeo'></i> <span data-aos="fade-in">Viks</span>
              <span className='viks-span'>Chat</span>
            </p>
          </Link>
        }
        <Link className='animated pulse infinite' to='/developer'>
          <i className='fas fa-laptop-code'></i>
        </Link>
      </div>
      <nav
        style={{
          backgroundColor: 'rgb(246, 67, 67)',
          position: 'fixed',
          bottom: '0',
          width: '100vw',
          zIndex: '99',
        }}
      >
        <div>
          <ul
            id='nav-mobile'
            style={{
              fontWeight: '500',
              color: 'black',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {renderList()}
          </ul>
        </div>
        {/* <div
          id='modal1'
          class='modal'
          ref={searchModal}
          style={{ color: 'black' }}
        ></div> */}
      </nav>
    </div>
  );
};

export default NavBar;
