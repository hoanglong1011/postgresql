class News {
    constructor(){
    }

    getdata(pool, callback){
        const sql = 'SELECT * FROM news';
        pool.getdata(sql, null, (err, result) => callback(err, result));
    }

    getdata(pool, params, callback){
        const sql = 'SELECT * FROM news WHERE id = ?';
        pool.getdata(sql, params, (err, result) => callback(err, result));
    }
}

const pool = require('../lib/db');

const news = new News();
// news.getdata(pool, (err, result) => {
//     if(err) console.log('Error: ', err);
//     else console.log(result);
// })

news.getdata(pool, [1], (err, result) => {
    if(err) console.log('Error: ', err);
    else console.log(result);
})