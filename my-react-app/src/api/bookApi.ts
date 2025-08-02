import axios from "axios";

// Define an Interface for the Book object
export interface Book {
  id: number;
  title: string;
  author: string;
  yearPublished: number;
}

// define base URL for the API
// This should match the backend API endpoint
const api = axios.create({
  baseURL: "http://localhost:5011/api",
});

// define a fetch function to get all books
// This function will return a Promise that resolves to an array of Book objects
export const fetchBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>("/books");
  return response.data;
};

// define a fetch function to get a book by ID
export const addBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const response = await api.post<Book>("/books", book);
  return response.data;
};

//define a function to edit a book by ID
export const updateBook = async (
  id: number,
  book: Omit<Book, "id">
): Promise<void> => {
  await api.put(`/books/${id}`, book);
};

// define a function to delete a book by ID
// This function will return a Promise that resolves to void
export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};
