import React from "react";
import {useState, useEffect} from "react";
import UserProfile from "./UserProfile";
import Header from "../general/Header";
import {useLocalStorage} from "usehooks-ts";
import {useUserService} from "../../services/UserService";

const EditProfile = () => {
    const userService = useUserService();
    const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
    const [updatedUser, setUpdateUser] = useState(null);
    const [isPending, setPending] = useState(false);

    // fetch User By Id
    useEffect(() => {
        const getUser = async (id) => {
            const user = await userService.getUserById(id).catch((err) => {
                console.log(err);
                setPending(true);
            });

            setCurrentUser(user);
            setPending(false);
        };
        if (currentUser !== null || typeof currentUser !== "undefined") {
            getUser(currentUser.id);
        } else {
            window.location.href = "/";
            setPending(true);
        }
    }, [setUpdateUser]);

    const updateUser = async (updatedUser) => {
        const data = await userService.updateUser(updatedUser).catch((err) => {
            console.log(err)
        });
        setUpdateUser(data);
    };

    return (
        <>
            <div className="main-profile">
                <div className="section">
                    <div className="profile-container">
                        <Header title={"Edit Profile"}> </Header>
                        <div className="column">
                            <UserProfile user={currentUser} isEditable={false}/>
                        </div>
                        <UserProfile
                            user={currentUser}
                            isEditable={true}
                            onEdit={updateUser}
                        >
                            {" "}
                        </UserProfile>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
