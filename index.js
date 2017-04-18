const express = require('express');
const bodyParser = require('body-parser');
const user = require('./model/users');
const pool = require('./lib/db');
const bcrypts = require('./lib/bcrypts');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, (err) => {
    console.log('Server is istening at port 3000!');
});

app.get('/', (req, res) => res.render('home'));

app.get('/signup', (req, res) => res.render('signup'));

app.post('/signup', (req, res) => {
    const {name, username, password, email} = req.body;

    bcrypts.hash(password, (err, hash) => {
        if(err) res.send(err);
        else {
            const u = new user(username, hash, name, email);
            u.add((success) => {
                res.send(success);
            });
        }
    });
});

app.get('/signin', (req, res) => res.render('signin'));

app.post('/signin', (req, res) => {
    const {username, password} = req.body;
    const u = new user(username, password);

    u.login((err, result) => {
        if(err) res.send(err);
        else {
            if(result.rowCount > 0){
                bcrypts.compare(password, result.rows[0].password, (err, success) => {
                    if(err) res.send(err);
                    else res.send(success);
                });
            }
        }
    });
});