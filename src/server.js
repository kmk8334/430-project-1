const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getStyle,
    '/getUsers': jsonHandler.getUsers,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

const handleGet = (request, response, parsedUrl) => {
  // Verify that the function exists in urlStruct
  if (urlStruct.GET[parsedUrl.pathname]) {
    urlStruct.GET[parsedUrl.pathname](request, response);
  } else {
    urlStruct.GET.notFound(request, response);
  }
};

const handleHead = (request, response, parsedUrl) => {
  // Verify that the function exists in urlStruct
  if (urlStruct.HEAD[parsedUrl.pathname]) {
    urlStruct.HEAD[parsedUrl.pathname](request, response);
  } else {
    urlStruct.HEAD.notFound(request, response);
  }
};

const handlePost = (request, response, parsedUrl) => {
  // Verify that the function exists in urlStruct
  if (parsedUrl.pathname === '/addUser') {
    const body = [];

    // If an error happens, print to the console and make the response a 400-error
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    // Load each packet of data into one body array
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // After the body is finished loading, turn the body into one concatenated string
    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      console.log('request on end');
      console.dir(bodyParams);

      jsonHandler.addUser(request, response, bodyParams);
    });
  } else {
    jsonHandler.notFound(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  console.dir(parsedUrl.pathname);
  console.dir(request.method);

  if (request.method === 'GET') {
    handleGet(request, response, parsedUrl);
  } else if (request.method === 'HEAD') {
    handleHead(request, response, parsedUrl);
  } else if (request.method === 'POST') {
    // console.dir(request);
    // console.log("----------");
    // console.dir(response);
    // console.log("----------");
    // console.dir(parsedUrl);
    handlePost(request, response, parsedUrl);
  } else {
    jsonHandler.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
