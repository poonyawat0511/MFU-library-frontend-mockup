import { Transaction } from "./TransactionTypes";

interface TransactionProps {
  transactions: Transaction[]; // Add this prop to receive a list of transactions
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: TransactionProps) {
  return (
    <div className="column">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Transaction ID</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Book</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Due Date</th>
            <th className="py-2 px-4 border-b">Borrow Date</th>
            <th className="py-2 px-4 border-b">Return Date</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="py-2 px-4 border-b text-center">
                {transaction.id}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {transaction.user?.username || "Unknown User"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {transaction.book?.name.en || "N/A"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {transaction.status}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {new Date(transaction.dueDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {new Date(transaction.borrowDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {transaction.returnDate
                  ? new Date(transaction.returnDate).toLocaleDateString()
                  : "Not Returned"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <div>
                  <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded mb-2"
                    onClick={() => onEdit(transaction)}
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => onDelete(transaction.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
