# 🧠 FULL-STACK MASTER GUIDE (React + Node + MongoDB + Firebase)

------------------------------------------------------------------------

# 1. ARCHITECTURE OVERVIEW

    [ React Frontend ]
            ↓ (HTTP / Axios)
    [ Express Backend API ]
            ↓
    [ MongoDB Database ]

    (Auth handled by Firebase)

### Data Flow:

1.  User interacts with UI
2.  React sends request to backend
3.  Backend processes logic
4.  Backend queries MongoDB
5.  Response sent back to React
6.  UI updates

------------------------------------------------------------------------

# 2. FRONTEND (REACT + VITE)

## Setup

``` bash
npm create vite@latest frontend
cd frontend
npm install
npm run dev
```

## Folder Structure

    src/
     ├── components/
     │    └── Navbar.jsx
     ├── pages/
     │    ├── Home.jsx
     │    └── Article.jsx
     ├── api/
     │    └── articles.js
     ├── App.jsx
     └── main.jsx

------------------------------------------------------------------------

## React Router Setup

``` bash
npm install react-router-dom
```

``` js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Article from './pages/Article';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/articles/:name', element: <Article /> }
    ]
  }
]);
```

------------------------------------------------------------------------

## Dynamic Route Example

``` js
import { useParams } from 'react-router-dom';

export default function Article() {
  const { name } = useParams();
  return <h1>{name}</h1>;
}
```

------------------------------------------------------------------------

## Axios API Layer (BEST PRACTICE)

Create `/api/articles.js`

``` js
import axios from 'axios';

export const getArticle = async (name) => {
  const res = await axios.get('/api/articles/' + name);
  return res.data;
};
```

Use in component:

``` js
import { useEffect, useState } from 'react';
import { getArticle } from '../api/articles';

export default function Article() {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticle('react').then(setArticle);
  }, []);

  return <div>{article?.title}</div>;
}
```

------------------------------------------------------------------------

# 3. BACKEND (NODE + EXPRESS)

## Setup

``` bash
mkdir backend
cd backend
npm init -y
npm install express mongodb cors
```

------------------------------------------------------------------------

## Server Setup

``` js
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
```

------------------------------------------------------------------------

## Route Example

``` js
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;

  const article = await db.collection('articles').findOne({ name });

  res.json(article);
});
```

------------------------------------------------------------------------

# 4. DATABASE (MONGODB)

## Connection

``` js
import { MongoClient } from 'mongodb';

let db;

export async function connectDB() {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  db = client.db('my-app-db');
}
```

------------------------------------------------------------------------

## Insert Example

``` js
await db.collection('articles').insertOne({
  name: 'react',
  title: 'React Guide',
  content: '...'
});
```

------------------------------------------------------------------------

# 5. AUTHENTICATION (FIREBASE)

## Frontend Login

``` js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

await signInWithEmailAndPassword(auth, email, password);
```

------------------------------------------------------------------------

## Send Token

``` js
const token = await user.getIdToken();

axios.get('/api/articles', {
  headers: { authtoken: token }
});
```

------------------------------------------------------------------------

## Backend Middleware

``` js
import admin from 'firebase-admin';

app.use(async (req, res, next) => {
  const token = req.headers.authtoken;

  if (!token) return res.sendStatus(401);

  try {
    const user = await admin.auth().verifyIdToken(token);
    req.user = user;
    next();
  } catch {
    res.sendStatus(403);
  }
});
```

------------------------------------------------------------------------

# 6. VITE PROXY

``` js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true
    }
  }
}
```

------------------------------------------------------------------------

# 7. BUILD + DEPLOY

## Build

``` bash
npm run build
```

## Serve

``` js
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile('dist/index.html');
});
```

------------------------------------------------------------------------

# 8. ENV VARIABLES

    MONGODB_URI=your_uri
    FIREBASE_KEY=your_key

------------------------------------------------------------------------

# 9. MENTAL MODEL

    React → Axios → Express → MongoDB → Express → React

------------------------------------------------------------------------

# 🔥 FINAL TIP

Always build features in this order:

1.  UI
2.  API route
3.  Database logic
4.  Connect frontend
5.  Add auth
6.  Deploy

------------------------------------------------------------------------

END OF GUIDE
