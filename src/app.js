const http = require("http");
const getUsers = require("./modules/users");

const port = 3003;

const server = http.createServer((request, response) => {
  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello");
  if (userName) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write(`Hello, ${userName}.`);
    response.end();
    return;
  }

  if (request.url === "/users") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  } else if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type:text/plain";
    response.write("Hello,World!");
    response.end();
    return;
  } else if (request.url === "/?hello") {
    response.statusCode = 400;
    response.statusMessage = "Bad Request";
    response.header = "Content-Type:text/plain";
    response.write("Enter a name");
    response.end();
    return;
  } else {
    response.statusCode = 500;
    response.statusMessage = "Server error";
    response.header = "Content-Type:text/plain";
    response.write("");
    response.end();
    return;
  }
});

server.listen(port, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${port} `);
});
