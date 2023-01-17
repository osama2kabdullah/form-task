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

const uri =
`mongodb+srv://${DB_USER_NAME}:${DB_PASS_KEY}@cluster0.qf4bw47.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
  try {
    client.connect();
    const options = client.db("task-form").collection("involved-options");
    
    app.get('/options', async (req, res)=>{
      const result =  await options.find().toArray();
      res.send({result});
    })
    
    /**
     * TODO:
     * 1. make a post api that recieve users info
     * 2. check users name
     * 3. if name contains in DB change his/her value
     * 4. otherwise insert him/her
    */
    
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
