import React from 'react'
import Header from '../general/Header'
import {useEffect, useState, useContext} from "react";
import {useUserService} from "../../services/UserService";
import TagClouds from "./TagClouds";
import Tags from '../users/Tags';
import UserTags from '../users/Tags';
import Utils from "../../services/Utils";

const SeeMyUserTagCloud = () => {

    const userService = useUserService();
    const [tags, setTags] = useState([]);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getUserCloud = async () => {
            const user = await Utils.getUserDataStorage();
            const id = user.id;
            var listTags = await userService.fetchUserTagCloud(id).catch((err) => {
                setError(err.message);
                setPending(true);
            });
            setTags(listTags.tags);
            setPending(false);
            console.log(listTags);

        }
        getUserCloud();
        console.log(tags);

    }, []);

    return (
        <div className="container">
            <Header title={'See My Users Tag Cloud'}></Header>
            {!isPending ? (<UserTags tags={tags} isEdit={false}/>) : "No Pendent Introduction Requests To Show"}
            {/* !isPending ?  <TagClouds tagClouds={tags} /> : "No Pendent Introduction Requests To Show" */}
        </div>
    );
}

export default SeeMyUserTagCloud