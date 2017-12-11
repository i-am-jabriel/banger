import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import store, { setLoginStatus } from '../../Redux';

//import { connect } from 'react-redux';

export default function Header(props){
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <NavLink className="navbar-brand" to="/">Banger</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact={true} className="nav-link" activeClassName='active' to="/">Home</NavLink>
            </li>
            { props.loginStatus && (
              <li className='nav-item'>
                <NavLink className='nav-link' activeClassName='active' to='/matches'>Matches</NavLink>
              </li>
            )}
            { props.loginStatus && (
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName='active' to="/settings">Settings</NavLink>
                </li>
            )}
            </ul>
            { props.loginStatus && (
              <ul className="navbar-nav right">
                <li className="nav-item">
                  <Link className="nav-link" to='/' onClick={logOut}>Logout</Link>
                </li>
              </ul>
            )} 
        </div>
      </nav>
    )
}

function logOut(){
  FB.logout(res=>{
    //FB.getLoginStatus(()=>res);
    //FB.Auth.setAuthResponse(null, 'unknown');
    store.dispatch(setLoginStatus(false));
  });
}

/*const mapStateToProps = function (state) {
    return {
      loginStatus: state.loginStatus
    };
  };

export default connect(mapStateToProps)(Header);*/  