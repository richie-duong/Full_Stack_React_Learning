# Learning and Hosting a React Full-Stack Website
All content derived from LinkedIn Learning's: React: Creating and Hosting a Full-Stack Site by: Shaun Wassell




## Front End using React


### Setting up project files
run `npm create vite@latest` to set up front-end directory
run `npm install` in the front-end directory
npm `run dev` to start react application


### Rendering pages Displaying on different routes
Make a folder called `pages` in src folder. Create .jsx files for each corresponding web page.


### Adding React Router to the app
Allows you to customize routes / url for each page on the website.

- Run `npm install react-router-dom`.

- Import the following to get started: `import {createBrowserRouter, RouterProvider} from 'react-router-dom'`. 'createBrowserRouter' is the recommended router for React Router web projects, designed to enable modern data APIs such as loaders, actions, and fetchers. Its primary purpose is to move routing configuration outside the React tree, enabling optimized, parallelized data loading and improved error handling compared to the legacy <BrowserRouter>.

- Create your routes like the example shown below:
```
const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [{
    path: '/',
    element: <Home />
  }, {
    path: '/about',
    element: <About />
  }, {
    path: '/articles',
    element: <ArticlesListPage />
  }, {
    path: '/articles/:name',
    element: <ArticlePage />
  }]
}]

const router = createBrowserRouter(routes);
```


### Using React Router Links
- Import the following: `import {Link} from "react-router-dom"`. Rather than using an anchor tag for each navbar item (use "Link" and not "link", it IS case sensitive).

Example of using Link:
`<Link to="/page"></Link>`

It is BEST to create a Layout.jsx file to re-render shared UI elements across multiple pages. Create and use a Navbar component along with the <Outlet /> component (tells router exactly where to render child route components within a parent layout) in your Layout.jsx file.


### URL parameters with React Router
Allows you to use URL parameters inside your code, which can allow users to navigate to a Dynamic route.

To Define a Dynamic Route, set up a route with a colon, followed by a placeholder name:
`/user/:userId`

Extracting the data allows you to call useParams() to get an object containing those values. But before doing so, you must import:
`import { useParams } from 'react-router-dom';`


### Creating and linking the articles list
Dynamically creating and linking each article in a list on the articles page. Everything here is simplified using JS's map function.




## Back End using Node.js
- Run `npm init -y` in terminal to Keep track of basic information about the project.
- Run `npm install express` to setup Express (designed to simplify the process of building web apps and APIs).
- Create a src folder with `server.js` file in it, containing the backend codes.

An 'End-point' is a path we can send a request to, and send some sort of data or message back.


## Using Express
Use the following in your server.js to setup the Express app.
```
import express from 'express';

const app = express();

// Automatically parse incoming JSON requests so the data can be accessed directly via req.body
app.use(express.json());
```


### Testing an Express server with Postman
To prevent having to terminate and restarting the terminal, we can have changes applied automatically by installing 'nodemon'. Once installed, run like: `npx nodemon src/server.js`


### Use Nodemon to automatically update
Edit the package.json file to simplify command. Under 'scripts', add the following:
`"dev": "npx nodemon src/server.js"`


## Persisting Data w/ MongoDB
MongoDB is a Non-relational database that stores JSON-like data into collections (equivalent to a relational db's 'tables'). 


### Establishing a MongoDB database connection
Below, is a guide to setting up a connection to your MongoDB, allowing a variety of endpoints to access the db without having to reinitialize a db connection every single time:

```
import { MongoClient, ServerApiVersion } from 'mongodb';

let db;

async function connectToDB() {
    const uri = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(uri, {
        serverApi: {
            version:ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    await client.connect();
    db = client.db('full-stack-react-db');
}

async function start() {
    await connectToDB();
    app.listen(8000, function() {
        console.log('Server is listening on port 8000');
    });
}

start();
```


### Important MongoDB syntax
- `db.collection().findOne( filter, replacement, options)` Returns one document that satisfies the specfied query criteria on the collection or view. More info: https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
- `db.collection().findOneAndUpdate( filter, update, options )` Updates a single document based on the filter and sort criteria. More info: https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/




## Connecting the Front and Back-End using AXIOS
Axios is a popular promise-based HTTP client library for JavaScript, used to make asynchronous network requests from browsers and Node.js environments. It simplified interacting with RESTful APIs by providing an intuitive API for HTTP methods and automatically transforming JSON data.

- Run `npm install axios` in the front-end directory to get started.
- Add a loader to a route using `loader`. You can add a function, or to make it more modular, add it to to the corresponding JSX page file and add props to the functions. Follow the following code snippet below and remember to import axios:
```
export async function loader({ params }) {
  const response = await axios.get('/api/articles/' + params.name);
  const { upvotes, comments } = response.data;
  return { upvotes, comments }
}
```

- Use React's useState hook throughout all of this. Example shown here:
```
const [count, setCount] = useState(); // initial state goes in useState()
```

- Vite.Config.JS Setup: Whenever the React app calls /api/..., secretly send requests to my backend server instead. This will allow frontend and backend to work together without CORS issues.
```
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://r84zf4x2-8000.use.devtunnels.ms',
        changeOrigin: 'true'
      }
    }
  }
})
```



## Adding User Authentication w/ Firebase Authentication (Front-End)
- Run `npm install firebase` in front-end directory.
- Copy the block of code provided by Firebase (runs when react app is loaded on browser that will connect to Firebase auth) to Main.jsx. Add it before any block of code to ensure it runs before rendering the React app.

- Change sign-in method / provider on Firebase to Email/Password, and ensure that it is enabled.

## Adding User Authentication w/ Firebase Authentication (Back-End)
- Run `npm install firebase-admin` and `import admin from 'firebase-admin';`
- Go to Project Settings > Service Accounts in firebase. Copy the block of code and put it into project. Aavoid pushing through GitHub, as key is confidential. This can be achieved using through `.gitignore`.

## Protecting endpoints using auth tokens
Below is Express middleware that runs before your routes and makes sure every request has a valid Firebase auth token. If it does, it attaches the decoded user to the request; if not, it blocks the request.
```
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
```