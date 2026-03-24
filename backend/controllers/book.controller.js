const Read = require("../models/read.model");

const searchBooks = async (req, res) => {
  try {
    const { userId } = req.user;
    const { q } = req.query;
    if (!q) {
      return res.status(200).json({ success: true, data: [] });
    }
    const trimmed = q.trim();

    const data =
      await fetch(`https://www.googleapis.com/books/v1/volumes?q=${trimmed}
&maxResults=10
&orderBy=relevance
&printType=books
&fields=items(
  id,
  volumeInfo/title,
  volumeInfo/authors,
  volumeInfo/imageLinks/thumbnail,
  volumeInfo/pageCount,
  volumeInfo/infoLink,
  volumeInfo/previewLink
)
&key=${process.env.GOOGLE_BOOKS_API_KEY}`);

    const jsonData = await data.json();

    let formattedData = [];
    if (jsonData.items) {
      formattedData = jsonData.items.map((book, idx) => {
        const id = book.id || idx;
        let title = "Unknown Title";
        if (book.volumeInfo && book.volumeInfo.title) {
          title = book.volumeInfo.title;
        }

        let authors = ["Unknown Author"];
        if (book.volumeInfo && book.volumeInfo.authors) {
          authors = book.volumeInfo.authors;
        }

        let cover = "";
        if (
          book.volumeInfo &&
          book.volumeInfo.imageLinks &&
          book.volumeInfo.imageLinks.thumbnail
        ) {
          cover = book.volumeInfo.imageLinks.thumbnail;
        }

        let pages = null;
        if (book.volumeInfo && book.volumeInfo.pageCount) {
          pages = book.volumeInfo.pageCount;
        }

        let link = null;
        if (book.volumeInfo && book.volumeInfo.infoLink) {
          link = book.volumeInfo.infoLink;
        }

        let status = "not added";

        return { id, title, authors, cover, pages, link };
      });
    }

    const books = await Read.find({ user: userId })
      .select("bookId status")
      .lean();

    const addedBooks = new Map(books.map((book) => [book.bookId, book.status]));

    formattedData.forEach((book) => {
      const bookId = book.id;
      book.status = addedBooks.has(bookId)
        ? addedBooks.get(bookId)
        : "not added";
    });

    return res.status(200).json({ success: true, data: formattedData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while fetching books.",
    });
  }
};

module.exports = { searchBooks };
