import React, { useEffect, useState } from "react";
import { Category } from "../Types/CategoryTypes";

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function CategoryForm({
  category,
  onSubmit,
  onClose,
}: CategoryFormProps) {
  const [nameTh, setNameTh] = useState<string>("");
  const [nameEn, setNameEn] = useState<string>("");

  useEffect(() => {
    if (category) {
      setNameTh(category.name.th);
      setNameEn(category.name.en);
    }
  }, [category]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameObject = {
      th: nameTh,
      en: nameEn,
    };

    const data = {
      name: nameObject,
      id: category?.id,
    };

    // Send the data as JSON if your backend expects JSON
    try {
      const response = await fetch(
        "http://localhost:8082/api/book-categories",
        {
          method: category ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        onSubmit(result.data);
        onClose();
      } else {
        console.error("Failed to submit category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {category ? "Edit Category" : "Create Category"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name (TH)
            </label>
            <input
              type="text"
              value={nameTh}
              onChange={(e) => setNameTh(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name (EN)
            </label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {category ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
