import React from 'react';



const Navbar = ({onRouteChange, route}) => {





    return (



          <div className="bg-black-90 ph3 pv3 pv4-ns ph4-m ph5-l">
            <div className="flex flex-row justify-end f6 fw6 ttu tracked">

              {/** <a className="link dim white dib mr3" onClick={() => onRouteChange('Home')} title="Store">Home</a> */}

              {route==='Home' ?
              (<div className="link dim white" onClick={() => onRouteChange('Sign In')} title="Sign Out">Sign Out</div>)
              :
              ([
                <div key='1' className="link dim white mr3" onClick={() => onRouteChange('Register')} title="Home">Register</div>,
                <div key='2' className="link dim white mr3" onClick={() => onRouteChange('Sign In')} title="About">Sign In</div>
              ])
               }
            </div>
          </div>



    );

}

export default Navbar;
