import React from 'react';
import store, { updateAlert, fetchMatches } from '../../Redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function AllMatches(props){
    fetchMatches();
    return (
        <div className='container matches-container'>
            <div className='header'>
                <h3>Matches</h3>
                <hr />
            </div>
            <div className='list-group'>
            {props.matches.map(match=>{
                return (
                    <Link key={match.id} to={'/matches/'+match.id} className='list-group-item list-group-item-action'>
                        <img src={match.pictureUrl} className='match-picture'/>
                        {match.displayName}
                    </Link>
                    )
            })}
            {!props.matches.length && (
                <p>
                    No matches yet :(

                    Keep Swiping!
                </p>
            )}
            </div>
        </div>
    )
}

const mapStateToProps = function (state) {
    return {
      matches : state.matches
    };
  };

export default connect(mapStateToProps)(AllMatches);