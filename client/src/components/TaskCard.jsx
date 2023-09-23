import { useNavigate } from "react-router-dom";
import { updateTask } from "../api/tasks.api"; 

export function TaskCard({ task }) {
  const navigate = useNavigate();

  const handleCheckboxChange = async () => {
    try {
      const updatedTask = { ...task, done: !task.done };
      await updateTask(task.id, updatedTask);
      navigate(`/tasks/${task.id}`);
    } catch (error) {
      
    }
  };

  return (
    <div
      className="bg-black p-8 hover:bg-zinc-700 hover:cursor-pointer rounded-2xl "
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
