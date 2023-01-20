import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "routes";

const server = fastify();

server.register(cors);
server.register(routes);

server
  .listen({ port: 3001, host: "192.168.0.19" })
  .then(() => console.log("Server running | PORT 3001"));
