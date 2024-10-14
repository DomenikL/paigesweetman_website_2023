const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

const db = require("./db").createPool();

app.use(cookieParser());

app.use(express.static("public"));

app.get("/api/artpieces", async (req, res) => {
  const response = await db.query(
    "select id, description, filename from artpieces order by id desc"
  );
  res.json(response);
});

app.get("/api/artpiece", async (req, res) => {
  let uuid = req.cookies.userid;
  if (!uuid) {
    uuid = uuidv4();
    res.cookie("userid", uuid);
  }
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

app.get("/api/likes", async (req, res) => {
  let uuid = req.cookies.userid;
  if (!uuid) {
    uuid = uuidv4();
    res.cookie("userid", uuid);
  }
  const idParam = req.query.id;
  if (idParam) {
    if (idParam.match(/^[0-9]+$/)) {
      const totalcountresult = await db.query(
        "select count(*) as like_count from likes where artpiece_id = ?",
        [idParam]
      );
      const usercountresult = await db.query(
        "select count(*) as like_count from likes where artpiece_id = ? and user_id = ?",
        [idParam, uuid]
      );
      res.json({
        like_count: totalcountresult[0].like_count,
        user_like: usercountresult[0].like_count,
      });
      return;
    } else {
      res.status(400).json({ error: "ID parameter must be numeric" });
    }
  } else {
    res.status(400).json({ error: "Missing id parameter" });
  }
});

app.put("/api/likes", async (req, res) => {
  let uuid = req.cookies.userid;
  if (!uuid) {
    uuid = uuidv4();
    res.cookie("userid", uuid);
  }
  const idParam = req.query.id;
  if (idParam) {
    if (idParam.match(/^[0-9]+$/)) {
      const usercountresult = await db.query(
        "select count(*) as like_count from likes where artpiece_id = ? and user_id = ?",
        [idParam, uuid]
      );
      if (usercountresult[0].like_count === 0) {
        await db.query(
          "insert into likes (artpiece_id, user_id) values (?, ?)",
          [idParam, uuid]
        );
      }
      res.send();
      return;
    } else {
      res.status(400).json({ error: "ID parameter must be numeric" });
    }
  } else {
    res.status(400).json({ error: "Missing id parameter" });
  }
});

app.delete("/api/likes", async (req, res) => {
  let uuid = req.cookies.userid;
  if (!uuid) {
    uuid = uuidv4();
    res.cookie("userid", uuid);
  }
  const idParam = req.query.id;
  if (idParam) {
    if (idParam.match(/^[0-9]+$/)) {
      const usercountresult = await db.query(
        "select count(*) as like_count from likes where artpiece_id = ? and user_id = ?",
        [idParam, uuid]
      );
      if (usercountresult[0].like_count === 1) {
        await db.query(
          "delete from likes where artpiece_id = ? and user_id = ?",
          [idParam, uuid]
        );
      }
      res.send();
      return;
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
