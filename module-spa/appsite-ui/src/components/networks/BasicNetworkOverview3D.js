import React, {useEffect, useState, useMemo, useRef, Suspense} from "react";
import {useLocalStorage} from "usehooks-ts";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from '@react-three/drei';
import * as THREE from "three";
// local
// local
import MiniMap from "./Minimap";
import NetworkService from "../../services/NetworkService";
import Utils from "../../services/Utils";
import {useUserService} from "../../services/UserService";
import {FirstPersonNavigation} from "./FirstPersonNavigation";
import {Physics} from '@react-three/cannon';
import Home from "../main/Home"
import {Camera} from "three";

const BasicNetworkOverview3D = () => {
    let dUser = {
        id: "9ac9754a-7467-43f9-a9cb-3eabb67c65fd",
        userEmail: "admin@email.com",
        // email : admin@email.com
        // password : Admin!54321
    };
    const [user, setUser] = useState(dUser);
    const [usersInfo, setUsersInfo] = useState([]);
    const [network, setNetwork] = useState({});
    const userService = useUserService();


    useEffect(() => {
        // console.log(Utils.debugFormat('getting user from local storage...', 'BasicNetworkOverview'))
        Utils.getUserDataStorage()
            .then((sUser) => {
                console.log(
                    Utils.debugFormat(`sUser : ${sUser}`, "BasicNetworkOverview")
                );
                setUser(sUser);
            })
            .catch((ex) =>
                console.log(
                    Utils.debugFormat(
                        `could not retrieve user : ${ex}`,
                        "BasicNetworkOverview"
                    )
                )
            );
    }, [setUser]);


    useEffect(() => {
        // console.log(Utils.debugFormat('getting network...', 'BasicNetworkOverview'))
        if (user !== undefined || user.id !== "9ac9754a-7467-43f9-a9cb-3eabb67c65fd") {
            NetworkService.getNetworkByUserId(user.id)
                .then((obj) => {
                    console.log(
                        Utils.debugFormat(
                            `JSON stringify obj : ${JSON.stringify(obj)}`,
                            "BasicNetworkOverview"
                        )
                    );
                    // console.log(Utils.debugFormat(`obj keys : ${Object.keys(obj)}`, 'BasicNetworkOverview'))
                    setNetwork(obj);
                })
                .catch((ex) =>
                    console.log(
                        Utils.debugFormat(
                            `could not retrieve network : ${ex}`,
                            "BasicNetworkOverview"
                        )
                    )
                );
        }
    }, [user, setUser]);

    useEffect(() => {
        // console.log(Utils.debugFormat('getting network...', 'BasicNetworkOverview'))

        const getUsers = async (ids) => {
            const users = await userService
                .fetchUsersByIds(ids)
                .catch((ex) =>
                    console.log(
                        Utils.debugFormat(
                            `could not retrieve network user info : ${ex}`,
                            "BasicNetworkOverview"
                        )
                    )
                );
            console.log(
                Utils.debugFormat(
                    `JSON stringify obj : ${JSON.stringify(users)}`,
                    "BasicNetworkOverview"
                )
            );

            console.log(users)
            setUsersInfo(users);
        };

        console.log(network);
        if (network !== undefined) {

            let keys = Object.keys(network);
            console.log(keys)
            getUsers(keys)
        }


    }, [network, setNetwork, setUser]);


    return (
        <>
            <h1>Basic Network Overview 3D</h1>
            <Canvas>
                <pointLight position={[20, 5, 25]} intensity={0.5}/>
                <pointLight position={[10, 20, 10]} intensity={1}/>

                <Physics gravity={[0, -30, 0]}>
                    <FirstPersonNavigation position={[10, 3, 10]}/>

                    {render(user, network, usersInfo)}
                    <MiniMap/>
                </Physics>

                <OrbitControls enableRotate={true} enablePan={true}/>


            </Canvas>

        </>
    );
};

