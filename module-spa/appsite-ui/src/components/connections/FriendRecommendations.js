import React, {useEffect, useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import {IoIosAdd} from "react-icons/io";
// local
import NetworkService from "../../services/NetworkService";

import Header from "../general/Header";
import Utils from "../../services/Utils";

const FriendRecommendations = () => {

    let dUser = {
        id: '9ac9754a-7467-43f9-a9cb-3eabb67c65fd',
        userEmail: "admin@email.com"
        // email : admin@email.com
        // password : Admin!54321
    }
    const [user, setUser] = useState(dUser);
    const [recommendedUsers, setRecommendedUsers] = useState([]);
    const [run, setRun] = useState(true)

    useEffect(() => {
        Utils.getUserDataStorage()
            .then(sUser => {
                // console.log(Utils.debugFormat(`sUser : ${sUser}`, 'BasicNetworkOverview'))
                setUser(sUser)
            })
            .catch(ex => console.log(Utils.debugFormat(`could not retrieve user : ${ex}`, 'FriendRecommendations')))
    }, []);

    useEffect(() => {
        if (user && run) {
            NetworkService.getFriendRecommendations(user.id)
                .then(obj => {
                    console.log(Utils.debugFormat(`JSON stringify obj : ${JSON.stringify(obj)}`, 'FriendRecommendations'))
                    setRecommendedUsers(obj)
                })
                .catch(ex => console.log(Utils.debugFormat(`could not friend recommendations : ${ex}`, 'FriendRecommendations')))
        }
    }, [user, run])

    const onClick = async (tUser) => {
        setRun(false)
        console.log(Utils.debugFormat(`onClick : ${tUser.id}`, 'FriendRecommendations'))
        if (tUser.id) {
            const request = {
                "UserSent": user.id,
                "UserReceive": tUser.id,
                "ConnectionText": `I've discovered you on my recommended!`
            }
            const res = await NetworkService.makeConnectionRequest(request)
            console.log(Utils.debugFormat(`res : ${JSON.stringify(res)}`, 'FriendRecommendations'))
        }
        setRun(true)
    }

    return (
        <div className="container">
            <Header title='Friend Recommendations'/>
            <RecommendedUsers
                users={recommendedUsers}
                onClick={onClick}
            />
        </div>
    );

}


const RecommendedUsers = ({users, onClick}) => {
    if (!users || users.count === 0)
        return <h6>You have no new friend recommendations</h6>

    return (
        <>
            {users.map((user, index) => (
                <User
                    key={index}
                    user={user}
                    onClick={onClick}
                />
            ))}
        </>
    );
};

const User = ({user, onClick}) => {
    return (
        <div className="connectionRequest">
            <p>{user.userEmail}</p>
            <IoIosAdd
                style={{color: "black", cursor: "pointer"}}
                onClick={() => onClick(user)}
            />
        </div>
    );
};

export default FriendRecommendations