import express from "express";
const bookRouter = express.Router();

import {
  userPublish,
  userUnpublish,
  allPublishedBooks,
  userPublishedBooks,
  handleSearch,
  userManageTaging,
  userEditBook,
  userPublishNewBook,
  userGetEditBook,
  userTaggedBooks,
} from "../Controller/bookController.js";
import { userLoggedIn } from "../Middleware/userAuth.js";

/**************************** User Book Publish  *************************************/
bookRouter.post("/publishnewbook", userLoggedIn, userPublishNewBook);
bookRouter.put("/publish/:id", userLoggedIn, userPublish);
bookRouter.put("/unpublish/:id", userLoggedIn, userUnpublish);

/**************************** User Book Edit  *************************************/
bookRouter.get("/geteditbook/:id", userLoggedIn, userGetEditBook);
bookRouter.put("/editbooks/:id", userLoggedIn, userEditBook);

/**************************** User Book view  *************************************/
bookRouter.get("/published", allPublishedBooks);
bookRouter.get("/user/:id", userLoggedIn, userPublishedBooks);

/**************************** User Search   *************************************/
bookRouter.post("/search", userLoggedIn, handleSearch);

/**************************** User Tag note   *************************************/
bookRouter.put("/managetags/:id", userLoggedIn, userManageTaging);

/**************************** User tagged notes page   *************************************/
bookRouter.get("/getTaggedBooks/:id", userLoggedIn, userTaggedBooks);

export default bookRouter;
