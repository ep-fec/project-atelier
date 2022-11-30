# 👋 Welcome to `Project Atelier`

***A front-end solution for a dynamic and interactive product details page.***

**Problem**:
This project was launched to assist an enterprise in both scaling and deploying it's outdated product details page. The client requested that their products API be used to serve the web app, and that interactions between components meet certain requirements. Additionally, performance metrics and click-tracking were requested in order to keep their service fast and reliable.

**Solution**:
Our team delivered a web app which dynamically displays data from a products API and creates a UI/UX which is accessible, interactice, and fun. Users can browse product styles, find related products, ask questions and get answers, and check out reviews! Items can be added to a 'My Outfit' carousel which displays favorite outfits, compare products to other user feedback, and all item sizes and quantites can be easily purchased. User behavior is tracked with click-handlers in components and Project Atelier meets performance requirements when deployed.

## 🎥 Demo

## 📋 Features

- Product Overview
- Related Products
- Ratings & Reviews
- Click-Tracking

## 💾 Installation

1. Clone the repository.
   ```sh
   git clone https://github.com/rpp31-fec-bleu-cheese/project-atelier
   ```
2. To access the API, acquire a personal access token from https://github.com/ and insert the token into a ```config.js``` file.
3. Install NPM packages.
   ```sh
   npm install
    ```
3. Compile Webpack.
   ```sh
   npm run build
    ```
4. Start the server.
   ```sh
   npm start
    ```
5. Open on localhost:3000 or your preferred deployment!

## ⛰️ Environment Variables

To run this project in production or as a deployment, you will need to add the following environment variables to your .env file

`API_KEY=<your API key here>`

`ANOTHER_API_KEY=<another API key here>`

## ⚙️ Optimizations

**Accessibility:** Considerations were made for accessibility by including alt attributes in images and clickable features. Additionally, tests were run with considerations to W3C roles for HTML elements.
**Performance:** Performance increases were achieved by manually minifying JS and CSS, adding a meta tag to the index.html file, using gzip compression on the server, using in-line styles for images, and running Webpack in production mode.

## 💻 Tech Stack

* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [NodeJS](https://nodejs.dev/)
* [Babel](https://babeljs.io/)
* [Webpack](https://webpack.js.org/)
* [Jest](https://jestjs.io/docs/expect)
* [Enzyme](https://enzymejs.github.io/enzyme/)
* [React Testing Library](https://github.com/testing-library/react-testing-library)

## 🤖 Authors

* Hasan Uchchas - Product Overview
  * https://github.com/huchchas
* William - Related Products
  * https://github.com/
* Abdiel - Question and Answers
  * https://github.com/

## 🛠 Skills
Javascript, HTML, CSS, AWS

## 🔗 Links

## 📷 Screenshots


