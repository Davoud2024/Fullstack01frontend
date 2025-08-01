import React, { useEffect, useState } from 'react';
import { fetchBooks, type Book } from '../api/bookApi';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} ({book.yearPublished})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
