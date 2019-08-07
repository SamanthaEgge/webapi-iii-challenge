// code away!

const server = require("./server.js");

const port = 8000;
const greeting = "Hi, Samantha!";
server.listen(port, () => {
  console.log(
    `\n*** ${greeting} Server Running on http://localhost:${port} ***\n`
  );
});