import http from "http";

const port = Number(process.env.PORT || 5000);

const request = http.get(
  {
    host: "127.0.0.1",
    port,
    path: "/health",
    timeout: 4000,
  },
  (response) => {
    if (response.statusCode === 200) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  },
);

request.on("timeout", () => {
  request.destroy();
  process.exit(1);
});

request.on("error", () => {
  process.exit(1);
});
