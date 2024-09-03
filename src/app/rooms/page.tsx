"use client";
import React, { useEffect, useState } from "react";
import RoomCard from "../components/Rooms/RoomCard";
import RoomForm from "../components/Rooms/RoomForm";
import { Room } from "../components/Types/RoomTypes";

const RoomPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch("http://localhost:8082/api/rooms");
        const result = await response.json();
        setRooms(result.data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    }
    fetchRooms();
  }, []);

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setIsFormOpen(true);
  };

  const handleDelete = async (roomId: string) => {
    if (confirm("Are you sure you want to delete this room?")) {
      try {
        await fetch(`http://localhost:8082/api/rooms/${roomId}`, {
          method: "DELETE",
        });
        setRooms(rooms.filter((room) => room.id !== roomId));
      } catch (error) {
        console.error("Failed to delete room:", error);
      }
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const id = formData.get("id") as string;
      const method = id ? "PATCH" : "POST";
      const url = id
        ? `http://localhost:8082/api/rooms/${id}`
        : "http://localhost:8082/api/rooms";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (id) {
          setRooms(
            rooms.map((r) => (r.id === result.data.id ? result.data : r))
          );
        } else {
          setRooms([...rooms, result.data]);
        }
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Failed to submit room:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditingRoom(null);
          setIsFormOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Room
      </button>
      <div className="flex flex-wrap justify-start">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {isFormOpen && (
        <RoomForm
          room={editingRoom}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default RoomPage;
