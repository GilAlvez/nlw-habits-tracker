import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const server = fastify();
server.register(cors);

server.get("/", (req, res) => {
  return "Hello world";
});

server.listen({ port: 3002 }).then(() => console.log("Server running..."));
