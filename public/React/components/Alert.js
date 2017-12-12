import React from 'react';
import store, { updateAlert, fetchMessages } from '../../Redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { setTimeout } from 'timers';

const HIDE_TIME = 5000;

function Alert(props){
    if(props.alert.body){
        $('#alert').removeClass('die');
        setTimeout(()=>hide(props.alert.body),HIDE_TIME);
    }
    else return (<div></div>)
    function jumpToMessageTarget(){
        if(props.alert.messageId){
             window.location.hash='#/matches/'+ props.alert.messageId;
             fetchMessages(props.alert.messageId,props.user.id);
        }
        hide();
        return true;
    }
    
    return (
        <div onClick={jumpToMessageTarget} className="alert animated clickable alert-warning alert-dismissible fade show" id='alert' role="alert">
            <strong>{props.alert.title}</strong> {props.alert.body}
            <button type="button" className="close" onClick={hide}>
                <span aria-hidden="true">&times;</span>
            </button>
      </div>
    )
}

function hide(oldBody){
    //make sure if we're hiding its because it has stayed on screen for a full duration no overlap
    if(typeof oldBody === 'string' && oldBody!==store.getState().alert.body)return
    $('#alert').addClass('zoomOutDown');
    setTimeout(()=>{
        $('#alert').removeClass('zoomOutDown').addClass('die');
    })
    oldBody && oldBody.stopPropagation && oldBody.stopPropagation();
    //store.dispatch(updateAlert({}));
}

const mapStateToProps = function (state) {
    return {
      alert : state.alert,
      user : state.user,
    };
  };

export default connect(mapStateToProps)(Alert);