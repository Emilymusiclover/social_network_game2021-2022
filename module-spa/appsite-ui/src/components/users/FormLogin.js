import React from 'react'
import {useState} from "react";

const FormLogin = ({onLogin}) => {
    const [userEmail, setEmailLogin] = useState("");
    const [password, setPasswordLogin] = useState("");


    const onSubmit = (e) => {
        e.preventDefault();
        if (!userEmail) {
            alert("Please insert email");
            return;
        }

        if (!password) {
            alert("Please insert password");
            return;
        }
        onLogin(userEmail, password)
        setEmailLogin("");
        setPasswordLogin("");


    }
    return (

        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label> Email</label>
                <input
                    type="email"
                    placeholder="insert valid email"
                    value={userEmail}
                    onChange={(e) => setEmailLogin(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="insert valid password"
                    value={password}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                />
            </div>

            <input type="submit" value="Login" className="btn btn-block"/>

        </form>

    );
};

export default FormLogin
