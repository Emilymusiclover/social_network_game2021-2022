import React from "react";
import {useState} from "react";
import {FaRegEdit, FaUser, FaTags, FaBirthdayCake, FaPhoneAlt, FaPenSquare, FaRegMap, FaUserEdit} from "react-icons/fa";
import Button from "../general/Button";
import Tags from "./Tags";
import FormTag from "./FormTag";


const UserProfile = ({user, isEditable, onEdit, onAddTags}) => {
    // fix me : if profile is null, component breaks

    const [id, setProfileId] = useState(user.userProfile.id);
    const [idTagCloud, setTagCloudId] = useState(user.userProfile.userTagCloud.id);
    const [userEmail, setEmail] = useState(user.userEmail);
    const [userPassword, setPassword] = useState(user.userPassword);
    const [profileUserName, setProfileUserName] = useState(
        user.userProfile.profileUserName
    );
    const [userBirthDate, setBirthDate] = useState(
        user.userProfile.userBirthDate
    );
    const [userCountry, setCountry] = useState(user.userProfile.userCountry);
    const [userCity, setCity] = useState(user.userProfile.userCity);
    const [userDescription, setDescription] = useState(
        user.userProfile.userDescription
    );
    const [userPhone, setPhoneNumber] = useState(user.userProfile.userPhone);
    const [userAvatar, setAvatar] = useState("");

    const [tags, setTags] = useState(user.userProfile.userTagCloud.tags);
    const [tag, setTag] = useState({
        tag: ""
    })

    const [tagsArray, setTagArray] = useState([]);

    const addTags = () => {
        setTagArray((tagsArray) => [...tagsArray, tag])
    }

    const deleteTag = (id) => {
        setTags(tags.filter(tag => tag.id !== id));
        setTagArray(tagsArray.filter(tag => tag.id !== id));
    };


    const saveChange = (e, element) => {
        console.log(element.innerText);
        switch (element.id) {
            case "profileUserName":
                setProfileUserName(element.innerText);
                break;
            case "userCountry":
                setCountry(element.innerText);
                break;
            case "userCity":
                setCity(element.innerText);
                break;
            case "userDescription":
                setDescription(element.innerText);
                break;
            case "userPhone":
                setPhoneNumber(element.innerText);
                break;
        }
    };

    const disableNewlines = (event) => {
        const keyCode = event.keyCode || event.which

        if (keyCode === 13) {
            event.returnValue = false
            if (event.preventDefault) event.preventDefault()
        }
    }

    const saveChanges = (e) => {
        e.preventDefault();

        if (!profileUserName) {
            alert("Can't have empty value");
            return;
        }

        tagsArray.forEach(tag => {

            tags.push(tag)
        });

        const userTagCloud = {id: idTagCloud, tags};

        const userProfile = {
            id,
            profileUserName,
            userBirthDate,
            userCountry,
            userCity,
            userDescription,
            userPhone,
            userAvatar,
            userTagCloud,
        };
        const user = {userEmail, userPassword, userProfile};
        console.log(user);
        onEdit(user);

        // Edit Tags request
    };

    const setEditable = (e, id) => {
        var element = document.getElementById(id);
        //element.contentEditable.onKeyPress=disableNewlines();
        //console.log(element.id)
        if (element.isContentEditable) {
            element.contentEditable = false;
            saveChange(e, element);
        } else {
            element.contentEditable = true;
        }
    };
    return (
        <div>
            {isEditable ? (
                <div className="edit-container">
                    <FaUserEdit style={{fontSize: 30}}></FaUserEdit>
                    <div className="h3-edit">
                        <FaUser className="h3-icon">
                        </FaUser>
                        <div className="h3-text-container">
                            <h3 className="h3-text" id="profileUserName" onKeyPress={disableNewlines}>
                                {""}
                                {user.userProfile.profileUserName}{""}
                            </h3>
                        </div>

                        <FaRegEdit
                            className="h3-icon-edit"
                            onClick={(e) => setEditable(e, "profileUserName")}
                        />
                    </div>
                    <div className="h3-edit">
                        <FaBirthdayCake className="h3-icon"></FaBirthdayCake>
                        <div className="h3-text-container">
                            <h3 className="h3-text"> {user.userProfile.userBirthDate}</h3>
                        </div>
                    </div>
                    <div className="h3-edit">
                        <FaRegMap className="h3-icon"></FaRegMap>
                        <div className="h3-text-container">
                            <h3 className="h3-text" id="userCountry"> {user.userProfile.userCountry}</h3>
                        </div>

                        <FaRegEdit className="h3-icon-edit" onClick={(e) => setEditable(e, "userCountry")}/>
                    </div>
                    <div className="h3-edit">
                        <FaRegMap className="h3-icon"></FaRegMap>
                        <div className="h3-text-container">
                            <h3 className="h3-text" id="userCity"> {user.userProfile.userCity}</h3>
                        </div>
                        <FaRegEdit className="h3-icon-edit" onClick={(e) => setEditable(e, "userCity")}/>
                    </div>
                    <div className="h3-edit">
                        <FaPenSquare className="h3-icon"></FaPenSquare>
                        <div className="h3-text-container">
                            <h3 className="h3-text" id="userDescription"> {user.userProfile.userDescription}</h3>
                        </div>
                        <FaRegEdit className="h3-icon-edit" onClick={(e) => setEditable(e, "userDescription")}/>
                    </div>
                    <div className="h3-edit">
                        <FaPhoneAlt className="h3-icon"></FaPhoneAlt>
                        <div className="h3-text-container">
                            <h3 className="h3-text" id="userPhone"> {user.userProfile.userPhone}</h3>
                        </div>
                        <FaRegEdit className="h3-icon-edit" onClick={(e) => setEditable(e, "userPhone")}/>
                    </div>
                    <div className="h3-edit">
                        <div className="form-control">
                            <label>Tag <FaTags></FaTags></label>
                            <input
                                type="text"
                                placeholder="insert tag"
                                value={tag.tag}
                                onChange={(e) => setTag({...tag, tag: e.target.value})}

                            />
                            <FormTag
                                onShow={addTags}
                            ></FormTag>
                            <div className='tag-container'>
                                <Tags tags={tags} onDelete={deleteTag}/>
                                <Tags tags={tagsArray} onDelete={deleteTag}/>
                            </div>
                        </div>
                    </div>
                    <Button
                        color={"red"}
                        text={"Save Changes"}
                        onClick={saveChanges}
                    ></Button>
                </div>
            ) : (
                <div>
                    <h3> {user.userProfile.profileUserName}</h3>
                    <h3> {user.userProfile.userBirthDate}</h3>
                    <h3> {user.userProfile.userCountry}</h3>
                    <h3> {user.userProfile.userCity}</h3>
                    <h3> {user.userProfile.userDescription}</h3>
                    <h3> {user.userProfile.userPhone}</h3>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
