import React from 'react'
import {useEffect, useState} from "react";
import {useLocalStorage} from 'usehooks-ts'
import {useConnectionService} from "../../services/ConnectionService";
import Select from 'react-select';

const FormCreateConnectionRequest = ({onAdd, users}) => {

    const [connectionText, setConnectionText] = useState("");
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const [userReceive, setUserReceive] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(false);
    const [isOkay, setOkay] = useState(false)
    const [usersOptions, setUsersOptions] = useState([]);
    const [isSelectedTarget, setSelectedTarget] = useState(false);
    const connectionService = useConnectionService();
    // const [usersList2, setUsersList2] = useState([]);

    useEffect(() => {

        const getUsers = async () => {
            const UsersFromServer = await connectionService.fetchFriendsToBe(currentUser).catch((err) => {
                setError(err.message);
                setPending(true);
            });

            setUsersList(UsersFromServer);
            // console.log(UsersFromServer)
        };
        getUsers();


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


    const updateTarget = (targetUser) => {

        if (targetUser === null) {
            setUserReceive('');
            setSelectedTarget(false)
        } else {
            setUserReceive(targetUser.value);
            // console.log(targetUser.value)
            setSelectedTarget(true)
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!connectionText) {
            alert("Please insert a connection request text");
            return;
        }

        const userSent = currentUser.id;
        const connectionRequest = {userSent, userReceive, connectionText} // check this
        onAdd(connectionRequest)
        setConnectionText("");
    }

    return (

        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="usersReceive">Choose a target user:</label>
                {isOkay ? (< Select
                    isSearchable={true}
                    isClearable={true}
                    options={usersOptions}
                    value={usersOptions.filter(function (option) {
                        return option.value === userReceive;
                    })} onChange={(e) => updateTarget(e)}/>) : ('loading')}
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

            <input type="submit" value="Create Connection Request" className="btn btn-block"/>
        </form>
    )
}

export default FormCreateConnectionRequest