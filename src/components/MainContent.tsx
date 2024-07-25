import { useState } from "react";
import { TodoPropTypes } from "../types";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdDeleteForever, MdCheckBoxOutlineBlank } from "react-icons/md";
import { AddTodoProps } from "../types";
import toast from "react-hot-toast";

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

  function handleDeleteTodos(id: number) {
    setTodoArr((todoid) => todoid.filter((todo) => todo.id !== id));
    let storedTodos: TodoPropTypes["todos"] = JSON.parse(
      localStorage.getItem("task")!,
    );
    if (storedTodos) {
      storedTodos = storedTodos.filter((todo) => todo.id !== id);
      localStorage.setItem("task", JSON.stringify(storedTodos));
    }
    toast.success("Task is successfully deleted");
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 px-6 lg:flex-row flex-col md:flex-row">
      {todos.map((todo) => (
        <div
          className="flex lg:w-[25%] select-none flex-col gap-5 rounded-lg bg-gray-50 p-6 shadow-xl w-[20rem]"
          key={todo.id}
        >
          <div className="flex items-center justify-between " >
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
              className={` ${ischecked[todo.id] ? "line-through" : ""}  text-lg font-bold text-gray-500 first-letter:uppercase`}
            >
              { todo.desc}
            </p>
            
          </div>
        </div>
      ))}
    </div>
  );
}
