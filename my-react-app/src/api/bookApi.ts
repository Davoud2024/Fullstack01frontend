import axios from "axios";

export interface Book {
  id: number;
  title: string;
  author: string;
  yearPublished: number;
}

const api = axios.create({
  baseURL: "http://localhost:5011/api",
});

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>("/books");
  return response.data;
};


// src/api/bookApi.ts
export const addBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const response = await api.post<Book>('/books', book);
  return response.data;
};


export const updateBook = async (id: number, book: Omit<Book, 'id'>): Promise<void> => {
  await api.put(`/books/${id}`, book);
};


export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};

