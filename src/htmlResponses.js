const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Bootstrap
const bootstrapCss = fs.readFileSync(`${__dirname}/../resources/bootstrap/5.0.0/bootstrap.min.css`);
const bootstrapJs = fs.readFileSync(`${__dirname}/../resources/bootstrap/5.0.0/bundle.min.js`);

// Babel
const babelJs = fs.readFileSync(`${__dirname}/../resources/babel-core/5.8.34/browser.min.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getBootstrapCss = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(bootstrapCss);
  response.end();
};

const getBootstrapJs = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(bootstrapJs);
  response.end();
};

const getBabelJs = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/babel' });
  response.write(babelJs);
  response.end();
};

module.exports = {
  getIndex,
  getStyle,
  getBootstrapCss,
  getBootstrapJs,
  getBabelJs,
};
