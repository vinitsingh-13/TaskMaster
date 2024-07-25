
export interface TodoType{
    id:number;
    title:string;
    desc:string;
    
}
export interface TodoPropTypes{
    todos:TodoType[]
}

export interface AddTodoProps {
    setTodoArr: React.Dispatch<React.SetStateAction<TodoType[]>>;
  }
  