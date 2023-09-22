import { useNavigate } from "react-router-dom";
import { updateTask } from "../api/tasks.api"; 

export function TaskCard({ task }) {
  const navigate = useNavigate();

  const handleCheckboxChange = async () => {
    try {
      // Cambiar el estado de done localmente
      const updatedTask = { ...task, done: !task.done };
      
      // Realizar una solicitud PUT a la API para actualizar el estado en el servidor
      await updateTask(task.id, updatedTask);
      
      // Redirigir a la página de detalles de la tarea después de la actualización
      navigate(`/tasks/${task.id}`);
    } catch (error) {
      // Manejar errores de solicitud si es necesario
    }
  };

  return (
    <div
      className="bg-zinc-800 p-8 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate(`/tasks/${task.id}`);
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg">
        {task.title}
      </h1>
      <p className="text-slate-200">{task.description}</p>
      <p className="text-slate-500">{"Fecha de creación"} {task.created }  </p>
      <input
        type="checkbox"
        className="chk"
        title="MARCAR COMO HECHA"
        checked={task.done}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}
