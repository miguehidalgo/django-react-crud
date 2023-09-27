import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, getTask, updateTask } from "../api/tasks.api";
import { toast } from "react-hot-toast";
import { Navigation } from "../components/Navigation";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Tarea Actualizada", {
        position: "top-right",
        style: {
          background: "#101010",
          color: "#fff",
          fontSize:40,
        },
      });
    } else {
      await createTask(data);
      toast.success("Nueva Tarea agregada", {
        position: "top-right",
        style: {
          background: "#101010",
          color: "#fff",
          fontSize:40,
        },
      });
    }

    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
      }
    }
    loadTask();
  }, []);

  return (
   

    
    
    <div className="max-w-xl mx-auto">
       <Navigation />
    
      <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
        <h1 className="font-bold text-2xl mb-1 bg-gray- p-1 rounded-lg ">Crea, elimina o edita una tarea</h1>
        <input
          type="text"
          placeholder="Titulo"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />

        {errors.title && <span>Este campo es requerido</span>}

        <textarea
          placeholder="Describe la tarea"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full"
        />

      

        {errors.description && <span>Este campo es requerido</span>}

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Guardar/Editar
        </button > 
        
        
        
        
      </form>
      

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm("Estas seguro?");
              if (accepted) {
                await deleteTask(params.id);
                toast.success("Tarea Eliminada", {
                  position: "top-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                    fontSize:40,
                  },
                });
                navigate("/tasks");
              }
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
