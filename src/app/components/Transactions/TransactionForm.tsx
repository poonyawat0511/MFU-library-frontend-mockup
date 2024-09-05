import { Book } from "@/app/utils/BookTypes";
import { Transaction } from "@/app/utils/TransactionTypes";
import { User } from "@/app/utils/UserTypes";
import { useEffect, useState } from "react";

interface TransactionFormProps {
  transaction?: Transaction | null;
  onSubmit: (formData: Transaction) => void;
  onClose: () => void;
}

export default function TransactionForm({
  transaction,
  onSubmit,
  onClose,
}: TransactionFormProps) {
  const [userId, setUserId] = useState<string>(transaction?.user?.id || "");
  const [bookId, setBookId] = useState<string>(transaction?.book.id || "");
  const [status, setStatus] = useState<string>(transaction?.status || "borrow");
  const [dueDate, setDueDate] = useState<string>(transaction?.dueDate || "");
  const [borrowDate, setBorrowDate] = useState<string>(
    transaction?.borrowDate || ""
  );
  const [returnDate, setReturnDate] = useState<string>(
    transaction?.returnDate || ""
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("http://localhost:8082/api/books");
        const result = await response.json();
        if (result && result.data) {
          setBooks(result.data);
        } else {
          console.error("Books data not found in response");
        }
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/users/");
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Users data not found in response");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (transaction) {
      setUserId(transaction.user?.id || "");
      setBookId(transaction.book?.id || "");
      setStatus(transaction.status || "borrow");
      setDueDate(transaction.dueDate || "");
      setBorrowDate(transaction.borrowDate || "");
      setReturnDate(transaction.returnDate || "");
    }
  }, [transaction]);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleBookIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookId(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleBorrowDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorrowDate(e.target.value);
  };

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      user: userId,
      book: bookId,
      status: status,
      dueDate: dueDate,
      borrowDate: borrowDate,
      returnDate: returnDate || null,
    };

    try {
      const url = transaction
        ? `http://localhost:8082/api/transactions/${transaction.id}`
        : "http://localhost:8082/api/transactions";

      const method = transaction ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        onSubmit(result.data);
      } else {
        console.error("Failed to submit form:", result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {transaction ? "Edit Transaction" : "New Transaction"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              User ID:
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter User ID"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="bookId"
              className="block text-sm font-medium text-gray-700"
            >
              Book ID:
            </label>
            <input
              id="bookId"
              type="text"
              value={bookId}
              onChange={handleBookIdChange}
              placeholder="Enter Book ID"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={handleStatusChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="borrow">Borrow</option>
              <option value="return">Return</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={handleDueDateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="borrowDate"
              className="block text-sm font-medium text-gray-700"
            >
              Borrow Date:
            </label>
            <input
              type="date"
              id="borrowDate"
              value={borrowDate}
              onChange={handleBorrowDateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="returnDate"
              className="block text-sm font-medium text-gray-700"
            >
              Return Date:
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={handleReturnDateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
