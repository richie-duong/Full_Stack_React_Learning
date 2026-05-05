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

Run `npm install react-router-dom`.

Import the following to get started:
`import {createBrowserRouter, RouterProvider} from 'react-router-dom'`. createBrowserRouter is the recommended router for React Router web projects, designed to enable modern data APIs such as loaders, actions, and fetchers. Its primary purpose is to move routing configuration outside the React tree, enabling optimized, parallelized data loading and improved error handling compared to the legacy <BrowserRouter>.

Create your routes like the example shown below:
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
Import the following: `import {Link} from "react-router-dom"`

Rather than using an anchor tag for each navbar item (use "Link" and not "link", it IS case sensitive).

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
npm init -y Keep track of basic information about the project
npm install express
Create src folder with server.js file in it

End-point is a path we can send a request to, and send some sort of data or message back.

## Testing an Express server with Postman
