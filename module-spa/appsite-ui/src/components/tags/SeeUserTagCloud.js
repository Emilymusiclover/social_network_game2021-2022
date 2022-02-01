import React from 'react'
import Header from '../general/Header'
import {useEffect, useState, useContext} from "react";
import {useTagService} from "../../services/TagService";
import TagClouds from "./TagClouds";
import Tags from '../users/Tags';
import UserTags from './UserTags';

const SeeUserTagCloud = () => {

    const tagService = useTagService();
    const [tags, setTags] = useState([]);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserTagCloud = async () => {
            var listTags = await tagService.fetchTagCloud().catch((err) => {
                setError(err.message);
                setPending(true);
            });
            var list = listTags.map((id, index) => {
                console.log(listTags[index].tags);
            })
            setTags(listTags);
            setPending(false);
            console.log(listTags);

        }
        getUserTagCloud();
        console.log(tags);

    }, []);

    return (
        <div className="container">
            <Header title={'See All Users Tag Cloud'}></Header>
            {!isPending ? tags.map((id, index) => {
                return (<UserTags key={index} tags={tags[index].tags}/>);
            }) : "No Pendent Introduction Requests To Show"}
            {/* !isPending ?  <TagClouds tagClouds={tags} /> : "No Pendent Introduction Requests To Show" */}
        </div>
    );
}

export default SeeUserTagCloud