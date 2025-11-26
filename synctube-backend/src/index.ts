import 'dotenv/config';
import express, { type NextFunction, type RequestHandler } from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import router from './router.js';
import { toNodeHandler } from 'better-auth/node';
import { database } from './database.js';
import { sessionMiddleware } from './sessions/session.middleware.js';
import {type Request, type Response} from 'express';
import z, { ZodError } from 'zod';
import { zodErroToErrorDto } from 'shared';
import { createServer } from 'node:http';
import { useIo } from './rooms/rooms.socket.js';
// import { auth } from './lib/auth/auth.js';


console.log('Synctube Backend is starting...');

const app = express();


// app.all('/api/auth/{*any}', (req, res) => {
//   try {
//     return toNodeHandler(auth)(req, res);
//   } catch (error) {
//     console.error('Error in auth handler:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// app.use(bodyParser.json());
app.use(express.json());
app.use(sessionMiddleware)

app.use((req, res, next) => {
  console.log(req.url);
  next();
})

app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Synctube Backend is running.');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    
    console.log("INITIAL ERROR: ", err, err.issues)
    const error = zodErroToErrorDto(err)
    console.error("Validation error:", error.message);
    return res.status(400).json({ message: error.message });
  }

  if (err instanceof Error) {
    console.error("Error encountered:", err.message);
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ error: "Internal server error" });
})

const server = createServer(app)
useIo(server)

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});