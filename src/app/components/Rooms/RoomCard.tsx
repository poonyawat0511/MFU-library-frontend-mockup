import React from "react";
import { Room } from "../Types/RoomTypes";

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onEdit, onDelete }) => {
  const roomTypeName = room.type?.name?.en || "Unknown Type";

  return (
    <div className="border p-4 m-2 rounded">
      <h2 className="text-xl font-bold">Room {room.room}</h2>
      <p>Floor: {room.floor}</p>
      <p>Status: {room.status}</p>
      <p>Type: {roomTypeName}</p>
      <button
        onClick={() => onEdit(room)}
        className="bg-yellow-500 text-white px-2 py-1 rounded mt-2 mr-2"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(room.id)}
        className="bg-red-500 text-white px-2 py-1 rounded mt-2"
      >
        Delete
      </button>
    </div>
  );
};

export default RoomCard;
