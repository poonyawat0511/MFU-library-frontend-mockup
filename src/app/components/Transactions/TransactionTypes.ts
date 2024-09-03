import { Book } from "../Books/BookTypes";
import { User } from "../Users/UserTypes";

export interface Transaction {
  id: string;
  user: User;
  book: Book;
  status: string;
  dueDate: string;
  borrowDate: string;
  returnDate?: string;
}
