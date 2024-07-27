import { useState, useEffect } from "react";
import { TodoPropTypes } from "../types";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdDeleteForever, MdCheckBoxOutlineBlank } from "react-icons/md";
import { AddTodoProps } from "../types";
import toast from "react-hot-toast";
import { getDatabase, ref, get,remove } from "firebase/database";
import { app } from "../config/firebase";

type MainContentProps = {
  todos: TodoPropTypes["todos"];
  setTodoArr: AddTodoProps["setTodoArr"];
};
export default function MainContent({ todos, setTodoArr }: MainContentProps) {
  const [ischecked, setIsChecked] = useState<{ [key: number]: boolean }>({});

  function handleCheckbox(id: number) {
    setIsChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  async function handleDeleteTodos(id: number) {
    try{
      const db = getDatabase(app);
      const dbRef = ref(db,"Todos/Todo/");
      const todoSnapShot = await get(dbRef);
      if(!todoSnapShot.exists()){
        toast.error("Todo not Found");
        return;
      }
      const todosData = todoSnapShot.val();
      const todoKey = Object.keys(todosData).find(key=>todosData[key].id===id);

      if (!todoKey) {
        toast.error("Todo not found");
        return;
      }
      const todoRef = ref(db,`Todos/Todo/${todoKey}`);
      await remove(todoRef);
      toast.success("Task deleted successfully")
      setTodoArr((prevtodos)=>prevtodos.filter((todo)=>todo.id!==id))
      
  
    }catch(error){
      toast.error("Failed to delete the task")
    }

  }
  useEffect(() => {
    async function getTodos() {
      const db = getDatabase(app);
      const dbref = ref(db, "Todos/Todo");
      const todos = await get(dbref);
      if (!todos.exists()) return;
      setTodoArr(Object.values(todos.val()));
    }
    getTodos();
  }, [setTodoArr]);
 

  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-center gap-6 px-6 md:flex-row lg:flex-row">
      {todos.map((todo) => (
        <div
          className="flex w-[20rem] select-none flex-col gap-5 rounded-lg bg-gray-50 p-6 shadow-xl lg:w-[25%]"
          key={todo.id}
        >
          <div className="flex items-center justify-between">
            <p
              className={`${ischecked[todo.id] ? "line-through" : ""} text-2xl font-bold uppercase text-blue-600`}
            >
              {todo.title}
            </p>
            <div className="flex items-center gap-2">
              <div onClick={() => handleCheckbox(todo.id)}>
                {ischecked[todo.id] ? (
                  <IoMdCheckboxOutline size={23} color="blue" />
                ) : (
                  <MdCheckBoxOutlineBlank size={23} color="blue" />
                )}
              </div>
              <div onClick={() => handleDeleteTodos(todo.id)}>
                <MdDeleteForever size={24} color="blue" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-3">
            <p
              className={` ${ischecked[todo.id] ? "line-through" : ""} text-lg font-bold text-gray-500 first-letter:uppercase`}
            >
              {todo.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
