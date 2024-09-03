"use client";

import { useEffect, useState } from "react";
import CategoryCard from "../components/Categories/CategoryCard";
import CategoryForm from "../components/Categories/CategoryForm";
import { Category } from "../components/Types/CategoryTypes";

const apiUrl = "http://localhost:8082/api/book-categories";

async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  const handleCreate = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (book: Category) => {
    setEditingCategory(book);
    setIsFormOpen(true);
  };

  const handleDelete = async (categoryId: string) => {
    if (confirm("Are you sure you want to delete this Category?")) {
      try {
        await fetch(`${apiUrl}/${categoryId}`, { method: "DELETE" });
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      // Check if data.id is set
      const isUpdate = !!data.id; // Convert data.id to boolean to check if it's present
      const method = isUpdate ? "PATCH" : "POST";
      const url = isUpdate ? `${apiUrl}/${data.id}` : apiUrl;

      console.log(`Sending ${method} request to ${url}`); // Debug log to check URL

      // Ensure correct data object
      console.log("Form data being submitted:", data);

      // Perform the fetch request
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Parse the response
        const result = await response.json();

        // Update the category list based on whether it was a create or update operation
        if (isUpdate) {
          // Update existing category
          setCategories(
            categories.map((c) => (c.id === result.data.id ? result.data : c))
          );
        } else {
          // Add new category
          setCategories([...categories, result.data]);
        }

        // Close the form
        setIsFormOpen(false);
      } else {
        // Handle errors
        const errorText = await response.text();
        console.error(`Failed to submit category: ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to submit category:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Book
      </button>
      <div className="flex flex-wrap justify-start">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {isFormOpen && (
        <CategoryForm
          category={editingCategory}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
