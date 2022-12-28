const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fe54zrb.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//////////////////////
//////////////////////
async function run() {
  try {
    const colloquyCollection = client
      .db("colloquyServer")
      .collection("colloquyUser");

    app.get("/colloquyUser", async (req, res) => {
      const query = {};
      const colloquyUser = await colloquyCollection.find(query).toArray();
      res.send(colloquyUser);
    });

    app.post("/colloquyUser", async (req, res) => {
      const colloquyUser = req.body;
      const result = await colloquyCollection.insertOne(colloquyUser);
      res.send(result);
    });

    app.get("/colloquyUser/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      // const query = { _id: id };
      const query = { _id: ObjectId(id) };
      console.log(query);
      const selectedPost = await colloquyCollection.findOne(query);
      console.log(selectedPost);
      res.send(selectedPost);
    });
  } finally {
  }
}
run().catch(console.log);

//////////////////////
//////////////////////

app.get("/", async (req, res) => {
  res.send("colloquy server is running");
});

app.listen(port, () => console.log(`colloquy is running on ${port}`));
