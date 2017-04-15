class User {
    constructor(pool){
        this.pool = pool;
    }

    login(username, password, callback){
        const sql = `SELECT * FROM users WHERE username = '${username}' AND '${password}' = ?`;
        this.pool.getdata(sql, null, (err, result) =>  {
            if(err) callback(false);
            else callback(true);
        });
    }

    add(username, password, name, email, callback){
        const sql = `INSERT INTO users(username, password, name, email) VALUES('${username}', '${password}', '${name}', '${email}')`;
        this.pool.getdata(sql, null, (err, result) => {
            if(err) callback(false);
            else callback(true);
        });
    }
}

const pool = require('../lib/db');

const user = new User(pool);

user.add('hoanglong1011', '123', 'hoanglong', 'viethq@spaceaa.com', (success) => {
    console.log(success);
})