import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";

export function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    loadTasks();
  }, []);

  
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    
    <div className="container mx-auto ">
      
      <input
        type="text"
        className="  p-4  bg-gray-50 border border-gray-300
         text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500
         block w-full p-2.5 dark:bg-gray-700 
        dark:border-gray-600 dark:placeholder-gray-400
         dark:text-white dark:focus:ring-blue-500
         dark:focus:border-blue-500 ml-1 mr-20 mb-2 "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="BUSCAR TAREA POR NOMBRE..."
      />
      <div className="grid grid-cols-3 gap-3">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

