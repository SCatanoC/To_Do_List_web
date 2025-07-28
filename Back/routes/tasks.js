// routes/tasks.js

const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Obtener todas las tareas
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ Agregar nueva tarea
router.post("/", (req, res) => {
  const { taskTitle, category } = req.body;

  if (!taskTitle || taskTitle.trim() === "") {
    return res.status(400).json({ error: "Falta el título de la tarea" });
  }

  db.query(
    "INSERT INTO tasks (taskTitle, category) VALUES (?, ?)",
    [taskTitle, category],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: result.insertId,
        taskTitle,
        complete: false,
        category,
      });
    }
  );
});

// ✅ Editar tarea (título y estado)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { taskTitle, complete } = req.body;

  if (taskTitle === undefined || complete === undefined) {
    return res
      .status(400)
      .json({ error: "Faltan campos: taskTitle o complete" });
  }

  // Actualizar fecha de completado
  db.query("UPDATE tasks SET completed_at = IF(?, NOW(), NULL) WHERE id = ?", [
    complete,
    id,
  ]);

  // Actualizar título y estado
  db.query(
    "UPDATE tasks SET taskTitle = ?, complete = ? WHERE id = ?",
    [taskTitle, complete, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Devolver tarea actualizada
      db.query("SELECT * FROM tasks WHERE id = ?", [id], (err2, results) => {
        if (err2) {
          return res.status(500).json({ error: err2.message });
        }

        res.json(results[0]);
      });
    }
  );
});

// ✅ Eliminar tarea
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id });
  });
});

module.exports = router;
