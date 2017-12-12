import React from 'react';
import store, { fetchNextUser, voteOnUser } from '../../Redux';
import { connect } from 'react-redux';
import { setInterval } from 'timers';

function ShowNextUser (props){
    let { nextUser, user } = props;
    function skip(){
        fetchNextUser(user.id)
        fade('Down');
    }
    function yay(){ 
        voteOnUser(user.id,nextUser.id,true);
        fade('Right');
    }
    function nay(){
        voteOnUser(user.id,nextUser.id,false);
        fade('Left');
    }
    function fade(direction){
        $('.show-matches-container').clone().appendTo('.show-matches-container-clone');
        $('.show-matches-container-clone').addClass('fadeOut'+direction);
        setTimeout(()=>{
           $('.show-matches-container-clone').removeClass('fadeOutDown fadeOutLeft fadeOutRight').html(''); 
        },1000)
    }
    if(user.id && !nextUser.displayName)fetchNextUser(user.id);
    $.ready(()=>{
        
    })
    return (
        <div className='show-matches-container container'>
            { nextUser.displayName ? (

                <div className='user'>
                <h3 className='user-name'>{nextUser.displayName}</h3>
                <hr />
                <img src={nextUser.pictureUrl} />
                <br /><br />
                <p className='bio'>{nextUser.bio}</p>
                <div className='match-buttons'>
                    <span onClick={nay} data-toggle='tooltip' title='No'><i className='red far fa-times-circle' /></span>
                    <span onClick={skip} data-toggle='tooltip' title='Skip'><i className='yellow far fa-question-circle'/></span>
                    <span onClick={yay} data-toggle='tooltip' title='Yes'><i className='green far fa-check-circle'/></span>
                </div>
            </div>
            ) : (
                <div className='no-user' style={{height:'50px',margin:'220px 0'}}>
                    <p>No available new users please check again later!</p>
                </div>
            )}  
            <div className='show-matches-container-clone animated'>
            </div>
        </div>
    )
}

const mapStateToProps = function (state) {
    return {
      nextUser : state.nextUser,
      user : state.user,
    };
  };

export default connect(mapStateToProps)(ShowNextUser);