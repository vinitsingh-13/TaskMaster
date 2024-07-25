import AddTodo from "./components/AddTodo";
import MainContent from "./components/MainContent";
import { useState } from "react";
import { TodoType } from "./types";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [todoArr, setTodoArr] = useState<TodoType[]>([]);
  return (
    <div className="flex flex-col items-center lg:py-10 h-screen gap-8 pt-8">
      <AddTodo setTodoArr={setTodoArr}/>
      <MainContent todos={todoArr} setTodoArr={setTodoArr}/>
      <Toaster gutter={24}
        toastOptions={{
          success: {
            style: {
              background: "tale",
              color: "black",
            },
          },
          error: {
            style: {
              background: "tale",
              color: "black",
            },
          },
        }}/>
    </div>
  )
}
