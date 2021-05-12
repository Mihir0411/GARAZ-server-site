const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9n4k9.mongodb.net/CarService?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });





const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const port = 5000




client.connect(err => {
  const collection = client.db("CarService").collection("carServiceCollection");
  app.get('/service', (req, res) => {
    collection.find({})
      .toArray((err, items) => {
        res.send(items)
        console.log(items)
      })
  })

  app.get('/service/:id', (req, res) => {
    collection.find({ _id: ObjectID(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })


  app.post('/addService',(req,res) => {
    const service = req.body;
    collection.insertOne(service)
    .then(result =>{
        res.send(result.insertedCount > 0)
    })
  })
  console.log('hello pera')
});

client.connect(err => {
  const reviewCollection = client.db("reviews").collection("reviewCollection");

  app.get('/review', (req, res) => {
    reviewCollection.find({})
      .toArray((err, items) => {
        res.send(items)
        console.log(items)
      })
  })

  app.post('/addReviews',(req,res) => {
    const review = req.body;
    reviewCollection.insertOne(review)
    .then(result =>{
        res.send(result.insertedCount > 0)
    })
  })
});

app.get('/', (req, res) => {
  res.send('Hello heroku')
})

app.listen(process.env.PORT || port)