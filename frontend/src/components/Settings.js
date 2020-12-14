import React from 'react';
import EditProfile from './editProfile/EditProfile'
import '../css/Settings.css'

const Settings = () => {
    return(
        <div className="fullSettingsDiv">
            <div className="listed-options-display">
                <ul className="list-style-display">
                    <li class="setting-icon disabled"><a href="/settings/edit-profile" className="editing-style">Edit Profile</a></li>
                    <li class="account-icon disabled"><a href="/settings/account-settings" className="account-set-style">Account Settings</a></li>
                    <li class="claim-icon disabled"><a href="/settings/claim" className="claim-style">Claim</a></li>
                    <li class="notif-icon disabled"><a href="/settings/notifications" className="notif-style">Notifications</a></li>
                    <li class="priv-icon disabled"><a href="/settings/privacy-and-data" className="priv-style">Privacy and Data</a></li>
                    <li class="security-icon disabled"><a href="/settings/security" className="security-style">Security</a></li>
                    <li class="app-icon disabled"><a href="/settings/apps" className="set-app-style">Apps</a></li>
                </ul>
            </div> 
            

             <div className="editProfileDiv"> 
                <EditProfile/>
             </div>   



        </div>
    )
}

export default Settings;