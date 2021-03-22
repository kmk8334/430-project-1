// JSON object containing tasks
const tasks = [];

// GET request
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// HEAD request - Respond only with metadata about the request
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

// GET /getTasks
const getTasks = (request, response) => {
  const responseJSON = {
    tasks,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// HEAD /getTasks
const getTasksMeta = (request, response) => {
  respondJSON(request, response, 200);
};

// POST /addTask
const addTask = (request, response, body) => {
  console.dir(body);

  const responseJSON = {
    message: 'Class, name, and time are required',
  };

  // Validate the name and age exist
  if (!body.class || !body.name || !body.time) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  console.dir(`${body.taskId} | ${body.isDone}`);

  // If the task ID already exists, update instead
  if (tasks[body.taskId]) {
    responseCode = 204;
    // Update the existing properties
    tasks[body.taskId].isDone = (body.isDone ? body.isDone : 'false');
    tasks[body.taskId].class = body.class;
    tasks[body.taskId].name = body.name;
    tasks[body.taskId].time = body.time;
    tasks[body.taskId].notes = body.notes;
  } else {
    // Create a new task at the end of the task array (assumes no deleting tasks)
    const newTaskId = tasks.length;
    tasks[newTaskId] = {
      taskId: newTaskId,
      isDone: (body.isDone ? body.isDone : 'false'),
      class: body.class,
      name: body.name,
      time: body.time,
      link: body.link,
      notes: body.notes,
    };
  }

  // A new task was created
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  // A task was updated
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
  getTasks,
  getTasksMeta,
  addTask,
  notFound,
  notFoundMeta,
};
