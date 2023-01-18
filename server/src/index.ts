import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const { PORT, DB_USER_NAME, DB_PASS_KEY } = process.env;

const app = express();
const port = PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${DB_USER_NAME}:${DB_PASS_KEY}@cluster0.qf4bw47.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
  try {
    client.connect();
    const options = client.db("task-form").collection("involved-options");
    const userData = client.db("task-form").collection("user-data");

    //get all options
    app.get("/options", async (req, res) => {
      const result = await options.find().toArray();
      res.send({ result });
    });
    
    //retribe users data
    app.get('/usersname/:name', async (req, res)=>{
      const {name} = req.params;
      const result = await userData.findOne({name});
      res.send({result});
    })

    //insert or update users data
    app.post("/userdata", async (req, res) => {
      const { name } = req.body;
      const result = await userData.findOneAndUpdate(
        { name },
        { $set: req.body },
        { upsert: true }
      );
      if (result.ok > 0) {
        res.status(200).send({ message: result });
      } else {
        res.status(500).send({ message: result });
      }
    });
    
  } finally {
    client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "form task server is here",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
