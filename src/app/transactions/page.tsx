"use client";
import { useEffect, useState } from "react";
import TransactionTable from "../components/Transactions/TransactionTable";
import { Transaction } from "../components/Types/TransactionTypes";

const apiUrl = "http://localhost:8082/api/transactions";

async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsFormVisible(true);
  };

  const handleDelete = async (transactionId: string) => {
    try {
      await fetch(`${apiUrl}/${transactionId}`, {
        method: "DELETE",
      });
      setTransactions(transactions.filter((t) => t.id !== transactionId));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const handleSave = async (transaction: Transaction) => {
    try {
      if (transaction.id) {
        // Update existing transaction
        await fetch(`${apiUrl}/${transaction.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transaction),
        });
        setTransactions(
          transactions.map((t) => (t.id === transaction.id ? transaction : t))
        );
      } else {
        // Create new transaction
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transaction),
        });
        const newTransaction = await response.json();
        setTransactions([...transactions, newTransaction]);
      }
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
    setIsFormVisible(false);
    setSelectedTransaction(null);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setSelectedTransaction(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row">
      <div className="text-right mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => {
            setSelectedTransaction(null);
            setIsFormVisible(true);
          }}
        >
          Create New Transaction
        </button>
      </div>
      <TransactionTable
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
