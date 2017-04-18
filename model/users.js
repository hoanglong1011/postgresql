const pool = require('../lib/db');

class User {    
    constructor(username, password, name, email){
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
    }

    login(callback){
        const sql = `SELECT * FROM users WHERE username = '${this.username}'`;
        pool.getdata(sql, null, (err, result) =>  {
            callback(err, result);
        });
    }

    add(callback){
        const sql = `INSERT INTO users(username, password, name, email) VALUES('${this.username}', '${this.password}', '${this.name}', '${this.email}')`;
        pool.getdata(sql, null, (err, result) => {
            if(err) callback(false);
            else callback(true);
        });
    }
}

module.exports = User;