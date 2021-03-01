// const fs = require('fs'); // Pull in the file system module

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  console.dir(object);
  response.write(object); // Object assumed to be a premade XML string
  response.end();
};

const getSuccess = (request, response, params, acceptedTypes) => {
  // Set the response data
  const responseContent = {
    message: 'This is a successful response',
  };
  const status = 200;

  // Return XML, if requested
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseContent.message}</message>`;
    responseXML = `${responseXML} </response>`;

    console.log(responseXML);

    return respondXML(request, response, status, responseXML);
  }

  // Return JSON
  return respondJSON(request, response, status, responseContent);
};

const getBadRequest = (request, response, params, acceptedTypes) => {
  // Set the response data
  let responseContent = {
    message: 'This request has the required parameters',
  };
  let status = 200;

  // Apply query params
  if (!params.valid || params.valid !== 'true') {
    responseContent = {
      id: 'badRequest',
      message: 'Missing valid query parameter set to true',
    };
    status = 400;
  }

  // Return XML, if requested
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    // If the error ID exists, display it
    if (responseContent.id) {
      responseXML = `${responseXML} <id>${responseContent.id}</id>`;
    }
    responseXML = `${responseXML} <message>${responseContent.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respondXML(request, response, status, responseXML);
  }

  // Return JSON
  return respondJSON(request, response, status, responseContent);
};

const getNotFound = (request, response, params, acceptedTypes) => {
  // Set the response data
  const responseContent = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  };
  const status = 501;

  // Return XML, if requested
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    // If the error ID exists, display it
    if (responseContent.id) {
      responseXML = `${responseXML} <id>${responseContent.id}</id>`;
    }
    responseXML = `${responseXML} <message>${responseContent.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respondXML(request, response, status, responseXML);
  }

  // Return JSON
  return respondJSON(request, response, status, responseContent);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getNotFound,
};
