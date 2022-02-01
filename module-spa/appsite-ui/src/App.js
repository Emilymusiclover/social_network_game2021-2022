// react imports
import {useState, useEffect, useMemo} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useLocalStorage} from 'usehooks-ts'
// components
import MainNav from "./components/main/MainNav";
import SecondaryNav from "./components/main/SecondaryNav";
import Home from "./components/main/Home";
import MainUser from "./components/users/MainUser";
import PostMain from "./components/posts/PostMain";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";
import ConnectionsMain from "./components/connections/ConnectionsMain";
import IntroductionRequestMain from "./components/introduction-requests/IntroductionRequestMain";
import NetworksMain from "./components/networks/NetworksMain";
import TagsMain from "./components/tags/TagsMain";
import About from "./components/main/About";
import Utils from "./services/Utils";

function App() {

    // state context
    // option = {text, path, component}
    const [options, setOptions] = useState([])
    // user login context
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null)
    const providerValue = useMemo(() => ({currentUser, setCurrentUser}), [currentUser, setCurrentUser])
    const [isValid, setValid] = useLocalStorage('isValid', false)

    useEffect(() => {
        // get api state
        Utils.getApiState().then(res => {
            // Utils.debugFormat('processing res', 'App')
            if (res.ok) {
                setValid(true)
                Utils.debugFormat('valid api state', 'App')
                // res.json().then(json => console.log(Utils.debugFormat(`json : ${json}`, 'App')))
                //     .catch(ex => Utils.debugFormat(`json : ${ex}`, 'App'))
            }
        }).catch(ex => {
            console.log(Utils.debugFormat(`invalid api state : ${ex}`, 'App'))
            setValid(false)
            localStorage.removeItem('currentUser')
        })
    }, []);

    useEffect(() => {
        // verify user existence
        if (isValid) {
            Utils.getUserDataStorage().then(sUser => {
                if (!sUser) localStorage.removeItem('currentUser')
                else console.log(Utils.debugFormat(`sUser : ${sUser.userEmail}`, 'App'))
                // console.log(Utils.debugFormat('use effect completed!', 'App'))
            })
        }
    }, [isValid]);

    // return main container
    return (
        <Router className='container'>
            <MainNav/>
            <SecondaryNav options={options}/>
            <>
                <Routes>
                    <Route path="/" element={<Home setOptions={setOptions}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/user" element={<MainUser setOptions={setOptions}/>}/>
                    <Route path="/feed" element={<PostMain setOptions={setOptions}/>}/>
                    <Route path="/connections" element={<ConnectionsMain setOptions={setOptions}/>}/>
                    <Route path="/introduction" element={<IntroductionRequestMain setOptions={setOptions}/>}/>
                    <Route path="/tags" element={<TagsMain setOptions={setOptions}/>}/>
                    <Route path="/network" element={<NetworksMain setOptions={setOptions}/>}/>
                    <Route path="/about" element={<About setOptions={setOptions}/>}/>
                </Routes>
            </>
        </Router>
    );
}

export default App;
