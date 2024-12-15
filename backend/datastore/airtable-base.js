const Airtable = require('airtable');

// Initialize the Airtable base object
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN })
    .base(process.env.AIRTABLE_BASE);

module.exports = base;