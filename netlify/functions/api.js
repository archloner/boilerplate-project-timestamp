import express, { Router } from 'express';
import serverless from 'serverless-http';

var app = express();

let router = Router();

require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
router.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
router.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


router.get('/api/', function (req, res) {
  let now = new Date();
  res.json({'unix': now.valueOf(), 'utc': now.toUTCString()})
})

router.get('/api/:time', function (req, res) {
  let date = new Date(req.params.time)
  if (isNaN(date)) {
    date = new Date(parseInt(req.params.time))
    if (isNaN(date)) {
      res.json({'error': 'Invalid Date'})
      return;
    }
  }
  res.json({"unix": date.valueOf(), "utc": date.toUTCString()})
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use('/', router);

export const handler = serverless(app); 