import React from 'react';
// import EditProfile from './EditProfile'

const Settings = () => {
    return(
        <div>

            <div>
                <ul>
                    <li><a href="/settings/edit-profile">Edit Profile</a></li>
                    <li><a href="/settings/account-settings">Account Settings</a></li>
                    <li><a href="/settings/claim">Claim</a></li>
                    <li><a href="/settings/notifications">Notifications</a></li>
                    <li><a href="/settings/privacy-and-data">Privacy and Data</a></li>
                    <li><a href="/settings/security">Security</a></li>
                    <li><a href="/settings/apps">Apps</a></li>
                </ul>

            </div> 
            

             {/* <div> 
                <EditProfile/>
             </div>    */}



        </div>
    )
}

export default Settings;