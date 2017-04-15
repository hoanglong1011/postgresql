const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, (err) => {
    console.log('Server is istening at port 3000!');
});

app.get('/', (req, res) => res.render('home'));