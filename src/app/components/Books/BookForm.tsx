import { useEffect, useState } from "react";
import { Book, Category, LanguageString } from "./BookTypes";

interface BookFormProps {
  book?: Book | null;
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
}

export default function BookForm({ book, onSubmit, onClose }: BookFormProps) {
  const [name, setName] = useState<LanguageString>({
    en: book?.name?.en || "",
    th: book?.name?.th || "",
  });
  const [description, setDescription] = useState<LanguageString>({
    en: book?.description?.en || "",
    th: book?.description?.th || "",
  });
  const [bookImage, setBookImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    book?.bookImage || null
  );
  const [category, setCategory] = useState<string>(book?.category?.id || "");
  const [status, setStatus] = useState<string>(book?.status || "ready");
  const [quantity, setQuantity] = useState<number>(book?.quantity || 1);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "http://localhost:8082/api/book-categories"
        );
        const result = await response.json();
        console.log("Fetched categories:", result.data);
        setCategories(result.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (book) {
      setName({
        en: book.name?.en || "",
        th: book.name?.th || "",
      });
      setDescription({
        en: book.description?.en || "",
        th: book.description?.th || "",
      });
      setImagePreview(book.bookImage || null);
      setCategory(book.category?.id || "");
      setStatus(book.status || "ready");
      setQuantity(book.quantity || 1);
    }
  }, [book]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBookImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected category ID:", e.target.value);
    setCategory(e.target.value);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (book?.id) {
      formData.append("id", book.id);
    }

    formData.append("name[th]", name.th);
    formData.append("name[en]", name.en);
    formData.append("description[th]", description.th);
    formData.append("description[en]", description.en);

    console.log("Selected category ID:", category);
    console.log("Available categories:", categories);

    const selectedCategory = categories.find((cat) => cat.id === category);
    if (selectedCategory) {
      formData.append("category", category);
    } else {
      alert("Invalid category selected");
      return;
    }

    if (["ready", "not ready"].includes(status)) {
      formData.append("status", status);
    } else {
      alert("Invalid status value");
      return;
    }

    formData.append("quantity", quantity.toString());

    if (bookImage) {
      formData.append("bookImage", bookImage);
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl mb-4">{book ? "Edit Book" : "Create Book"}</h2>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Book preview"
              className="w-full h-40 object-cover"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Name (EN)"
          value={name.en}
          onChange={(e) => setName({ ...name, en: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Name (TH)"
          value={name.th}
          onChange={(e) => setName({ ...name, th: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Description (EN)"
          value={description.en}
          onChange={(e) =>
            setDescription({ ...description, en: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Description (TH)"
          value={description.th}
          onChange={(e) =>
            setDescription({ ...description, th: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border p-2 mb-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name.en}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="ready">Ready</option>
          <option value="not ready">Not Ready</option>
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 mb-2 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
