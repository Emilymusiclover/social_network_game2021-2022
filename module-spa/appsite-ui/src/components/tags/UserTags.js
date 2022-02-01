import UserTag from "./UserTag";


const UserTags = ({tags}) => {
    return (
        <>
            {tags.map((tag, index) => (
                <UserTag key={index} tag={tag}/>
            ))}
        </>
    );
};

export default UserTags;