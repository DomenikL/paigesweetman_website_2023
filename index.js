const express = require("express");
const app = express();

const db = require("./db").createPool();

app.use(express.static("public"));

app.get("/api/artpieces", async (req, res) => {
  const response = await db.query(
    "select id, description, filename from artpieces order by id desc"
  );
  res.json(response);
});

app.get("/api/artpiece", async (req, res) => {
  const idParam = req.query.id;
  if (idParam) {
    if (idParam.match(/^[0-9]+$/)) {
      const result = await db.query(
        "select id, description, filename from artpieces where id = ?",
        [idParam]
      );
      if (result.length > 0) {
        res.json(result[0]);
        return;
      } else {
        res.status(404).json({ message: "Art piece not found" });
      }
    } else {
      res.status(400).json({ error: "ID parameter must be numeric" });
    }
  } else {
    res.status(400).json({ error: "Missing id parameter" });
  }
});

const server = app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
