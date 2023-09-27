import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { TaskFormPage } from "./pages/TaskFormPage";
import { TasksPage } from "./pages/TasksPage";
import { Toaster } from "react-hot-toast";
import { TaskLogin } from "./pages/TaskLogin";


function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
       
        
        <Routes>
         
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:id" element={<TaskFormPage />} />
          <Route path="/tasks-create" element={<TaskFormPage />} />
          <Route path="/login" element={<TaskLogin />} />
          
          
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