const render = (user, network, usersInfo) => {


    const usersPositions = [];

    if (!user) return <></>;

    // console.log(Utils.debugFormat(`network keys : ${Object.keys(network)}`, 'BasicNetworkOverview.render'))
    // console.log(Utils.debugFormat(`users : ${users}`, 'BasicNetworkOverview.render'))

    // circle calculations (index, total, level)
    function calculatePosition(index, radius, sections) {
        let angleIncrement = (2 * Math.PI) / sections;
        let x = radius * Math.cos(index * angleIncrement);
        let y = radius * Math.sin(index * angleIncrement);
        let z = 0;
        return [x, y, z];
    }

    function createSphere(key, id, color, position) {
        return <UserSphere key={key} id={id} color={color} position={position}/>;
    }

    function createConnectionLine(key, origin, destination) {
        return (
            <ConnectionLine3D key={key} origin={origin} destination={destination}/>
        );
    }

    function createUserLabels(key, children, position) {
        return (
            <TextLabelSprite
                key={key}
                position={[position[0], position[1] + 1, position[2]]}
            >
                {children.userEmail}
            </TextLabelSprite>
        );
    }

    const Network = () => {
        // jsx
        const jsx = [];

        // network
        if (!network) return <></>;

        // keys
        const keys = Object.keys(network);
        if (!keys) return <></>;
        // console.log(Utils.debugFormat(`network keys : ${keys}`, 'BasicNetworkOverview.render'))

        // bfs
        // constants
        const modifier = 10;
        const sections = 8;
        // variables
        let iteration = 0;
        let level = 1;
        // visited
        const visited = {};
        for (const key of keys) visited[key] = false;
        visited[user.id] = true;
        // drawn
        const drawn = {};
        for (const key of keys) drawn[key] = false;
        drawn[user.id] = true;
        // queue
        const queue = [];
        queue.push(user.id);
        // positions
        const positions = {};
        positions[user.id] = [0, 0, 0];

        console.log(
            Utils.debugFormat(`user.id : ${user.id}`, "BasicNetworkOverview.render")
        );

        // iterate through keys (user id)
        while (queue.length > 0) {
            // get level size
            const numNodes = queue.length;
            console.log(
                Utils.debugFormat(
                    `level : ${level} | numNodes : ${numNodes}`,
                    "BasicNetworkOverview.render"
                )
            );

            // iterate level
            for (let i = numNodes; i > 0; i--) {
                // get key
                const key = queue.shift();
                visited[key] = true;
                // get adjacent vertices
                const vertices = network[key];
                if (!vertices) continue;
                console.log(
                    Utils.debugFormat(`key : ${key}`, "BasicNetworkOverview.render")
                );

                // iterate through adjacent vertices (user id)
                for (const adj of vertices) {
                    // check if visited
                    const id = adj.value;
                    // add node to the queue
                    if (!visited[id]) queue.push(id);
                    console.log(
                        Utils.debugFormat(`id : ${id}`, "BasicNetworkOverview.render")
                    );

                    if (drawn[id]) continue;
                    // calculate positions
                    console.log(
                        Utils.debugFormat(
                            `drawing : ${iteration}`,
                            "BasicNetworkOverview.render"
                        )
                    );
                    const origin = positions[key];
                    const destination = calculatePosition(
                        iteration,
                        modifier * level,
                        sections
                    );
                    positions[id] = destination;

                    const userPosition = {id: id, position: destination};
                    usersPositions.push(userPosition);

                    // add node jsx
                    jsx.push(createSphere(iteration, id, "orange", destination));
                    jsx.push(createConnectionLine(iteration, origin, destination));

                    drawn[id] = true;
                    // increment iteration
                    iteration++;
                }
            }
            // increment level
            level++;
        }

        return jsx;
    };

    const Labels = () => {
        const jsx = [];
        // network
        if (!network) return <></>;
        if (!usersInfo) return <></>;
        // keys
        const keys = Object.keys(network);
        if (!keys) return <></>;

        let iteration = 0;
        for (const key of keys) {
            const element = el => el.id === key;
            var match = usersInfo.find(element);
            console.log(match)


            //console.log(match.length===0)
            if (match !== undefined) {

                const elem = el => el.id === key;
                var positionArray = usersPositions.find(elem);
                console.log(positionArray)
                if (positionArray !== undefined) {
                    console.log(positionArray.position)
                    jsx.push(createUserLabels(iteration, match, positionArray.position));
                }

                iteration++;
            }

        }
        return jsx;
    };

    return (
        <group>
            <UserSphere user={user} color="blue" position={[0, 0, 0]}/>
            <Network/>
            <TextLabelSprite position={[0, 1, 0]}>{user.id}</TextLabelSprite>
            <Labels/>
        </group>
    );
};

const UserSphere = ({user, color, position}) => {

    const [changeColor, setChange] = useState(false);
    return (
        <mesh

            position={position}
            onPointerOver={() => {
                setChange(true);
            }}
            onPointerOut={() => {
                setChange(false);
            }}
        >
            <sphereGeometry attach="geometry" args={[1, 32, 32]}/>
            <meshLambertMaterial
                attach="material"
                color={changeColor ? "grey" : color}
            />
        </mesh>
    );
};

const ConnectionLine3D = ({origin, destination}) => {
    const pointsO = new THREE.Vector3(origin[0], origin[1], 0);
    const pointsD = new THREE.Vector3(destination[0], destination[1], 0);

    const direction = new THREE.Vector3().subVectors(pointsD, pointsO);
    const arrow = new THREE.ArrowHelper(direction.clone().normalize(), pointsO);
    const geometry = new THREE.CylinderGeometry(0.2, 0.2, direction.length(), 32);

    return (
        <mesh
            geometry={geometry}
            rotation={arrow.rotation.clone()}
            position={new THREE.Vector3().addVectors(
                pointsO,
                direction.multiplyScalar(0.5)
            )}
        >
            {/*<cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, direction.length(), 32]}/>*/}
            <meshStandardMaterial attach="material" color="grey"/>
        </mesh>
    );
};

const TextLabelSprite = ({
                             children,
                             position,
                             scale,
                             color = "purple",
                             fontSize = 40,
                         }) => {
    const canvas = useMemo(() => {
        var fontface = "Arial";
        var fontsize = fontSize;
        var borderThickness = 2;

        var canvas = document.createElement("canvas");

        var context = canvas.getContext("2d");

        canvas.width = 500;
        var maxWidth = canvas.width;
        console.log(canvas.width);

        context.textBaseline = "middle";
        context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`;
        context.textAlign = "center";
        var metrics = context.measureText(children);
        console.log(metrics);
        var textWidth = metrics.width;
        context.globalAlpha = 0.8;

        context.lineWidth = borderThickness;

        context.fillStyle = color;

        //context.fillText( children, textWidth-(textWidth*0.9) , fontsize);
        context.fillText(children, canvas.width * 0.5, 30, maxWidth);

        return canvas;
    }, [children]);

    return (
        <sprite scale={[2, 0.7, 1]} position={position}>
            <spriteMaterial attach="material" transparent alphaTest={0.3}>
                <canvasTexture attach="map" image={canvas}/>
            </spriteMaterial>
        </sprite>
    );
};


export default BasicNetworkOverview3D;
