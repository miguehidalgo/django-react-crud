import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format, isSameDay, parseISO } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

export function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDone, setFilterDone] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const formattedSelectedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const isMatchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isMatchDate =
      !formattedSelectedDate || isSameDay(parseISO(task.created), parseISO(formattedSelectedDate));

    if (filterDone === true) {
      return isMatchSearch && task.done && isMatchDate;
    } else if (filterDone === false) {
      return isMatchSearch && !task.done && isMatchDate;
    }

    return isMatchSearch && isMatchDate;
  });

  const handleShowAll = () => {
    setSelectedDate(null); // Establecer selectedDate en null para mostrar todas las tareas
  };







  return (
    <div className="container mx-auto">

<div className="my-4">

      <button 
        className=" mr-4 bg-gray-1000 p-3 rounded-lg border">
        <Link to="/tasks-create">CREAR<svg xmlns="http://www.w3.org/2000/svg" 
        width="90" height="40" fill="currentColor"  viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 
        1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2
        2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1
        .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>TAREA</Link>
      </button>


      

      <button
          className= {`bg-gray-600 p-3 rounded-lg mr-4 ${filterDone === null ? "" : "bg-opacity-30"}`}
          onClick={() => {setFilterDone(null)
            setSelectedDate(null);
          }}
           >
          LISTA<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5
           1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z"/>
          <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11
          2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
          </svg>COMPLETA
     </button>

      <button
          className={`bg-gray-600 p-3 rounded-lg mr-4 ${filterDone === true ? "" : "bg-opacity-30"}`}
          onClick={() => setFilterDone(true)} >
          TAREAS<svg xmlns="http://www.w3.org/2000/svg" 
          width="80" height="40" fill="currentColor"  viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5
          0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1
          0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1
          .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
          </svg>HECHAS
     </button>


        <button
          className={`bg-gray-600 p-3 rounded-lg mr-4 ${filterDone === false ? "" : "bg-opacity-30"}`}
          onClick={() => setFilterDone(false)} >
          TAREAS<svg xmlns="http://www.w3.org/2000/svg"        
        width="80" height="40" fill="currentColor"  viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1
        .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0
         1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z"/>
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0
        0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1
        .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>PENDIENTES
        </button>


        <DatePicker
          className="bg-gray-600"
          width="80" height="40"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Selecciona una fecha"
        />
       
      </div>

      <input
        type="text"
        className="p-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
        focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-1 mr-20 mb-2 text-base"
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
