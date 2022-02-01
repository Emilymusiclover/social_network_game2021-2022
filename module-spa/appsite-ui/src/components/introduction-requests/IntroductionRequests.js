import IntroductionRequest from "./IntroductionRequest";

const IntroductionRequests = ({introductionRequests, onClickAccept, onClickReject}) => {
    return (
        <>
            {introductionRequests.map((introductionRequest, index) => (
                <IntroductionRequest key={index} introductionRequest={introductionRequest} onClickAccept={onClickAccept}
                                     onClickReject={onClickReject}/>
            ))}
        </>
    );
};

export default IntroductionRequests;