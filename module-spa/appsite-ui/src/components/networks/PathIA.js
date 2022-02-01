import React, {useState, useEffect} from 'react'
import {useIAService} from "../../services/IARequestService";

const PathIA = () => {
    const iaService = useIAService();
    const [path, setPath] = useState('');
    const [orig, setOrig] = useState(null);
    const [dest, setDest] = useState(null);
    const [options, setOptions] = useState(['strongestPath', 'safestPath', 'shortestPath'])

    useEffect(() => {
        const getPath = async () => {
            const res = await iaService.getStrongestPath(orig, dest).catch((err) => {
            });

            console.log(res.map((r) => r));
            setPath(res)
        }

        getPath()
    }, [])


    return (
        <div>
            {path}
        </div>
    )
}

export default PathIA
