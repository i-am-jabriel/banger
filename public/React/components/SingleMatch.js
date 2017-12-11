import React from 'react';
import store, { updateMessagesList, fetchMessages, setMatch, sendMessage, deleteMatchBetween } from '../../Redux';
import { connect } from 'react-redux';


function SingleMatch(props){
    const match = props.matches.reduce((oldVal,newVal)=>newVal.id===Number(props.matchId)?newVal:oldVal,{})
    if(match !== props.match)store.dispatch(setMatch(match));
    //const innerHtml = props.messages.reduce((oldV,newV)=> oldV + newV.message + '<br />','');
    $().ready(()=>$('#chat').scrollTop($('#chat')[0].scrollHeight));
    fetchMessages(props.user.id,props.matchId);
    //console.log(props.messages);

    
    function handleSubmit(event){
        event.preventDefault();
        sendMessage(event.target[0].value,match.id,props.user.id);
        event.target[0].value='';
    }
    function unlike(){
        window.location.hash='/matches';
        deleteMatchBetween(props.user.id,props.matchId);
    }
    return (
        <div className='container single-match-container'>
            <div className='single-match-header'>
                <h3>{match.displayName}</h3>
                <ul className='navbar-nav'>
                    <li className='nav-item dropdown'>
                        <a className="nav-link dropdown-toggle clickable" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Settings
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item clickable" onClick={unlike}>Unmatch</a>
                            <a className="dropdown-item clickable" onClick={unlike}>Report</a>
                        </div>
                    </li>
                </ul>
            </div>
            <hr />
            <div className='chat' id='chat'>
                {props.messages.map(message=>{
                    return (
                        <p key={message.id} className={message.user_from!==props.user.id?'chat-message chat-recieved':'chat-message chat-sent'}>
                            {message.message}
                        </p>
                    )
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <input className='chat-input' placeholder='Say something!'/>
                <button className='chat-submit'>Send</button>
            </form>
        </div>
    )
}

const mapStateToProps = function (state) {
    return {
      messages : state.messages,
      user : state.user,
      matches : state.matches,
    };
  };

export default connect(mapStateToProps)(SingleMatch);