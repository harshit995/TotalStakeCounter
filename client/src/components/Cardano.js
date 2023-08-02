
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import "../styles/Chain.css"
const BASE_URL = "http://localhost:5000"

const Cardano = () => {
    const chainName = "cardano";

    const [totalStake, setTotalStake] = useState('');
    const [chainList, setChainList] = useState([]);
    const navigate = useNavigate();
    const handleAddChain = () => {
        // Check if the chainName already exists in the chainList
        if (chainList.find((chain) => chain.name === chainName)) {
            alert('Chain already exists in the list.');
            return;
        }

        // Add the chainName to the chainList and save it to the backend
        axios.post(`${BASE_URL}/chains`, { name: chainName })
            .then(() => {
                setChainList([...chainList, { name: chainName }]);
                // setChainName('');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteChain = () => {
        // Delete the chainName from the chainList and remove it from the backend
        axios.delete(`${BASE_URL}/chains/${chainName}`)
            .then(() => {
                setChainList(chainList.filter((chain) => chain.name !== chainName));
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className="conatiners ">
            <div className='card shadow cards'>
                <h2 className='headings'>{chainName} Chain</h2>
                <Card>
                    <iframe width="400" height="320" frameborder="0" src="https://img.cexplorer.io/w/widget.html?pool=pool1qvudfuw9ar47up5fugs53s2g84q3c4v86z4es6uwsfzzs89rwha&theme=dark"><a href="https://cexplorer.io/pool/pool1qvudfuw9ar47up5fugs53s2g84q3c4v86z4es6uwsfzzs89rwha"></a></iframe>                </Card>

                {/* Add Chain Add and Delete buttons */}
                <Button variant="success" className="my-3" onClick={handleAddChain}>
                    Add Chain
                </Button>
                <Button
                    variant="danger"
                    className="mx-2 my-3"
                    onClick={handleDeleteChain}
                >
                    Delete Chain
                </Button>
            </div>
        </div >
    )
}

export default Cardano
