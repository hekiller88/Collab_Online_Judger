const express = require('express');
const app = express();
const restRouter = require('./routes/rest');
const mongoose = require('mongoose');

//app.get('/', (req, res) => res.send('mei JJ!'))


//api: getting data, v1 - version indicated

app.use('/api/v1', restRouter);

mongoose.connect('mongodb://user:user123@ds255797.mlab.com:55797/problems', {useNewUrlParser: true}); //user: user123 - id/ps

app.listen(3000, () => console.log(`Example app listening on port 3000!`));