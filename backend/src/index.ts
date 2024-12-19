import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import reservationsRoutes from "./routes/reservations/reservationsRoutes";
import timeslotsRoutes from "./routes/timeslots/timeslotsRoutes";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(cors());

server.use('/reservations', reservationsRoutes);
server.use('/timeslots', timeslotsRoutes);

server.get("/favicon.ico", (_, res) => res.status(204));

// handle invalid route
server.use(function(_req, res, _next) {
  res.status(404).json({ error: "Not found" });
});

// handle server error
server.use(function(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

server.listen(process.env.BACKEND_PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.BACKEND_PORT || 3000}`);
})

module.exports = server;

