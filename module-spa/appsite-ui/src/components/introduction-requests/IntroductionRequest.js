import React from "react";
import {FaTimes, FaCheck} from "react-icons/fa";

const IntroductionRequest = ({introductionRequest, onClickAccept, onClickReject}) => {
    return (
        <div className="introductionRequest">
            <p>
                <h5>This user is sending you an introduction request: </h5>
                {introductionRequest.introductionUserDto.userEmail}
                <h5>Introduction Request Text: </h5>
                {introductionRequest.introductionRequestText}
                <h5>The introduction request is for this target user: </h5>
                {introductionRequest.targetUserDto.userEmail}
                <h5>Connection Request Text: </h5>
                {introductionRequest.connectionRequestText}
                <h5>Introduction Request State: </h5>
                {introductionRequest.introductionRequestState}

            </p>
            {" "}

            <FaTimes
                style={{color: "red", cursor: "pointer"}}
                onClick={() => onClickReject(introductionRequest.id)}
            />
            <FaCheck
                style={{color: "green", cursor: "pointer"}}
                onClick={() => onClickAccept(introductionRequest.id)}
            />
        </div>
    );
};

export default IntroductionRequest;