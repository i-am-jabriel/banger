import React from 'react';
import store, {updateServerWithUserData} from '../../Redux';

export default function Settings(props){
    const loginStatus = props.loginStatus;
    const user = props.user;
    console.log(user.displayName,user.bio);
    $('#profile-name').val(user.displayName);
    $('#profile-bio').val(user.bio);
    return loginStatus && (
        <div className='profile-container container'>
            <h3>Settings</h3>
            <hr />
            <form onSubmit={checkData}>
                <table><tbody>
                    <tr>
                        <td>Display Name :</td>
                        <td>
                            <input id='profile-name' className="form-control" type="text" placeholder="Display Name" defaultValue={user.displayName} aria-label="Display Name" />
                        </td>
                    </tr>
                    <tr>
                        <td>Bio :</td>
                        <td><textarea id='profile-bio' className='form-control' defaultValue={user.bio}></textarea></td>
                    </tr>
                    <tr>
                        <td><img src={user.pictureUrl} /></td>
                        <td><button className='btn btn-disabled' disabled={true}>Change Photo</button></td>
                    </tr>
                </tbody></table>
                <button className='btn btn-outline-success my-sm-0'>Save</button>
            </form>
        </div>
    )
}

function checkData(event){
    event.preventDefault();
    const [ name, bio ] = event.target;
    updateServerWithUserData({
        name:name.value,
        bio:bio.value,
        id:store.getState().user.id,
    });
}