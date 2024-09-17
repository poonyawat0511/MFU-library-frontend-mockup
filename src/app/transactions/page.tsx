"use client";

import { useEffect, useState } from "react";
import TransactionForm from "../components/Transactions/TransactionForm";
import TransactionTable from "../components/Transactions/TransactionTable";
import { Book } from "../utils/BookTypes";
import { Transaction } from "../utils/TransactionTypes";
import { User } from "../utils/UserTypes";

const apiUrl = `http://localhost:8082/api/transactions`;
const apiBookUrl = `http://localhost:8082/api/books`;
const apiUserUrl = `http://localhost:8082/api/users`;

async function fetchTransaction(): Promise<Transaction[]> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch(apiBookUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(apiUserUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTransactions = await fetchTransaction();
      const fetchedBooks = await fetchBooks();
      const fetchedUsers = await fetchUsers();
      setTransactions(fetchedTransactions);
      setBooks(fetchedBooks);
      setUsers(fetchedUsers);
    };

    fetchData();
  }, []);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowForm(true);
  };

  const handleDelete = async (transactionId: string) => {
    try {
      const response = await fetch(`${apiUrl}/${transactionId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      setTransactions(transactions.filter((t) => t.id !== transactionId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (formData: Transaction) => {
    try {
      const method = formData.id ? "PATCH" : "POST";
      const url = apiUrl + (formData.id ? `/${formData.id}` : "");

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${method === "POST" ? "create" : "update"} transaction`
        );
      }

      const result = await response.json();
      if (method === "POST") {
        setTransactions([...transactions, result.data]);
      } else {
        setTransactions(
          transactions.map((t) => (t.id === result.data.id ? result.data : t))
        );
      }
      setShowForm(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Transactions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        >
          Create New Transaction
        </button>
        {showForm && (
          <TransactionForm
            transaction={selectedTransaction}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
            books={books}
            users={users}
          />
        )}
        <div className="flex flex-wrap gap-6">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionTable
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">
              No transactions available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
