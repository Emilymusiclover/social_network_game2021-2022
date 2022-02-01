import React from "react";
import TagCloud from "./TagCloud";

const TagClouds = ({tagClouds}) => {
    return (
        <>
            {tagClouds.map((id, index) => (
                <TagCloud key={index} id={id}/>
            ))}
        </>
    );
};

export default TagClouds;