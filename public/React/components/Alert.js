import React from 'react';
import store, { updateAlert, fetchMessages } from '../../Redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';

const HIDE_TIME = 5000;

function Alert(props){
    if(props.alert.body){
        $('#alert').removeClass('die clickable');
        setTimeout(()=>hide(props.alert.body),HIDE_TIME);
    }
    else return (<div></div>)

    if(props.alert.messageId)$('#alert').addClass('clickable');
    function jumpToMessageTarget(){
        if(props.alert.messageId)return window.location.hash='#/matches/'+ props.alert.messageId;
        hide();
        fetchMessages(props.alert.messageId,props.user.id);
        return true;
    }
    
    return (
        <div onClick={jumpToMessageTarget} className="alert alert-warning alert-dismissible fade show" id='alert' role="alert">
            <strong>{props.alert.title}</strong> {props.alert.body}
            <button type="button" className="close" onClick={hide}>
                <span aria-hidden="true">&times;</span>
            </button>
      </div>
    )
}

function hide(oldBody){
    //make sure if we're hiding its because it has stayed on screen for a full duration no overlap
    if(oldBody && oldBody!==store.getState().alert.body)return
    $('#alert').addClass('die');
    //store.dispatch(updateAlert({}));
}

const mapStateToProps = function (state) {
    return {
      alert : state.alert,
      user : state.user,
    };
  };

export default connect(mapStateToProps)(Alert);