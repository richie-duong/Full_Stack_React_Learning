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


