import React, {useEffect, useState, useMemo} from "react";
import {useLocalStorage} from "usehooks-ts";
import {Suspense, Canvas} from "@react-three/fiber";
import {OrbitControls} from '@react-three/drei';
import * as THREE from "three";
// local
import MiniMap from "./Minimap";
import NetworkService from "../../services/NetworkService";
import Utils from "../../services/Utils";

const BasicNetworkOverview = () => {
    let dUser = {
        id: "9ac9754a-7467-43f9-a9cb-3eabb67c65fd",
        userEmail: "admin@email.com",
        // email : admin@email.com
        // password : Admin!54321
    };
    const [user, setUser] = useState(dUser);
    // const [users, setUsers] = useState([]);
    const [network, setNetwork] = useState({});

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
    }, []);

    // get user friends
    // useEffect(() => {
    //     // console.log(Utils.debugFormat('getting user friends...', 'BasicNetworkOverview'))
    //     if (user) {
    //         NetworkService.getUserFriends(user.id)
    //             .then(uFriends => {
    //                 console.log(Utils.debugFormat(`uFriends : ${uFriends}`, 'BasicNetworkOverview'))
    //                 setUsers(uFriends)
    //             })
    //             .catch(ex => console.log(Utils.debugFormat(`could not retrieve user friends : ${ex}`, 'BasicNetworkOverview')))
    //     }
    // }, [user])

    useEffect(() => {
        // console.log(Utils.debugFormat('getting network...', 'BasicNetworkOverview'))
        if (user.id != "9ac9754a-7467-43f9-a9cb-3eabb67c65fd") {
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

    return (
        <>
            <h1>Basic Network Overview 2D</h1>
            <Canvas orthographic camera={{zoom: 100, position: [0, 0, 100]}}>

                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>


                {render(user, network)}
                <OrbitControls enableRotate={false}/>
                <MiniMap/>

            </Canvas>
        </>
    );
};

const render = (user, network) => {
    // console.log(Utils.debugFormat(`user : ${user}`, 'BasicNetworkOverview.render'))
    // console.log(Utils.debugFormat(`network : ${JSON.stringify(network)}`, 'BasicNetworkOverview.render'))

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

    function createCircle(key, id, color, position) {
        return <UserCircle key={key} id={id} color={color} position={position}/>;
    }

    function createConnection(key, origin, destination) {
        return (
            <ConnectionLine key={key} origin={origin} destination={destination}/>
        );
    }

    /*
     *    graph structure
     *
     *    center = 1
     *
     *    ids     -   strengths
     *    1,2         10,20
     *    1,3         10,30
     *    1,4         20,50
     *
     *    2,3         25,25
     *    2,5         40,30
     *
     *    3,4         80,85
     *
     *    5,6         40,30
     *    5,7         40,30
     */

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
                    // add node jsx
                    jsx.push(createCircle(iteration, id, "orange", destination));
                    jsx.push(createConnection(iteration, origin, destination));

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

    return (
        <group>
            <UserCircle user={user} color="blue" position={[0, 0, 0]}/>

            <Network/>
            <TextLabelSprite position={[0, 1, 0]}>{user.id}</TextLabelSprite>
        </group>
    );
};

const UserCircle = ({user, color, position}) => {
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
            <circleBufferGeometry attach="geometry" args={[1, 64]}/>
            <meshLambertMaterial
                attach="material"
                color={changeColor ? "grey" : color}
            />
        </mesh>
    );
};

const ConnectionLine = ({origin, destination}) => {
    const points = [];
    points.push(new THREE.Vector3(origin[0], origin[1], -1));
    points.push(new THREE.Vector3(destination[0], destination[1], -1));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <mesh>
            <line geometry={lineGeometry}>
                <lineBasicMaterial
                    attach="material"
                    color={"black"}
                    linewidth={100}
                    linecap={"round"}
                    linejoin={"round"}
                />
            </line>
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

export default BasicNetworkOverview;
