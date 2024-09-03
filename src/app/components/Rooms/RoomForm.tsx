// src/components/Rooms/RoomForm.tsx
import React, { useState, useEffect } from "react";
import { Room } from "../Types/RoomTypes";

interface RoomFormProps {
  room: Room | null;
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ room, onSubmit, onClose }) => {
  const [roomNumber, setRoomNumber] = useState<number | "">(room?.room || "");
  const [floor, setFloor] = useState<number | "">(room?.floor || "");
  const [status, setStatus] = useState<string>(room?.status || "");
  const [type, setType] = useState<string>(room?.type.id || "");

  useEffect(() => {
    if (room) {
      setRoomNumber(room.room);
      setFloor(room.floor);
      setStatus(room.status);
      setType(room.type.id);
    }
  }, [room]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", room?.id || "");
    formData.append("room", String(roomNumber));
    formData.append("floor", String(floor));
    formData.append("status", status);
    formData.append("type", type);
    onSubmit(formData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {room ? "Edit Room" : "Create Room"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Room Number
            </label>
            <input
              type="number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(Number(e.target.value))}
              className="border px-3 py-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Floor</label>
            <input
              type="number"
              value={floor}
              onChange={(e) => setFloor(Number(e.target.value))}
              className="border px-3 py-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Status</label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border px-3 py-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Type ID</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border px-3 py-2 w-full rounded"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;
