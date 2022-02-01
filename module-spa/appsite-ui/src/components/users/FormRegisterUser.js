import {useState, useRef} from "react";

import Calendar from "react-calendar";

import FormTag from "./FormTag";
import Tags from "./Tags";
import ControlledPopUp from "../general/ControlledPopUp"
import "react-calendar/dist/Calendar.css";
import 'reactjs-popup/dist/index.css';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const FormRegisterUser = ({onAdd}) => {

    const passwordCurrent = useRef({});
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileUserName, setProfileUserName] = useState("");
    const [userBirthDate, setBirthDate] = useState(new Date());
    const [userCountry, setCountry] = useState("");
    const [userCity, setCity] = useState("");
    const [userDescription, setDescription] = useState("");
    const [userPhone, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [isAccepted, setAccepted] = useState(false)

    const [tag, setTag] = useState({
        tag: "",
    });

    const [tagsArray, setTags] = useState([]);

    const enabled =
        userEmail.length > 0 &&
        userPassword.length > 0 &&
        confirmPassword.length > 0 &&
        profileUserName.length > 0 &&

        isAccepted;

    const addTags = () => {
        setTags((tagsArray) => [...tagsArray, tag]);
    };

    const deleteTag = (id) => {
        setTags(tagsArray.filter((tag) => tag.id !== id));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!userEmail) {
            alert("Please insert email");
            return;
        }

        if (!userPassword) {
            alert("Please insert password");
            return;
        }

        if (!isAccepted) {
            alert("Please check Terms and Conditions")
        }

        const tags = [];


        tagsArray.forEach((tag) => {

            tags.push(tag);
        });

        const userTagCloud = {tags};
        const userProfile = {
            profileUserName,
            userBirthDate,
            userCountry,
            userCity,
            userDescription,
            userPhone,
            userTagCloud,
        };
        const user = {userEmail, userPassword, userProfile};
        onAdd(user);

        //After submit
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfileUserName("");
        setBirthDate(new Date());
        setCountry("");
        setCity("");
        setDescription("");
        setPhoneNumber("");
        setTag({});
        setTags([]);
    };

    const handleConfirmPassword = (event) => {

        if (userPassword !== event.target.value) {
            setError('Password do not match');

        } else {
            setError('')
        }
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label> Email *</label>
                <input
                    type="email"
                    placeholder="insert valid email"
                    value={userEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Password *</label>
                <input
                    type="password"
                    placeholder="insert valid password"
                    value={userPassword}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Confirm Password *</label>
                <input
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        handleConfirmPassword(e)
                    }}
                />
                {error !== '' && <h3 style={{color: "red"}}>{error}</h3>}
            </div>
            <div className="form-control">
                <label>Profile User Name *</label>
                <input
                    type="text"
                    placeholder="insert profile name"
                    value={profileUserName}
                    onChange={(e) => setProfileUserName(e.target.value)}
                />
            </div>
            <div>
                <label>Birth Date *</label>

                <Calendar onChange={setBirthDate} value={userBirthDate}/>
            </div>
            <div className="form-control">
                <label>Country</label>
                <input
                    type="text"
                    placeholder="insert country"
                    value={userCountry}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>City</label>
                <input
                    type="text"
                    placeholder="insert city"
                    value={userCity}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>User Description</label>
                <input
                    type="text"
                    placeholder="insert profile description"
                    value={userDescription}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Phone Number</label>
                <input
                    type="text"
                    placeholder="insert phone Number"
                    value={userPhone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Tag</label>
                <input
                    type="text"
                    placeholder="insert tag"
                    value={tag.tag}
                    onChange={(e) => setTag({...tag, tag: e.target.value})}
                />
                <FormTag onShow={addTags}></FormTag>
                <div className="tag-container">
                    <Tags tags={tagsArray} onDelete={deleteTag}/>
                </div>
            </div>
            <div className="checkbox">

                <input
                    type="checkbox"
                    id='Terms'
                    value={isAccepted}
                    onChange={(e) => {
                        setAccepted(!isAccepted)

                    }}
                />
                <ControlledPopUp></ControlledPopUp>
            </div>
            <h4>* Mandatory fields</h4>

            <input type="submit" value="Register" disabled={!enabled} className="btn btn-block"/>

        </form>
    );
};

export default FormRegisterUser;
