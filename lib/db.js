const pg = require('pg');

var config = {
    host: 'localhost',
    port: 5432,
    database: 'news',
    user: 'postgres',
    password: 'D@nTh@nh1011'
};

const pool = new pg.Pool(config);

function query(sql, callback){
    pool.connect((err, client, done) => {
        if(err) callback(err);
        client.query(sql, (err, result) => {
            if(err) callback(err);
            callback(null, result);
        });
    });
}

module.exports.connect = function(err, client, callback){
    return pool.connect(err, client, callback);
}

module.exports = { query };

module.exports.getdata = function(sql, params, callback){
    pool.connect((err, client, done) => {
        if(err) callback(err);
        client.query(sql, params, (err, result) => {
            done(err);
            if(err) callback(err);
            callback(null, result);
        });
    });
}