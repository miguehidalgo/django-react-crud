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
          background: "green",
          color: "#fff",
          fontSize:40,
        },
      });
    } else {
      await createTask(data);
      toast.success("Nueva Tarea agregada", {
        position: "top-right",
        style: {
          background: "blue",
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
    
      <form onSubmit={onSubmit} className="bg-zinc-900 p-5 pt-10 rounded-lg mt-10">
        <h1 className="font-arial text-2xl mb-1 bg-gray- p-1 pb-5 rounded-lg ">CREA, EDITA O ELIMINA UNA TAREA</h1>
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
          className="bg-zinc-700 p-10 rounded-lg block w-full"
        />

        {errors.description && <span>Este campo es requerido</span>}



        <div className="flex justify-end ">
        

        <button className="bg-green-600 pl-8 pr-8  rounded-lg mt-4  ">
          Guardar <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
           fill="currentColor" class="bi bi-pencil" viewBox="0 0 15 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5
          0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207
          2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5
          0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821
          3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>
       Editar 
        </button > 
        
        </div> 
      </form>


      <div className="flex justify-end">
      {params.id && (
        <div className="">
          <button
            className="bg-red-600 pl-8 pr-8 rounded-lg  mt-4 mr-5"
            onClick={async () => {
              const accepted = window.confirm("Esta accion elimina la tarea de tu base de datos!!! Quieres continuar?");
              if (accepted) {
                await deleteTask(params.id);
                toast.success("Tarea Eliminada", {
                  position: "top-right",
                  style: {
                    background: "red",
                    color: "#fff",
                    fontSize:40,
                  },
                });
                navigate("/tasks");
              }
            }}
          >
            Eliminar
            <svg xmlns="http://www.w3.org/2000/svg"
             width="50" height="50" fill="currentColor"  viewBox="1 2 15 16">
             <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 
             2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2
             2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293
             5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254
             1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0
             .707-.293l.16-.16z"/>
               </svg>Tarea
          </button>  
        </div>
      )}
      </div>

     
    </div>
  );
}
