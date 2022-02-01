import React from "react";

import {FaTimes} from "react-icons/fa";

const Tag = ({tag, onDelete, isEdit}) => {
    return (
        <div>
            <h3 className="tag">
                {tag.tag}{" "}
                {isEdit && <FaTimes
                    style={{color: "red", cursor: "pointer"}}
                    onClick={() => onDelete(tag.id)}
                />}
            </h3>
        </div>
    );
};

export default Tag;
