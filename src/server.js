const app = require("./app");
const { port } = require("./secret");

app;

app.listen(port,() => {
  console.log(`Example  app listening on port  ${port}`);
});
