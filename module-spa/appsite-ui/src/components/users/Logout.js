import React from 'react'
import Button from '../general/Button'
import Header from '../general/Header'

const Logout = () => {


    const clickEventYes = (e) => {
        localStorage.removeItem('currentUser')

        window.location.href = '/'

    }
    const clickEventNo = (e) => {

        window.location.href = '/'

    }

    return (

        <div className="container-login container">
            <Header title={'Log out'}></Header>
            <h3>Are you sure you want to log out :( </h3>
            <Button color={"green"} text={"YES"} onClick={clickEventYes}
            ></Button>
            <Button color={"red"} text={"NO"} onClick={clickEventNo}
            ></Button>

        </div>
    )
}

export default Logout
