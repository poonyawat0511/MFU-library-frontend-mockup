import { Book } from "../Types/BookTypes";
import { User } from "./UserTypes";

export interface Transaction {
  id: string;
  user: User;
  book: Book;
  status: string;
  dueDate: string;
  borrowDate: string;
  returnDate?: string;
}
