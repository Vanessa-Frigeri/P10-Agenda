const con = require('./connection');
const executeQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        con.query(query, params, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });

};

module.exports = executeQuery;