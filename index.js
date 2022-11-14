const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.USER_NAME_KEY}:${process.env.USER_SUCORATY_KEY}@cluster0.c8jqolf.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const serviceCollection = client.db('assingment-11').collection('serves')
        const orderCalaction = client.db('assingment-11').collection('orders')
        const latastShortCalaction = client.db('assingment-11').collection('latast short')
        app.get('/serves', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const servises = await cursor.limit(3).toArray();
            res.send(servises);

        })
        app.get('/latastShort', async (req, res) => {
            const query = {};
            const cursor = latastShortCalaction.find(query);
            const servises = await cursor.toArray();
            res.send(servises);

        })
        app.get('/moreserves', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {};
            const cursor = serviceCollection.find(query);
            const servic = await cursor.skip(page * size).limit(size).toArray();
            const count = await serviceCollection.estimatedDocumentCount()
            res.send({ count, servic });

        })
        app.get('/serves/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const selectedService = await serviceCollection.findOne(query)
            res.send(selectedService)
        })
        app.post('/order', async (req, res) => {
            const order = req.body;
            const postOrder = await orderCalaction.insertOne(order)
            res.send(postOrder)
        })
        app.get('/revew', async (req, res) => {
            var query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = orderCalaction.find(query);
            const orderRevew = await cursor.toArray();
            res.send(orderRevew)
        })
        app.patch('/order/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const status = req.body.status;
            const query = { _id: ObjectId(id) }
            const updateDoc = {
                $set: {
                    status: status
                }
            }
            const result = await orderCalaction.updateOne(query, updateDoc);
            res.send(result)
        })
        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const update = req.body;
            const option = {upsert:true}
            const updateDoc = {
                $set:{ 
                    castomerName:update.castomerName,
                    address:update.address,
                    phone:update.phone,
                    castomerText:update.castomerText,
                    email:update.email,
                    img:update.img,
                    ServicName:update.ServicName,
                    id:update.id
                }
            }
            const result = await orderCalaction.updateOne(query, updateDoc,option);
            res.send(result)
        })
        app.get('/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const selectedService = await orderCalaction.findOne(query)
            res.send(selectedService)
        })
        app.delete('/order/:id',async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const resutl = await orderCalaction.deleteOne(query)
            res.send(resutl)
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