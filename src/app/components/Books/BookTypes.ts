export interface LanguageString {
  th: string;
  en: string;
}

export interface Category {
  id: string;
  name: LanguageString;
}

export interface Book {
  id: string;
  name: LanguageString;
  description: LanguageString;
  bookImage: string;
  category: Category;
  status: string;
  quantity: number;
}
