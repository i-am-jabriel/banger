import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import Login from './Login';
import Header from './Header';
import Settings from './Settings';
import Alert from  './Alert';
import AllMatches from './AllMatches';
import SingleMatch from './SingleMatch';
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
                    <Alert store={store}/>
                    {(!loginStatus && 
                    <div className='row'>
                        <Login checkLoginStatus={checkLoginStatus}/>
                    </div>
                    )}
                    {(loginStatus && 
                    <div className='row'>
                        <Route exact path="/settings" render={()=><Settings loginStatus={loginStatus} user={user}/>} />
                        <Route exact path='/matches' render={()=><AllMatches store={store} /> } />
                        <Route exact path='/matches/:uid' render={(props)=><SingleMatch store={store} matchId={props.match.params.uid}/>} /> 
                        <Route exact path="/" render={()=><ShowNextUser store={store}/>} /> 
                    </div>
                    )}
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

window.fbAsyncInit = function() {
     FB.getLoginStatus(function(res) {
        //console.log(response)
        checkLoginStatus(res);
     });
}

/*if(!window.FB){
    store.dispatch(setLoginStatus(true));
    createUser({id:'10210693224551695'});
}*/

function checkLoginStatus(res){
    store.dispatch(setLoginStatus(res.status==='connected'||res.accessToken));
    createUser(res.authResponse||res);
    
}