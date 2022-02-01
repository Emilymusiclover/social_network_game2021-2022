import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {OrthographicCamera} from '@react-three/drei';

const MiniMap = (props) => {
    // This reference will give us direct access to the mesh
    const miniMapCameraRef = useRef();

    const frustumSize = 550;
    const aspect = window.innerWidth / window.innerHeight;

    const miniMapLocationLeftPixels =
        window.innerWidth - 8 - window.innerWidth * 0.15;
    const miniMapLocationBottomPixels = 8;

    useFrame(({gl, scene, camera}) => {

        //Render mini map viewport color
        gl.setScissorTest(true);
        gl.setScissor(miniMapLocationLeftPixels,
            miniMapLocationBottomPixels,
            window.innerWidth * 0.2,
            window.innerHeight * 0.2);
        gl.setClearColor(0xffffff, 0.5);
        gl.clearColor();

        // gl.autoClear = true;
        gl.setViewport(0, 0, window.innerWidth, window.innerHeight);
        gl.setScissor(0, 0, window.innerWidth, window.innerHeight);
        gl.setScissorTest(true);
        gl.render(scene, camera);
        gl.autoClear = false;
        gl.clearDepth();


        // render minicamera
        gl.setViewport(
            miniMapLocationLeftPixels,
            miniMapLocationBottomPixels,
            window.innerWidth * 0.2,
            window.innerHeight * 0.2
        );
        gl.setScissor(
            miniMapLocationLeftPixels,
            miniMapLocationBottomPixels,
            window.innerWidth * 0.2,
            window.innerHeight * 0.2
        );
        gl.setScissorTest(true);
        miniMapCameraRef.current.position.x = camera.position.x;
        miniMapCameraRef.current.position.y = camera.position.y;
        gl.render(scene, miniMapCameraRef.current);


    }, 1);


    return (
        <>

            <OrthographicCamera
                ref={miniMapCameraRef}
                makeDefault={false}
                position={[0, 0, 100]}
                left={(frustumSize * aspect) / -2}
                right={(frustumSize * aspect) / 2}
                bottom={frustumSize / -2}
                top={frustumSize / 2}
                far={1000}
                near={0.5}
                zoom={45}
            />


        </>
    );
};

export default MiniMap;