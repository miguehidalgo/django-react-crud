import { Link } from "react-router-dom";
import { useState } from "react";



export function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

 
  return (
    <div className="flex justify-between py-3 items-center">
      <Link to="/tasks">
        <h1 className="font-bold text-5xl mb-4">LISTA DE TAREAS</h1>
      </Link>

      

      {searchResults.length > 0 && (
        <div className="absolute mt-1 bg-white shadow-lg rounded-lg w-full">
          <ul className="py-2">
            {searchResults.map((task) => (
              <li
                key={task.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <Link to={`/tasks/${task.id}`}>{task.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
       







    </div>
  );
}
