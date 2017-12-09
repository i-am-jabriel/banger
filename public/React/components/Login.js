/*const mapStateToProps = function (state) {
    return {
      messages: state.messages,
      channels: state.channels
    };
  };*/
import React from 'react';

import FacebookLogin from 'react-facebook-login';

import store, { setLoginStatus } from '../../Redux';

export default function Login(props){
    if(props.loginStatus===true)return (<div></div>);
    else
    return (
        <div>
            <FacebookLogin
                appId="1063116787164466"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={props.checkLoginStatus}
            />
        </div>
    )
}
function componentClicked(res){
    console.log('clicked',...arguments);
}