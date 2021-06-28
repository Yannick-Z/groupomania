const db = require('../config/db');

/**
 * 
 * @param {String} reqSql 
 * @param {Array} args 
 * @returns {Promise}
 */
function query(reqSql, args = []) {
    return new Promise((resolve, reject) => {
        db.query(reqSql, args, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            return resolve(results);
        });
    });

}




module.exports.query = query;