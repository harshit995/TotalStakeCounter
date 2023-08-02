const axios = require('axios');
const Chain = require("../models/chainModel")
exports.getChain = async (req, res) => {
    const { chainName } = req.params;
    let totalStake;

    if (chainName === 'polkadot') {
        try {
            // const stash=''
            const apiUrl = `https://${chainName}.api.subscan.io/api/scan/staking/validator`;
            const requestData = {
                stash: process.env.stashP,
            };
            console.log(apiUrl)
            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.YOUR_API_KEY,
                },
            });
            console.log(response.data)
            console.log("yeh nhi hoga...")
            // const totalStake = response.data.data.amount || 0;
            totalStake = response.data.data.info.bonded_nominators;
            console.log("hiii")
            console.log(response.data)
            console.log("first..................")
            // console.log(response.data.info.bonded_total)
            await Chain.findOneAndUpdate({ name: chainName }, { totalStake }, { upsert: true, new: true })
                .then((updatedChain) => {
                    console.log("okk")
                })
                .catch((error) => {
                    console.error('Error updating chain:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Unable to fetch total stake data.' });
        }

    } else if (chainName === 'kusama') {

        try {

            const apiUrl = `https://${chainName}.api.subscan.io/api/scan/staking/validator`;
            const requestData = {
                stash: process.env.stashk,
            };
            console.log(apiUrl)
            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.YOUR_API_KEY,
                },
            });
            console.log(response.data)
            console.log("yeh nhi hoga...")

            console.log("hiii")
            console.log(response.data.data.info.bonded_nominators)
            totalStake = response.data.data.info.bonded_nominators;
            await Chain.findOneAndUpdate({ name: chainName }, { totalStake }, { upsert: true, new: true })
                .then((updatedChain) => {
                    console.log("okk")
                })
                .catch((error) => {
                    console.error('Error updating chain:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
            console.log("first..................")

            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Unable to fetch total stake data.' });
        }
    } else {
        return res.status(404).json({ error: 'Chain not found' });
    }
}

exports.getAllChains = async (req, res) => {
    Chain.find({})
        .then((chains) => {
            res.json(chains);
        })
        .catch((error) => {
            console.error('Error fetching chains:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
}

exports.getpostedChains = async (req, res) => {
    const { name } = req.body;

    Chain.findOne({ name })
        .then((chain) => {
            if (chain) {
                res.status(400).json({ error: 'Chain already exists' });
            } else {
                const newChain = new Chain({ name });
                newChain.save()
                    .then(() => {
                        res.status(201).json({ message: 'Chain added successfully' });
                    })
                    .catch((error) => {
                        console.error('Error saving chain:', error);
                        res.status(500).json({ error: 'Internal server error' });
                    });
            }
        })
        .catch((error) => {
            console.error('Error finding chain:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
}

exports.getdeletedChains = async (req, res) => {
    const { chainName } = req.params;

    Chain.findOneAndDelete({ name: chainName })
        .then(() => {
            res.json({ message: 'Chain deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting chain:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
}