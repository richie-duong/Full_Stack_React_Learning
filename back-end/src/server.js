import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import admin from 'firebase-admin';
import fs from 'fs';

// importing dependencies for app release
import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//var serviceAccount = require("path/to/serviceAccountKey.json");
const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
)

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app = express();

let db;

async function connectToDB() {

  const uri = !process.env.MONGODB_USERNAME
    ? 'mongodb://127.0.0.1:27017'
    : `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jw3os9x.mongodb.net/?appName=Cluster0`;

  // Use this version in development process, NOT deployment
  //const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  db = client.db("full-stack-react-db");
}

// JSON request body
app.use(express.json());

// Preparing app for release, allowing for port 8000 to run both front-end and back-end simultaneously
// Serves everything inside dist/ as static files and handles does files as GET requests
app.use(express.static(path.join(__dirname, '../dist')))

// For ANY route that is not /api/..., return index.html
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Rewriting endpoint to load article info from MongoDB
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const article = await db.collection("articles").findOne({ name });
  res.json(article);
});

// Middleware to load the user: Applies to all endpoints below (order matters)
app.use(async function(req, res, next) {
  const { authtoken } = req.headers;
  if (authtoken) {
    const user = await admin.auth().verifyIdToken(authtoken);
    req.user = user;
    next();
  } else {
    res.sendStatus(400);
  }
})

// Rewriting the upvote endpoint
app.post("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  //original article
  const article = await db.collection('articles').findOne({ name });

  const upvoteIds = article.upvoteIds || [];
  const canUpvote = uid && !upvoteIds.includes(uid);

  if (canUpvote) {
    const updatedArticle = await db.collection("articles").findOneAndUpdate(
      { name },
      {
        // MongoDB for incrementing
        $inc: { upvotes: 1 },
        $push: { upvoteIds: uid },
      },
      {
        returnDocument: "after",
      })
    res.json(updatedArticle);
  } else {
    res.sendStatus(403);
  };
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text };

  const updatedArticle = await db.collection("articles").findOneAndUpdate(
    { name },
    {
      $push: { comments: newComment },
    },
    {
      returnDocument: "after",
    },
  );

  res.json(updatedArticle);
});

const PORT = process.env.PORT || 8000;

async function start() {
  await connectToDB();
  app.listen(PORT, function () {
    console.log("Server is listening on port " + PORT);
  });
}
start();


// Use this for development, BEFORE deployment
/*async function start() {
  await connectToDB();
  app.listen(8000, function () {
    console.log("Server is listening on port 8000");
  });
}
start();*/
