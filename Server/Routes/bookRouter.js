import express from "express";
const bookRouter = express.Router();

import {userPublish,userUnpublish,allPublishedBooks,userPublishedBooks,handleSearch,userManageTaging,userEditBook,userGetEditBook} from "../Controller/bookController.js"
import { userLoggedIn } from "../Middleware/userAuth.js";

/**************************** User Book Management  *************************************/
bookRouter.post("/publish",userLoggedIn, userPublish);
bookRouter.get("/geteditbook/:id",userLoggedIn, userGetEditBook);
bookRouter.put("/editbooks/:id",userLoggedIn, userEditBook);
bookRouter.put("/unpublish/:id",userLoggedIn, userUnpublish);
bookRouter.get("/published", allPublishedBooks);
bookRouter.get("/user/:id",userLoggedIn, userPublishedBooks);

/**************************** User Search   *************************************/
bookRouter.get("/search",userLoggedIn, handleSearch);

/**************************** User Tag note   *************************************/
bookRouter.put("/managetags/:id", userLoggedIn, userManageTaging);


/**************************** User tagged notes page   *************************************/
// bookRouter.get("/getTaggedBooks/:id", userLoggedIn, userTaggedBooks);


export default bookRouter;