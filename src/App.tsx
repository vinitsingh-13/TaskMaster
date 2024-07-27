import { useState } from "react";
import { TodoType } from "./types";
import AddTodo from "./components/AddTodo";
import MainContent from "./components/MainContent";
import{ Toaster} from "react-hot-toast";
export default function App() {
  const [todoArr, setTodoArr] = useState<TodoType[]>([]);

  return (
    <div className="flex h-screen flex-col items-center gap-8 pt-8 lg:py-10">
    <AddTodo  setTodoArr={setTodoArr}/>
    <MainContent todos={todoArr} setTodoArr={setTodoArr}/>
    <Toaster
      gutter={24}
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
      }}
    />
  </div>
  );
}
