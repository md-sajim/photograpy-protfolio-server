const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express())


const uri = `mongodb+srv://${process.env.USER_NAME_KEY}:${process.env.USER_SUCORATY_KEY}@cluster0.c8jqolf.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const serviceCollection = client.db('assingment-11').collection('serves')
        app.get('/serves', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const servises = await cursor.limit(3).toArray();
            res.send(servises);

        })
        app.get('/moreserves', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            console.log(page,size)

            const query = {};
            const cursor = serviceCollection.find(query);
            const servic = await cursor.skip(page*size).limit(size).toArray();
            const count = await serviceCollection.estimatedDocumentCount()
            res.send({count,servic});

        })
        app.get('/serves/:id',async(req, res)=>{
            const id = req.params.id;
            console.log(id)
            const query = {_id:ObjectId(id)}
            const selectedService = await serviceCollection.findOne(query)
            res.send(selectedService) 
        })
    }
    catch {

    }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send("Assingment 11 server renning")
});

app.listen(port, () => {
    console.log(`renning port:${port}`)
})