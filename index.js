const { json } = require("express");
const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
  res.redirect(`https://discord.gg/3SEYN526PS`);
});
app.get("/api/signin/:provider", (req, res) => {
  if (!fs.existsSync(`./providers/${req.params.provider}.js`))
    return res.json({ success: false, error: "Provider does not exist" });
  res.json({
    success: true,
    ...require(`./providers/${req.params.provider}.js`),
  });
});
app.get("/api/lookup/:provider", (req, res) => {
  if (!req.query.q) return res.json("Please provide a search query.");
  if (!fs.existsSync(`./providers/${req.params.provider}.js`))
    return res.json({ success: false, error: "Provider does not exist." });
  if (!require(`./providers/${req.params.provider}.js`).lookup)
    return res.json({ success: false, error: "Provider does not exist." });
  res.json({
    success: true,
    results: require(`./providers/${req.params.provider}.js`).lookup(
      req.query.q
    ),
  });
});
app.post("/api/signin/:provider", async (req, res) => {
  if (fs.existsSync(`./providers/${req.params.provider}.js`)) {
    try {
      await require(`./providers/${req.params.provider}.js`).login(req, res);
    } catch (e) {
      console.error(e);
      res.json({
        success: false,
        error:
          "An error occured while logging in. Did you give the right credentals?",
      });
    }
  } else {
    res.json({ success: false, error: "Provider does not exist." });
  }
});
const listener = app.listen(process.env.PORT || 8080, function () {
  console.log("StudentSSO is listening on port " + listener.address().port + " :)");
});
