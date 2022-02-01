import React from "react";

const User = ({user}) => {
    return (
        <div className="user">
            <h3>{user.userEmail}</h3>
            {user.userProfile.profileUserName}
        </div>
    );
};

export default User;