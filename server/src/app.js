import express from "express";
import routes from "./routes/index.js";

import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

/*
=========================
Built-in Middlewares
=========================
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
=========================
API Routes
=========================
*/

app.use("/api", routes);

/*
=========================
404 Middleware
=========================
*/

app.use(notFound);

/*
=========================
Global Error Middleware
=========================
*/

app.use(errorHandler);

export default app;