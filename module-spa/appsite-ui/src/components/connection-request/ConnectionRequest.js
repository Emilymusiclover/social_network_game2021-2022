import React from "react";
import {FaTimes, FaCheck} from "react-icons/fa";

const ConnectionRequest = ({introductionRequest, connectionRequest, onClickAccept, onClickReject}) => {
    return (
        <div className="connectionRequest">
            <p>
                <h5>This user is sending you a connection request: </h5>
                {connectionRequest.userSentDto.userEmail}
                <h5>Connection Request Text: </h5>
                {connectionRequest.connectionRequestText}
            </p>
            {" "}

            <FaTimes
                style={{color: "red", cursor: "pointer"}}
                onClick={() => onClickReject(connectionRequest.id)}
            />
            <FaCheck
                style={{color: "green", cursor: "pointer"}}
                onClick={() => onClickAccept(connectionRequest.id)}
            />
        </div>
    );
};

export default ConnectionRequest;