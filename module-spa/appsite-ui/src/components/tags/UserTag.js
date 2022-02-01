import React from "react";

const UserTag = ({tag}) => {
    return (
        <div className="tag">
            <h3>{tag.tag}</h3>
        </div>
    );
};

export default UserTag;