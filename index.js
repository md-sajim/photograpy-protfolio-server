const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express())


const uri = `mongodb+srv://${process.env.USER_NAME_KEY}:${process.env.USER_SUCORATY_KEY}@cluster0.c8jqolf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run (){
const collection = client.db('service').collection('products')
}
run().catch(err =>console.log(err))


app.get('/',(req, res)=>{
    res.send("Assingment 11 server renning")
});
app.listen(port,()=>{
    console.log(`renning port:${port}`)
})