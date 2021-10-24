const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const feedRoute = require('./routes/feedRoute');
const commuRoute = require('./routes/commuRoute');
const postRoute = require('./routes/postRoute');
const errorController = require('./controllers/errorController');
// const { sequelize } = require('./models');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static('public'));
app.use(cors());

/////////////////////////////// Route ต่างๆ

// sequelize.sync({});
//////////////////////////////////////////

app.use('/users', userRoute);
app.use('/feeds', feedRoute);
app.use('/communities', commuRoute);
app.use('/posts', postRoute);
//Page not found 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'this resource is not found' });
});

// Error Middleware
app.use(errorController);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
