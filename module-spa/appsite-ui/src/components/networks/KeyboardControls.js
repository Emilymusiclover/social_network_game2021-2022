import {useState, useEffect} from 'react';

/**tecla ‘A’ – rodar para a esquerda; tecla
 *  ‘D’ – rodar para a direita; tecla
 * ‘W’ – avançar; tecla
 * ‘S’ – recuar; tecla
 * ‘P’ – subir; tecla
 * ‘L’ - descer */

function actionByKey(key) {
    const keys = {
        KeyW: 'Forward',
        KeyS: 'Backward',
        KeyA: 'Left',
        KeyD: 'Right',
        KeyP: 'Up',
        KeyL: 'Down',
    };
    return keys[key];
}


export const KeyboardControls = () => {
    const [movement, setMovement] = useState({
        Forward: false,
        Backward: false,
        Left: false,
        Right: false,
        Up: false,
        Down: false,
    });


    useEffect(() => {
        const handleKeyDown = (e) => {
            // if key is pressed
            if (actionByKey(e.code)) {
                setMovement((state) => ({
                    ...state,
                    [actionByKey(e.code)]: true,
                }));
            }
        }
        //if key is not pressed
        const handleKeyUp = (e) => {
            if (actionByKey(e.code)) {
                setMovement((state) => ({
                    ...state,
                    [actionByKey(e.code)]: false,
                }));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return movement;
};

  






