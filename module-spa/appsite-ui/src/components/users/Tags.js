import Tag from "./Tag";

const Tags = ({tags, onDelete, isEdit}) => {
    return (
        <>
            {tags.map((tag, index) => (
                <Tag key={index} onDelete={onDelete} tag={tag} isEdit={isEdit}/>
            ))}
        </>
    );
};

export default Tags;
