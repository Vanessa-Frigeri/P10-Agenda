const moment = require('moment');
const Child = require('../model/childs');

module.exports = app => {
    app.post('/child', (req, res) => {
        const childs = req.body;
        Child.addChild(childs, res);
    });
};