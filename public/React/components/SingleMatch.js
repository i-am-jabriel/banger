import React from 'react';
import store, { updateMessagesList, fetchMessages, setMatch, sendMessage } from '../../Redux';
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
    return (
        <div className='container single-match-container'>
            <h3>{match.displayName}</h3>
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