import React from "react";
import Button from "../general/Button";

const FormTag = ({onShow}) => {
    return (
        <div>
            <Button color={"green"} text={"Add Tags"} onClick={onShow}></Button>
        </div>
    );
};

export default FormTag;
