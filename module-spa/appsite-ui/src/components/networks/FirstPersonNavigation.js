import React, {useEffect, useRef} from 'react';
import {useSphere} from '@react-three/cannon';
import {useThree, useFrame} from '@react-three/fiber';
import {Vector3} from 'three';
import {KeyboardControls} from './KeyboardControls';
import {FirstPersonViewControls} from './FirstPersonViewControls';
import {PointerLockControls} from '@react-three/drei';
import Network from './BasicNetworkOverview3D';
import BasicNetworkOverview3D from './BasicNetworkOverview3D';
import * as THREE from "three";

const SPEED = 6;

export const FirstPersonNavigation = (props) => {
    const {camera} = useThree();
    const {
        Forward,
        Backward,
        Left,
        Right,
        Up,
        Down,
    } = KeyboardControls();

    console.log('forward', Forward);
    console.log('left', Left);
    console.log('right', Right);
    console.log('backward', Backward);


    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        ...props,

    }));

    const velocity = useRef([0, 0, 0]);


    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useFrame(() => {
        camera.position.copy(ref.current.position);
        const direction = new Vector3();

        const frontVector = new Vector3(
            0,
            0,
            (Backward ? 1 : 0) - (Forward ? 1 : 0),
        );
        const sideVector = new Vector3(
            (Left ? 1 : 0) - (Right ? 1 : 0),
            0,
            0,
        );
        const yaxisVector = new Vector3(
            0,
            (Up ? 1 : 0) - (Down ? 1 : 0),
            0,
        );

        direction
            .subVectors(frontVector, yaxisVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, direction.y, direction.z);

        //  const newPosition = new Vector3(
        //     direction.x,
        //    direction.y,
        //     direction.z
        //   );

        //var array2 = Network;

        //var raycast = new THREE.Raycaster();
        //raycast.set(camera.position, direction.normalize());
        //  var intersection = raycast.IntersectObjects(BasicNetworkOverview3D, true);


        //if(intersection.length<=0){
        ref.current.getWorldPosition(ref.current.position)
        // }
    });
    return (
        <>

            <FirstPersonViewControls/>
            <mesh ref={ref}/>
        </>
    );
};
