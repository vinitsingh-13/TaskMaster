import { useEffect, useState } from "react";
import { TodoType, AddTodoProps} from "../types";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export default function AddTodo({ setTodoArr }: AddTodoProps) {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDesc, setTodoDesc] = useState<string>("");
  const newArr: TodoType[] = [];

  function uuidToNumber(uuid: string): number {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
      const char = uuid.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function handleTodos(e: React.FormEvent) {
    e.preventDefault();
    if (todoTitle === "" || todoDesc === "") {
      toast.error("Please enter the task first");
      return;
    }
    const todo: TodoType = {
      id: uuidToNumber(uuidv4()),
      title: todoTitle,
      desc: todoDesc,
    };
    setTodoArr((cur: TodoType[]) => [...cur, todo]);

    if (localStorage.length === 0) {
      newArr.push(todo);
      localStorage.setItem("task", JSON.stringify(newArr));
    } else {
      const task = JSON.parse(localStorage.getItem("task")!);
      newArr.push(...task);
      newArr.push(todo);
      localStorage.setItem("task", JSON.stringify(newArr));
    }
    toast.success("Task added successfully");
    setTodoTitle("");
    setTodoDesc("");
  }

  useEffect(function () {
    const initialRenderTask = JSON.parse(localStorage.getItem("task")!);
    if (!initialRenderTask) return;
    setTodoArr(initialRenderTask);
  }, []);
  
  return (
    <div className="flex flex-col items-center rounded-lg bg-slate-50 lg:pt-12 shadow-lg lg:w-[45%] w-[90%] pt-12">
      <div>
        <h1 className="text-3xl font-bold tracking-widest text-blue-700">
          TaskMaster
        </h1>
      </div>
      <div className="w-full py-6">
        <form className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Enter your title"
            className="w-[70%] rounded-lg border-2 px-2 py-3 outline-none"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter your description"
            className="w-[70%] rounded-lg border-2 px-2 py-3 outline-none"
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
          />
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-lg text-white hover:bg-blue-700"
            onClick={handleTodos}
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
