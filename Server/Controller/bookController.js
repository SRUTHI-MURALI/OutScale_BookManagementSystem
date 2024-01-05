import bookSchema from '../Model/bookModel.js'
import userSchema from '../Model/userModel.js'

/**************************** User Publish a Book *************************************/
const userPublish=async (req,res)=>{
  
    try {
        const { title, summary, genre, image, userId } = req.body;
        const user = await userSchema.findById(userId);
        if (user) {
          const newBook = await bookSchema({
            title,
            summary,
            genre,
            image,
            author: userId,
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
}


/**************************** User UnPublish a Book *************************************/

const userUnpublish=async(req,res)=>{
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
        } else {
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
}

/**************************** all Published Books *************************************/

const allPublishedBooks=async (req,res)=>{
  
    try {
       const allBooks= await bookSchema.find()
       res.status(200).json({allBooks}) 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/**************************** User's Published Books *************************************/

const userPublishedBooks=async (req,res)=>{
    try {
        const { id } = req.params;
    
        const booksFind = await bookSchema.find({ author: id });
    
        if (booksFind) {
          res.status(200).json({ booksFind });
        } else {
          res.status(500).json({ message: "no notes to display" });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
}

/**************************** Search a Book *************************************/

const handleSearch=async(req,res)=>{
    
  try {
    const { searchItem } = req.body;

    const results = await bookSchema.find({ $text: { $search: searchItem } });

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
}

export {userPublish,userUnpublish,allPublishedBooks,userPublishedBooks,handleSearch}