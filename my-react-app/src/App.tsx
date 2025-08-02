import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  yearPublished: number;
}

const api = axios.create({
  baseURL: 'http://localhost:5011/api', // Change to your backend URL
});

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    yearPublished: new Date().getFullYear(),
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number>(0);

  const fetchBooks = async () => {
    try {
      const response = await api.get<Book[]>('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'yearPublished' ? Number(value) : value,
    }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/books', form);
      setForm({ title: '', author: '', yearPublished: new Date().getFullYear() });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null) return;
    try {
      await api.put(`/books/${editId}`, form);
      setEditId(null);
      setForm({ title: '', author: '', yearPublished: new Date().getFullYear() });
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.delete(`/books/${deleteId}`);
      setDeleteId(0);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const startEdit = (book: Book) => {
    setEditId(book.id);
    setForm({ title: book.title, author: book.author, yearPublished: book.yearPublished });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Book Manager</h1>

      <form onSubmit={editId ? handleEdit : handleAdd}>
        <h2>{editId ? 'Edit Book' : 'Add Book'}</h2>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        <input name="yearPublished" type="number" placeholder="Year" value={form.yearPublished} onChange={handleChange} required />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <form onSubmit={handleDelete} style={{ marginTop: '1rem' }}>
        <h2>Delete Book</h2>
        <input type="number" placeholder="Book ID to delete" value={deleteId} onChange={e => setDeleteId(Number(e.target.value))} required />
        <button type="submit">Delete</button>
      </form>

      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} ({book.yearPublished})
            <button onClick={() => startEdit(book)} style={{ marginLeft: '1rem' }}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
