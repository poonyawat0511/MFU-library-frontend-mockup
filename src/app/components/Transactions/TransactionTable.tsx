import { Transaction } from "@/app/utils/TransactionTypes";

interface TransactionTableProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

export default function TransactionTable({
  transaction,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  // Safe access with optional chaining
  const bookName = transaction.book?.name?.en || transaction.book?.name?.th;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">User</th>
            <th className="px-6 py-3 text-left">Book</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Due Date</th>
            <th className="px-6 py-3 text-left">Borrow Date</th>
            <th className="px-6 py-3 text-left">Return Date</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4">{transaction.id}</td>
            <td className="px-6 py-4">{transaction.user.username}</td>
            <td className="px-6 py-4">{bookName}</td>
            <td className="px-6 py-4 capitalize">{transaction.status}</td>
            <td className="px-6 py-4">
              {new Date(transaction.dueDate).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
              {new Date(transaction.borrowDate).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
              {transaction.returnDate
                ? new Date(transaction.returnDate).toLocaleDateString()
                : "N/A"}
            </td>
            <td className="px-6 py-4 flex space-x-2">
              <button
                onClick={() => onEdit(transaction)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(transaction.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
