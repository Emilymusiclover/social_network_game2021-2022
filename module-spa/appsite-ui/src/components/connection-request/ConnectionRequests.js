import ConnectionRequest from "./ConnectionRequest";

const ConnectionRequests = ({connectionRequests, onClickAccept, onClickReject}) => {
    return (
        <>
            {connectionRequests.map((connectionRequest, index) => (
                <ConnectionRequest key={index} connectionRequest={connectionRequest} onClickAccept={onClickAccept}
                                   onClickReject={onClickReject}/>
            ))}
        </>
    );
};

export default ConnectionRequests;