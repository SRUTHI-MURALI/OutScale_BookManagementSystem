import bookSchema from "../Model/bookModel.js";
import userSchema from "../Model/userModel.js";
import  sanitize  from 'mongo-sanitize';

/**************************** User Publish a Book *************************************/
const userPublishNewBook = async (req, res) => {
  try {
    const { title, summary, genre, price, image, userId, userName } = req.body;
    const user = await userSchema.findById(userId);
    if (user) {
      const newBook = await bookSchema({
        title:sanitize(title),
        summary:sanitize(summary),
        genre:sanitize(genre),
        image:sanitize(image),
        price:sanitize(price),
        authorName: sanitize(userName),
        authorDetails: userId,
      });

      newBook.save();

      if (newBook) {
        res.status(200).json({
          newBook,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User get edit Book data *************************************/
const userGetEditBook = async (req, res) => {
  try {
    const { id } = req.params;

    const findBook = await bookSchema.findById(id);

    if (findBook) {
      res.status(200).json({
        findBook,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User edit a Book *************************************/
const userEditBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, genre, price } = req.body;
    const findBook = await bookSchema.findByIdAndUpdate(
      id,
      {
        title:sanitize(title),
        summary:sanitize(summary),
        genre:sanitize(genre),
        price:sanitize(price)
      },
      { new: true }
    );
    if (findBook) {
      res.status(200).json({
        findBook,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User Publish a Book *************************************/

const userPublish = async (req, res) => {
  try {
    const { id } = req.params;

    const booksFind = await bookSchema.findById(id);

    if (!booksFind.isActive) {
      const updatedBook = await bookSchema.findByIdAndUpdate(
        id,
        { isActive: true },
        { new: true }
      );

      res.status(200).json({ updatedBook });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
/**************************** User UnPublish a Book *************************************/

const userUnpublish = async (req, res) => {
  try {
    const { id } = req.params;

    const booksFind = await bookSchema.findById(id);

    if (booksFind.isActive) {
      const updatedBook = await bookSchema.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      res.status(200).json({ updatedBook });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** all Published Books *************************************/

const allPublishedBooks = async (req, res) => {
  try {
    const allBooks = await bookSchema.find({ isActive: true });
    res.status(200).json({ allBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User's Published Books *************************************/

const userPublishedBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const booksFind = await bookSchema.find({ authorDetails: id });

    if (booksFind) {
      res.status(200).json({ booksFind });
    } else {
      res.status(500).json({ message: "no notes to display" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** Search a Book *************************************/

const handleSearch = async (req, res) => {
  try {
    const { searchItem } = req.body;

    const results = await bookSchema.find({ $text: { $search: searchItem } });
    if (results) {
      res.status(200).json({ results });
    } else {
      res.status(401).json("No results");
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

/**************************** User tag Books *************************************/

const userManageTaging = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const bookFind = await bookSchema.findById(id);
    const userFind = await userSchema.findById(userId);

    if (bookFind && userFind) {
      if (!userFind.tagged.includes(id)) {
        userFind.tagged.push(id);
        await userFind.save();
      } else {
        const index = userFind.tagged.indexOf(id);

        if (index !== -1) {
          userFind.tagged.splice(index, 1);
          await userFind.save();
        }
      }
      const taggedBooks = userFind.tagged;
      res.status(200).json({ taggedBooks });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User's Tagged Books *************************************/

const userTaggedBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const userFind = await userSchema.findById(id).populate("tagged");

    if (userFind) {
      const taggedBooks = userFind.tagged;

      res.status(200).json({ taggedBooks });
    } else {
      res.status(500).json({ message: "no notes to display" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  userPublish,
  userUnpublish,
  allPublishedBooks,
  userPublishedBooks,
  handleSearch,
  userManageTaging,
  userEditBook,
  userGetEditBook,
  userPublishNewBook,
  userTaggedBooks,
};
