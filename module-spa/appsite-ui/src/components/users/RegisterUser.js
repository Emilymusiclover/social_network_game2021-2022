import React from "react";
import Header from "../general/Header";
import FormRegisterUser from "./FormRegisterUser";
import {useUserService} from "../../services/UserService";


const RegisterUser = () => {
    const userService = useUserService();


    const addUser = async (user) => {
        userService.createUser(user);
    }


    return (
        <div className="container">
            <Header/>
            <FormRegisterUser onAdd={addUser}/>

        </div>
    );
};

RegisterUser.propTypes = {};


export default RegisterUser;
