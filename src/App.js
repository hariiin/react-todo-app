import React, {useState} from 'react'
import Lists from "./components/Lists";
import Form from "./components/Form";

const localTodoList = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];

export default function App() {



//1. 할일목록 배열에 저장
/*const todoList = [
  {id:"1", title:"공부하기", completed: true},
  {id:"2", title:"청소하기", completed: false}
]*/

const [ todoList, setTodoList ] = useState(localTodoList) ;
const [value, setValue] = useState("");

//2. textChange 함수
/*const textChange = (e) => {
  //console.log('e', e.target.value)
  setValue(e.target.value);
}*/

//입력버튼 이벤트
const btnSubmit = (e) => {
  e.preventDefault();
  let newTodo = {
    id: Date.now(),
    title:value,
    completed: false,
  }
  if (value.trim().length !==0) {
    setTodoList(prev => [...prev, newTodo]);
    localStorage.setItem("todoList", JSON.stringify([...todoList, newTodo]));
    setValue("");
  } else {
    alert("해야 할 일을 입력하세요.");
  }

}


const deleteAll = () => {
  setTodoList([]);
  localStorage.setItem("todoList", JSON.stringify([]));

}

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>To Do List</h1>
          <button className='deleteBtn' onClick={deleteAll}>deleteAll</button>
        </div>

        <Lists todoList ={todoList} setTodoList={setTodoList}/>
        <Form value={value} setValue={setValue} btnSubmit={btnSubmit}/>

      </div>
    </div>
  )
}



