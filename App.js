require('dotenv').config();
require ('./db')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const user = require('./controllers/usercontroller');
const wine = require('./controllers/winecontroller');
const userFavorite = require('./controllers/userfavoritecontroller');
const listName = require('./controllers/listnamecontroller');

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/api/user', user);
app.use(require('./middleware/validate-session'));
app.use('/wines', wine);
app.use('/user-favorites', userFavorite);
app.use('/favorites-list', listName); 

require('./Associations')

app.listen(process.env.PORT);
