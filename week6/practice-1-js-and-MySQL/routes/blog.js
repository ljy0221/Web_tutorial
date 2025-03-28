const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = `
    select posts.*, authors.name as author_name from posts inner join authors on posts.author_id = authors.id
    `;
  const [posts] = await db.query(query);
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("select * from authors");

  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "insert into posts (title, summary, body, author_id) values (?)",
    [data]
  );

  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  const postId = req.params.id;

  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
    INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ?
  `;
  const [posts] = await db.query(query, [postId]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString("kr-KO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async function (req, res) {
  const query = `
        select * from posts where id = ?
    `;
  const [posts] = await db.query(query, [req.params.id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }
  res.render("update-post", { post: posts[0] });
});

router.post("/posts/:id/edit", async function (req, res) {
  await db.query(
    "update posts set title = ?, summary = ?, body = ? where id = ?",
    [req.body.title, req.body.summary, req.body.content, req.params.id]
  );

  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  await db.query("delete from posts where id = ?", [req.params.id]);

  res.redirect("/posts");
});

module.exports = router;
