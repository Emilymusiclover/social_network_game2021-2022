import React, {useEffect} from 'react';
import {PointerLockControls} from '@react-three/drei'

import {useThree, extend} from '@react-three/fiber';
import {useRef} from 'react';


export const FirstPersonViewControls = (props) => {
    const {camera, gl} = useThree();
    const controls = useRef();

    useEffect(() => {
        document.addEventListener('click', () => {
            controls.current.lock();
        });
    }, []);

    return (
        <PointerLockControls ref={controls}
                             args={[camera, gl.domElement]}
                             {...props}
        />

    );
};