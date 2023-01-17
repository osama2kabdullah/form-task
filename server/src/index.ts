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
`mongodb+srv://${DB_USER_NAME}:${DB_PASS_KEY}@cluster0.qf4bw47.mongodb.net/?retryWrites=true&w=majority`; //change this uri and add your own
const client = new MongoClient(uri);

async function run() {
  try {
    client.connect();
    const places = client.db("travel-guru").collection("places"); //it will be changed
    
    
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
