import React from 'react';
import store, { fetchNextUser, voteOnUser } from '../../Redux';
import { connect } from 'react-redux';

function ShowNextUser (props){
    let { nextUser, user } = props;
    function skip(){
        fetchNextUser(user.id)
    }
    function yay(){
        voteOnUser(user.id,nextUser.id,true);
    }
    function nay(){
        voteOnUser(user.id,nextUser.id,false);
    }
    if(user.id && !nextUser.displayName)fetchNextUser(user.id);
    return (
        <div className='show-matches-container container'>
            <div className='user'>
                <h3 className='user-name'>{nextUser.displayName}</h3>
                <hr />
                <img src={nextUser.pictureUrl} />
                <br /><br />
                <p className='bio'>{nextUser.bio}</p>
                <div className='match-buttons'>
                    <span onClick={yay} data-toggle='tooltip' title='Yes'><i className='green far fa-check-circle'/></span>
                    <span onClick={skip} data-toggle='tooltip' title='Skip'><i className='yellow far fa-question-circle'/></span>
                    <span onClick={nay} data-toggle='tooltip' title='No'><i className='red far fa-times-circle' /></span>
                </div>
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