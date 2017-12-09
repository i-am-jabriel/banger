import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import Login from './Login';
import Header from './Header';
import Settings from './Settings';
import ShowNextUser from './ShowNextUser';
import store, { setLoginStatus, createUser } from '../../Redux';

/*export default class Main extends Component{
    componentDidMount(){
    render(){
        return (
            <HashRouter>
                <div id='main'>
                    <Login loginStatus={}/>
                </div>
            </HashRouter>
        )
    }
}*/
function Main(props){
    const {loginStatus, user} = props;

    return (
        <HashRouter>
            <div>
                <Header store={store} loginStatus={loginStatus}/>
                <div className='main-container container-fluid'>
                    <div className='row'>
                        {(!loginStatus && <Login checkLoginStatus={checkLoginStatus}/>) }
                        <Route exact path="/settings" render={()=><Settings loginStatus={loginStatus} user={user}/>} />
                        {(loginStatus && <Route exact path="/" render={()=><ShowNextUser store={store}/>} /> ) }
                    </div>
                </div>
            </div>
        </HashRouter>
    )
}

const mapStateToProps = function (state) {
    return {
      loginStatus: state.loginStatus,
      user : state.user,
    };
  };

export default connect(mapStateToProps)(Main);

FB.getLoginStatus(function(res) {
    //console.log(response)
    checkLoginStatus(res);
});

function checkLoginStatus(res){
    store.dispatch(setLoginStatus(res.status==='connected'||res.accessToken));
    createUser(res.authResponse||res);
}