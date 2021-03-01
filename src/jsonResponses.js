// thanos snaps every time the server crashes (this is only in memory)
const users = {};

// GET request
const respondJSON = (request, response, status, object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

// HEAD request - Respond only with metadata about the request
const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
};

// GET /getUsers
const getUsers = (request, response) => {
    const responseJSON = {
        users,
    };

    return respondJSON(request, response, 200, responseJSON);
};

// HEAD /getUsers
const getUsersMeta = (request, response) => respondJSON(request, response, 200);

const addUser = (request, response, body) => {
    console.dir(body);

    const responseJSON = {
        message: 'Name and age are both required',
    };

    // Validate the name and age exist
    if(!body.name || !body.age) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 201;

    if(users[body.name]) {
        // User already exists
        responseCode = 204;
    } else {
        // User does not exist
        users[body.name] = {};
        users[body.name].name = body.name;
    }

    users[body.name].age = body.age;

    // A new user was created
    if(responseCode === 201) {
        responseJSON.message = 'Created Successfully';
        return respondJSON(request, response, responseCode, responseJSON);
    }

    // A user was updated
    responseJSON.message = 'Updated Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
};

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are not looking for was not found!',
        id: 'notFound',
    };

    return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
    getUsers,
    getUsersMeta,
    addUser,
    notFound,
    notFoundMeta,
};

// const respondXML = (request, response, status, object) => {
//   response.writeHead(status, { 'Content-Type': 'text/xml' });
//   console.dir(object);
//   response.write(object); // Object assumed to be a premade XML string
//   response.end();
// };

// const getSuccess = (request, response, params, acceptedTypes) => {
//   console.dir(request);
//   // Set the response data
//   const responseContent = {
//     message: 'This is a successful response',
//   };
//   const status = 200;

//   // Return JSON
//   return respondJSON(request, response, status, responseContent);
// };

// const getUsers = (request, response, params, acceptedTypes) => {
//     // Set the response data
//     console.dir(request);
//     const responseContent = {
//       message: 'This is a successful response',
//     };
//     const status = 200;

//     // Return JSON
//     return respondJSON(request, response, status, responseContent);
//   };

// const createUser = (request, response, params, acceptedTypes) => {
//     // Set the response data
//     const responseContent = {
//       message: 'Created Successfully',
//     };
//     const status = 201;

//     // Return JSON
//     return respondJSON(request, response, status, responseContent);
//   };

// const getBadRequest = (request, response, params, acceptedTypes) => {
//   // Set the response data
//   let responseContent = {
//     message: 'This request has the required parameters',
//   };
//   let status = 200;

//   // Apply query params
//   if (!params.valid || params.valid !== 'true') {
//     responseContent = {
//       id: 'badRequest',
//       message: 'Missing valid query parameter set to true',
//     };
//     status = 400;
//   }

//   // Return JSON
//   return respondJSON(request, response, status, responseContent);
// };

// const getNotFound = (request, response, params, acceptedTypes) => {
//   // Set the response data
//   const responseContent = {
//     id: 'notFound',
//     message: 'The page you are looking for was not found.',
//   };
//   const status = 404;

//   // Return JSON
//   return respondJSON(request, response, status, responseContent);
// };

// module.exports = {
//   getSuccess,
//   createUser,
//   getBadRequest,
//   getNotFound,
// };
