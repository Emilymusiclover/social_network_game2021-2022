import React from 'react'
import Header from '../general/Header'
import FormLogin from './FormLogin'
import Button from '../general/Button'
import {useLocalStorage} from 'usehooks-ts'
import {useUserService} from "../../services/UserService";

const Login = () => {
    const userService = useUserService();
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);


    const clickEvent = (e) => {
        window.location.href = '/'
    }


    const loginUser = async (userEmail, password) => {

        try {
            const userLog = await userService.authenticateUser(userEmail, password)

            console.log(userLog)

            setCurrentUser(JSON.parse(JSON.stringify(userLog)))
            if (userLog !== null) {
                //setSuccessful(true)
                window.location.href = '/'
                //alert('You are logged in')
            }
        } catch (error) {
            alert(error.message)
        }


    }


    return (
        <div className="container-login container">
            <Header title={'Login'}></Header>
            <FormLogin onLogin={loginUser}/>
            <Button color={"red"} text={"Cancel"} onClick={clickEvent}></Button>
        </div>
    )
}

export default Login
