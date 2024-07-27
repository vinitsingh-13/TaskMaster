import { useState } from "react";
import { AddTodoProps} from "../types";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { getDatabase,ref,set,push,get } from "firebase/database";
import { app } from "../config/firebase";

export default function AddTodo({ setTodoArr }: AddTodoProps) {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDesc, setTodoDesc] = useState<string>("");

  function uuidToNumber(uuid: string): number {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
      const char = uuid.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  async function handleTodos(e: React.FormEvent) {
    e.preventDefault();
    if (todoTitle === "" || todoDesc === "") {
      toast.error("Please enter the task first");
      return;
    }
    //setting data to the firebase database
    const db = getDatabase(app);
    const newTodoRef = push(ref(db,"Todos/Todo"));
    set(newTodoRef,{
      title:todoTitle,
      desc:todoDesc,
      id:uuidToNumber(uuidv4())
    }).then(()=>{
      toast.success("Task added successfully")
    }).catch((err)=>{
      toast.error(err.message)
    })

    //setting data to the todoArr
    const tododb = getDatabase(app);
    const tododbref = ref(tododb,"Todos/Todo");
    const getTodo = await get(tododbref);
    if(!getTodo.exists()) return;
    setTodoArr(Object.values(getTodo.val()))
    setTodoTitle("");
    setTodoDesc("");
  }

 
  
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
