const mongoose = require('mongoose');

const chainSchema = new mongoose.Schema({
    name: String,
    totalStake: Number,
});

const Chain = mongoose.model('Chain', chainSchema);

module.exports = Chain;