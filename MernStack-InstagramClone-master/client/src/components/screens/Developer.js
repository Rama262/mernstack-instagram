import React from 'react';

const Developer = () => {
  return (
    <div>
      <div className='col s12 m7' style={{ paddingTop: '20px' }}>
        <p className='dev-heading'>--- Developer Profile ---</p>
        <div className='card horizontal'>
          <div className='card-stacked'>
            <div className='card-content'>
              <div className='dev-work'>MernStack Developer</div>
              <div>
                <p style={{ paddingBottom: '5px' }}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'rgb(246, 67, 67)',
                    }}
                  >
                    {' '}
                    <i
                      style={{ marginRight: '5px' }}
                      className='fas fa-user'
                    ></i>
                    Name :
                  </span>{' '}
                  <span style={{ letterSpacing: '1px', fontWeight: '600' }}>
                    Vikas
                  </span>
                </p>
              </div>
              <div>
                <p style={{ paddingBottom: '5px' }}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'rgb(246, 67, 67)',
                    }}
                  >
                    {' '}
                    <i
                      style={{ marginRight: '5px' }}
                      className='fas fa-envelope-square'
                    ></i>
                    E-mail :
                  </span>{' '}
                  <span style={{ letterSpacing: '1px', fontWeight: '600' }}>
                    vikasshambhu1000@gmail.com
                  </span>
                </p>
              </div>
              <div>
                <p style={{ paddingBottom: '5px' }}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'rgb(246, 67, 67)',
                    }}
                  >
                    {' '}
                    <i
                      style={{ marginRight: '5px' }}
                      className='fas fa-mobile-alt'
                    ></i>
                    Phone :
                  </span>{' '}
                  <span style={{ letterSpacing: '1px', fontWeight: '600' }}>
                    <a href='tel:+91 8880-889484'>8880 - 889484</a>
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'rgb(246, 67, 67)',
                    }}
                  >
                    {' '}
                    <i
                      style={{ marginRight: '5px' }}
                      className='fas fa-map-marker-alt'
                    ></i>
                    Location :
                  </span>{' '}
                  <span style={{ letterSpacing: '1px', fontWeight: '600' }}>
                    Bidar, Karnataka | 585401
                  </span>
                </p>
              </div>
            </div>
            <hr />
            <div class='card-action'>
              <div className='dev-tech'>
                Technologies used to Develop this application
              </div>
              <div>
                <p style={{ paddingBottom: '5px' }}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'rgb(246, 67, 67)',
                    }}
                  >
                    Front-End :
                  </span>{' '}
                  <span style={{ letterSpacing: '1px', fontWeight: '600' }}>
                    HTML,CSS,JAVASCRIPT & REACT
                  </span>
                </p>
              </div>
              <div>
                <p style={{ paddingBottom: '5px' }}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'rgb(246, 67, 67)',
                    }}
                  >
                    Server Side :
                  </span>{' '}
                  <span style={{ letterSpacing: '1px', fontWeight: '600' }}>
                    Node-js & Express
                  </span>
                </p>
              </div>
              <div>
                <p style={{ paddingBottom: '5px' }}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'rgb(246, 67, 67)',
                    }}
                  >
                    Data-Base :
                  </span>{' '}
                  <span style={{ letterSpacing: '1px', fontWeight: '600' }}>
                    Mongo - DB
                  </span>
                </p>
                <marquee direction='left' style={{fontWeight:'bold',padding:'5px'}}>
                  <p>
                    ihave developed this application taking an truely inspiration from INSTAGRAM
                  </p>
                </marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
