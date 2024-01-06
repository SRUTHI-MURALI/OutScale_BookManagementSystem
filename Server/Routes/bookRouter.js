import express from "express";
const bookRouter = express.Router();

import {userPublish,userUnpublish,allPublishedBooks,userPublishedBooks,handleSearch} from "../Controller/bookController.js"
import { userLoggedIn } from "../Middleware/userAuth.js";

/**************************** User Book Management  *************************************/
bookRouter.post("/publish",userLoggedIn, userPublish);
bookRouter.put("/unpublish/:id",userLoggedIn, userUnpublish);
bookRouter.get("/published", allPublishedBooks);
bookRouter.get("/user/:id",userLoggedIn, userPublishedBooks);

/**************************** User Search   *************************************/
bookRouter.get("/search",userLoggedIn, handleSearch);



export default bookRouter;