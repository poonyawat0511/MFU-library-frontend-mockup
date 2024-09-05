import { Category, LanguageString } from "./CategoryTypes";

export interface Book {
  id: string;
  name: LanguageString;
  description: LanguageString;
  bookImage: string;
  category: Category;
  status: string;
  quantity: number;
}
