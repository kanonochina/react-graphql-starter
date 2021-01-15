
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql-schema');
const path = require('path');
const cors = require('cors')
const app = express();


console.log(process.env.npm_lifecycle_script === "nodemon server/index.js");
if(process.env.npm_lifecycle_script === "nodemon server/index.js"){
  var fs = require('fs')
  var https = require('https')
  var certOptions = {
    key: fs.readFileSync(path.join(__dirname,'../server.key')),
    cert: fs.readFileSync(path.join(__dirname,'../server.crt'))
  }
}

const mongoose = require('mongoose');
const MongoDB = process.env.MONGO_URI || 'mongodb://localhost/graphql';

mongoose.connect(MongoDB, { useNewUrlParser: true }, () => console.log('connected to database'));

app.use(express.static(path.join(__dirname, './public')))
app.use(cors())  // temporary

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true  //Set to true to view GraphiQl in browser at /graphql
}));

app.post('/api', (req, res) => {
  res.sendStatus(200)
})


app.get('*', function(req, res) { 
  res.sendFile('index.html', {root: path.join(__dirname, '../server/public')});
});

app.listen(4000, () => {
  console.log('Listening on 4000')
});
if(process.env.npm_lifecycle_script === "nodemon server/index.js"){
var server = https.createServer(certOptions, app).listen(443)
}
// 