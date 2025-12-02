const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const express = require("express");
const uuidV4 = require("uuid").v4;

// Task list (in-memory... 😶‍🌫️)
const tasks = [];

function log(logText) {
  const timestamp = new Date().toISOString();
  console.log(`ℹ️ \x1b[36m ${timestamp}\x1b[0m - ${logText}`);
}

// Init Express Server
const app = express();

// Add JSON support
app.use(express.json());
// Handle CORS (open bar... 🍻)
app.use(cors());

/**
 * Structure d'une tâche :
 * - id : l'ID d'une tâche, généré par l'API à la création. C'est un UUID v4
 * - title : le titre de la tâche. OBLIGATOIRE
 * - description : une description plus détaillée de la tâche. OBLIGATOIRE
 * - date : date de création de la tâche, généré par l'API à la création
 * - status : le statut de la tâche, doit être l'un parmi : ['TODO', 'DOING', 'DONE']. Généré par l'API à la création à 'TODO'.
 *
 * Exemple :
 * {
 *   "id": "7fc43ef2-5ba9-4694-95de-188579f9ca45",
 *   "title": "Lorem 2",
 *   "description": "Lorem ipsum dolor sit amet",
 *   "date": "2025-11-27",
 *   "status": "TODO"
 * }
 */

// Ping endpoint
app.get("/ping", (req, res) => {
  log("Route GET /ping called");
  res.json({
    ping: "PONG",
    timestamp: new Date().toISOString(),
  });
});

// Get all tasks
app.get("/tasks", (req, res) => {
  log("Route GET /tasks called");

  res.status(200);
  res.json(tasks);
});

// Add a task
app.post("/tasks", (req, res) => {
  const body = req.body;
  log(`Route POST /tasks called with body ${JSON.stringify(body)}`);

  if (!body.title) {
    res.status(400);
    res.json({
      reason: "Missing 'title' field",
    });
    return;
  }

  if (!body.description) {
    res.status(400);
    res.json({
      reason: "Missing 'description' field",
    });
    return;
  }

  const body2 = {
    id: uuidV4(),
    title: body.title,
    description: body.description,
    date: new Date().toISOString().substring(0, 10),
    status: "TODO",
  };

  tasks.push(body2);

  res.status(201);
  res.json(body2);
});

// Reset all tasks (need a password... 😎)
app.delete("/tasks", (req, res) => {
  log("Route DELETE /tasks called");

  // Check the password
  const password = req.query.pass;
  if (!password || password !== process.env.DELETE_SECRET) {
    res.status(404);
    res.send();
    return;
  }

  // Delete all tasks
  tasks.splice(0, tasks.length);
  res.status(200);
  res.json({
    message: "All tasks deleted",
  });
});

// Update a task
app.put("/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;
  const body = req.body;
  log(`Route PUT /tasks/${taskId} called with body ${JSON.stringify(body)}`);

  // Check mandatory fields
  if (!body.id) {
    res.status(400);
    res.json({
      reason: "Missing 'id' field",
    });
    return;
  }

  if (!body.title) {
    res.status(400);
    res.json({
      reason: "Missing 'title' field",
    });
    return;
  }

  if (!body.description) {
    res.status(400);
    res.json({
      reason: "Missing 'description' field",
    });
    return;
  }

  if (req.body.id !== taskId) {
    res.status(400);
    res.json({
      reason: "Mismatch ids between API path and body",
    });
    return;
  }

  // Try to update task (complete)
  let taskUpdated = false;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i] = body;
      taskUpdated = true;
    }
  }

  // Check if a task was updated
  if (!taskUpdated) {
    res.status(400);
    res.json({
      reason: "Unknown id",
    });
    return;
  }

  res.status(200);
  res.json({
    message: "Task updated",
  });
});

// Patch a task
app.patch("/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;
  const body = req.body;
  log(`Route PATCH /tasks/${taskId} called with body ${JSON.stringify(body)}`);

  // Try to update task (patch)
  let taskUpdated = false;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i] = {
        ...tasks[i],
        ...body,
      };
      taskUpdated = true;
    }
  }

  // Check if a task was updated
  if (!taskUpdated) {
    res.status(400);
    res.json({
      reason: "Unknown id",
    });
    return;
  }

  res.status(200);
  res.json({
    message: "Task patched",
  });
});

// Default 404
app.use((req, res) => {
  res.status(404);
  res.send();
});

// Launch Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
