import React from "react";

const TagCloud = ({id}) => {
    return (
        <div>
            <h3>{id.tags.tag}</h3>
        </div>
    );
};

export default TagCloud;