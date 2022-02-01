import React from 'react'
import {useEffect, useState} from "react";
import {useLocalStorage} from 'usehooks-ts'
import {useUserService} from "../../services/UserService";
import {useConnectionService} from "../../services/ConnectionService";
import Select from 'react-select';
import PopUp from '../general/PopUp';
import 'reactjs-popup/dist/index.css';

const FormCreateIntroductionRequest = ({onAdd}) => {

    const [introductionText, setIntroductionText] = useState("");
    const [connectionText, setConnectionText] = useState("");
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const [targetUser, setTargetUser] = useState("");
    const [intermediateUser, setIntermediateUser] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [usersList2, setUsersList2] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(false);
    const [isOkay, setOkay] = useState(false)
    const [usersOptions, setUsersOptions] = useState([]);
    const [usersOptions2, setUsersOptions2] = useState([]);
    const [isSelectedTarget, setSelectedTarget] = useState(false)
    const userService = useUserService();
    const connectionService = useConnectionService();

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {

        const getUsers = async () => {
            const UsersFromServer = await connectionService.fetchFriendsToBe(currentUser).catch((err) => {
                setError(err.message)
                setPending(true)
            })
            setUsersList(UsersFromServer)
            // console.log(UsersFromServer)
        }
        getUsers()

    }, []);

    useEffect(() => {

        if (usersList.length > 0) {
            // console.log(currentUser.id)
            const optionsFilter = usersList.filter((o) => o.id !== currentUser.id);
            const options = optionsFilter.map(data => ({label: data.userEmail, value: data.id}));
            setUsersOptions(options);
            setOkay(true);
        }

    }, [usersList.length]);


    useEffect(() => {

        const getUsersFriends = async () => {
            const CommonUsersFromServer = await connectionService.fetchCommonFriends(currentUser, targetUser).catch((err) => {
                setError(err.message);
                setPending(true);
            })
            setUsersList2(CommonUsersFromServer)
        }
        if (targetUser !== "") {
            getUsersFriends();
        }

    }, [targetUser, setTargetUser])


    useEffect(() => {

        try {
            if (usersList2.length > 0) {
                const options = usersList2.map(data => ({label: data.userEmail, value: data.id}));
                setUsersOptions2(options);
                setSelectedTarget(true);
            } else if (usersList2.length === 0) {
                setSelectedTarget(false)
                throw Error('You don´t have a common friend')
            }
        } catch (err) {
            setError(err.message);
            // console.log(err.message)
        }

    }, [usersList2.length]);

    const updateTarget = (targetUser) => {

        if (targetUser === null) {
            setTargetUser('')
            setSelectedTarget(false)
        } else {
            setTargetUser(targetUser.value)
            // console.log(targetUser.value)
            setSelectedTarget(true)
            if (targetUser !== "" || targetUser === null) {
                alert("you don't have friends in common with the selected target user")
            }
        }

    }

    const updateIntermediate = (intermediateUser) => {
        if (intermediateUser === null) {
            setIntermediateUser('')
        } else {
            setIntermediateUser(intermediateUser.value)
            // console.log(intermediateUser.value)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (targetUser == null || !targetUser) {
            alert("You have to select a target user. \n If there are no options that means there are no users available to be your friend.")
            return
        }

        if (!connectionText) {
            alert("Please insert a connection request text")
            return
        }

        if (intermediateUser == null || !intermediateUser) {
            alert("You have to select an intermediate user.")
            return
        }

        if (!introductionText) {
            alert("Please insert an introduction request text")
            return
        }

        const introductionUser = currentUser.id;

        const introductionRequest = {targetUser, intermediateUser, introductionUser, introductionText, connectionText}
        onAdd(introductionRequest)

        setIntroductionText("");
        setConnectionText("");
        setUsersList("");
        setUsersList2("");
    }

    return (

        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="targetUsers">Choose a target user:</label>
                {isOkay ? (< Select
                    isSearchable={true}
                    isClearable={true}
                    options={usersOptions}
                    value={usersOptions.filter(function (option) {
                        return option.value === targetUser;
                    })} onChange={(e) => updateTarget(e)}/>) : (<h3>There are no available users...</h3>)}
            </div>
            <div className="form-control">
                <label>Connection Text</label>
                <input
                    type="text"
                    placeholder="insert a connection request text"
                    value={connectionText}
                    onChange={(e) => setConnectionText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label htmlFor="intermediateUsers">Choose an intermediate user:</label>
                {isSelectedTarget ? (< Select options={usersOptions2}
                                              isSearchable={true}
                                              isClearable={true}
                                              value={usersOptions2.filter(function (option) {
                                                  return option.value === intermediateUser;
                                              })} onChange={(e) => updateIntermediate(e)}/>) : (
                    <h3>Waiting for a valid Target User</h3>)}

                <input
                    type="button"
                    value="Help"
                    onClick={togglePopup}
                />
                {isOpen && <PopUp
                    content={<>
                        <b>What is an intermediate user?</b>
                        <p>An intermediate user is a common friends between you and the target user. If you haven't
                            selected a target user yet, do so. Then, open the dropdown list to see your friends in
                            common and choose one.</p>
                    </>}
                    handleClose={togglePopup}
                />}

            </div>
            <div className="form-control">
                <label> Introduction Text</label>
                <input
                    type="text"
                    placeholder="insert an introduction request text"
                    value={introductionText}
                    onChange={e => setIntroductionText(e.target.value)}
                />
            </div>

            <input type="submit" value="Create Introduction Request" className="btn btn-block"/>
        </form>
    )
}

export default FormCreateIntroductionRequest
