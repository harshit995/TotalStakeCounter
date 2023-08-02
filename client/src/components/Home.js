import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import "../styles/Home.css"
const BASE_URL = "https://total-stake.onrender.com"

const Home = () => {
    const [chainName, setChainName] = useState('');
    const [chainList, setChainList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of chain cards from the backend when the component mounts
        fetchChainList();
    }, []);

    const fetchChainList = () => {
        // Replace YOUR_BACKEND_API_URL with the actual URL of your backend API
        axios.get(`${BASE_URL}/chains`)
            .then((response) => {
                setChainList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/${chainName}`);
    };

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

    const handleDeleteChain = (chainName) => {
        // Delete the chainName from the chainList and remove it from the backend
        axios.delete(`${BASE_URL}/chains/${chainName}`)
            .then(() => {
                setChainList(chainList.filter((chain) => chain.name !== chainName));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className=" containers d-flex flex-column ">
            <div className="center-section">
                <div className='p-2'>
                    <h1 className='headings'>Search for a Chain</h1>
                </div>

                <Form >
                    <Form.Group controlId="chainName">
                        <Form.Control
                            type="text"
                            placeholder="Enter chain name (e.g., Polkadot, Cardano, Kusama)"
                            value={chainName}
                            onChange={(e) => setChainName(e.target.value)}
                        />
                    </Form.Group>
                    <div className="text-center p-2">
                        <Button variant="primary" type="submit" onClick={handleSearch} >
                            Search
                        </Button>
                    </div>
                </Form>
            </div >
            <div class="center-section">
                <div style={{ width: "100%" }}>
                    <h1 className="mt-5 text-center headings">Chain List</h1>
                    <div className='chainlist'>
                        {chainList.map((chain) => (
                            <Card key={chain.name} className="my-3">
                                <Card.Body>
                                    <Card.Title>{chain.name} Chain</Card.Title>
                                    <Button
                                        variant="danger"
                                        className="mx-2"
                                        onClick={() => handleDeleteChain(chain.name)}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                        {chainList.length === 0 && <h1>No chains added yet.</h1>}
                    </div>
                </div>
            </div>

            <div className="center-section ">
                <div className='d-flex flex-column'>
                    <h1 className="mt-5 text-center headings">Add Chain</h1>
                    <Form >
                        <Form.Group controlId="newChainName" onSubmit={handleAddChain}>
                            <Form.Control
                                type="text"
                                placeholder="Enter chain name (e.g., Polkadot, Cardano, Kusama)"
                                value={chainName}
                                onChange={(e) => setChainName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <div className='text-center p-2'>
                        <Button variant="success" type="submit" onClick={handleAddChain}>
                            Add Chain
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;
