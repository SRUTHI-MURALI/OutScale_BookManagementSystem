import express from "express";
const bookRouter = express.Router();

import {userPublish,userUnpublish,allPublishedBooks,userPublishedBooks,handleSearch} from "../Controller/bookManagement.js"

/**************************** User Book Management  *************************************/
bookRouter.post("/publish", userPublish);
bookRouter.put("/unpublish/:id", userUnpublish);
bookRouter.get("/published", allPublishedBooks);
bookRouter.get("/user", userPublishedBooks);

/**************************** User Search   *************************************/
bookRouter.get("/search", handleSearch);



export default bookRouter;