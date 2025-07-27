const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/customers.json');

function getAll() {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
}

function saveAll(customers) {
    fs.writeFileSync(dataPath, JSON.stringify(customers, null, 2));
}

module.exports = {
    getAll,
    saveAll
};