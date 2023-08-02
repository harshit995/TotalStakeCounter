// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Card } from 'react-bootstrap';
// import axios from 'axios';

// const ChainDetail = () => {
//     const { chainName } = useParams();
//     const [totalStake, setTotalStake] = useState('');

//     const handleAddChain = () => {
//         // Check if the chainName already exists in the chainList
//         if (chainList.find((chain) => chain.name === chainName)) {
//             alert('Chain already exists in the list.');
//             return;
//         }

//         // Add the chainName to the chainList and save it to the backend
//         axios.post('YOUR_BACKEND_API_URL/chains', { name: chainName })
//             .then(() => {
//                 setChainList([...chainList, { name: chainName }]);
//                 setChainName('');
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     const handleDeleteChain = (chainName) => {
//         // Delete the chainName from the chainList and remove it from the backend
//         axios.delete(`YOUR_BACKEND_API_URL/chains/${chainName}`)
//             .then(() => {
//                 setChainList(chainList.filter((chain) => chain.name !== chainName));
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     useEffect(() => {
//         // Make API request to the backend to fetch total stake for the given chainName
//         // Replace YOUR_BACKEND_API_URL with the actual URL of your backend API
//         axios.get(`/chain/${chainName}`)
//             .then((response) => {
//                 setTotalStake(response.data.data.info.bonded_nominators);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, [chainName]);

//     return (
//         <div className="container mt-5">
//             <h2>{chainName} Chain</h2>
//             <Card>
//                 <Card.Body>
//                     <Card.Title>Total Stake</Card.Title>
//                     <Card.Text>
//                         {totalStake} {/* Display the total stake here */}
//                     </Card.Text>
//                 </Card.Body>
//             </Card>

//             {/* Add Chain Add and Delete buttons */}
//             <Button variant="success" className="my-3" onClick={handleAddChain}>
//                 Add Chain
//             </Button>
//             <Button
//                 variant="danger"
//                 className="mx-2 my-3"
//                 onClick={() => handleDeleteChain(chainName)}
//             >
//                 Delete Chain
//             </Button>
//         </div>
//     );
// };

// export default ChainDetail;










import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import "../styles/Chain.css"
const ChainDetail = () => {
    const { chainName } = useParams();
    const [totalStake, setTotalStake] = useState('');
    const [chainList, setChainList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchChainList();
        fetchTotalStake();
    }, []);

    const fetchChainList = () => {
        // Replace YOUR_BACKEND_API_URL with the actual URL of your backend API
        axios.get('/chains')
            .then((response) => {
                setChainList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchTotalStake = async () => {
        // Replace YOUR_BACKEND_API_URL with the actual URL of your backend API
        if (`${chainName}` === "cardano") {
            navigate("/cardano")
        } else {
            await axios.get(`chain/${chainName}`)
                .then((response) => {
                    setTotalStake(response.data.data.info.bonded_nominators);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleAddChain = () => {
        // Check if the chainName already exists in the chainList
        if (chainList.find((chain) => chain.name === chainName)) {
            alert('Chain already exists in the list.');
            return;
        }

        // Add the chainName to the chainList and save it to the backend
        axios.post('/chains', { name: chainName })
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
        axios.delete(`/chains/${chainName}`)
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
                    <Card.Body>
                        <Card.Title className='headings'>Total Stake</Card.Title>
                        <Card.Title className='headings'>(with luganodes validator)</Card.Title>
                        <Card.Text>
                            <h3>{totalStake} {/* Display the total stake here */}</h3>
                        </Card.Text>
                    </Card.Body>
                </Card>

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
    );
};

export default ChainDetail;
