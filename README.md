
<!-- README.md is generated from README.Rmd. Please edit that file -->

## Setting up auth0 with quarto

1.  Initialize `index.qmd`

2.  Publish to GitHub Pages

3.  Make a new project on `auth0.com`, select JavaScript as project type

4.  Use the `Download sample` box in the project set up dialogue. This
    will have options like this:

For Allows Callback URLs, Allowed Web Origins, and Allowed Logout URLs

``` sh
http://localhost:3000
```

Make sure to also add this to the project page inside of `auth0.com`. If
you already know the ultimate domain where the page is going to live,
you can add those domains here too, separated by commas.

5.  Install the Auth0 SPA SDK as a dependency

``` sh
npm install --save @auth0/auth0-spa-js
```

and add the newly created `node_modules/` to `.gitignore`

``` r
usethis::use_git_ignore("node_modules")
```

6.  Reference the CDN in `index.qmd`

``` html
<script src="https://cdn.auth0.com/js/auth0-spa-js/1.20/auth0-spa-js.production.js"></script>
```

7.  Put the vanilla button content in `index.qmd`

``` html
<p>Welcome to our page!</p>
<button id="btn-login" disabled="true" onclick="login()">Log in</button>
<button id="btn-logout" disabled="true" onclick="logout()">Log out</button>
```

8.  Add `public/css/main.css` and reference it in the `index.qmd` top
    yaml

``` css
.hidden {
  display: none;
}

label {
  margin-bottom: 10px;
  display: block;
}
```

9.  Add `public/js/app.js` and reference it in a script tag of
    `index.qmd`

10. Initialize `auth_config.json` in root with the info available in the
    project tab

``` json
{
  "domain": "dev-vs2e5wst.us.auth0.com",
  "clientId": "MLJu62ScBhbIG8fq73v5GEZb2LANoYeF"
}
```

11. Initialize npm project and install dependencies

``` sh
npm init -y
npm install express
```

12. Install `nodemon` to restart server on code change

``` sh
npm install -D nodemon
```

13. Modify `package.json` to set up start and dev npm environments

``` sh
{
  // ...
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  // ...
}
```

14. Initialize `server.js` in root with

``` js
const express = require("express");
const { join } = require("path");
const app = express();

// Serve static assets from the /public folder
app.use(express.static(join(__dirname, "public")));

// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Listen on port 3000
app.listen(3000, () => console.log("Application running on port 3000"));
```

14. At this point, should be able to `npm start` or `npm run` to see the
    site on <http://localhost:3000/>
