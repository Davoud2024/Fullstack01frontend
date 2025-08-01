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
