import React from 'react'
import {DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
export default function Lists({todoList, setTodoList}) {

  //버튼스타일
/*const btnStyle = {
  color:"#fff",
  border:"none",
  padding:"5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float:"right"
}
 //리스트 스타일
const listStyle = (completed) => {
  return {
    padding: "10px",
    borderBottome: "1px #ccc dotted",
    textDecoration: completed ? "line-through" : "none"
  }
}*/
const btnClick = (id) => {
  let newTodoList = todoList.filter(data => data.id !== id)
  console.log('newTodoList', newTodoList);
  setTodoList(newTodoList);
  localStorage.setItem("todoList", JSON.stringify(newTodoList));
}

const checkboxCompleted = (id) => {
  let newTodoList = todoList.map(data => {
    if(data.id === id) {
      data.completed = !data.completed;
    }
    return data;
  })
  setTodoList(newTodoList);
  localStorage.setItem("todoList", JSON.stringify(newTodoList));
}


const handleEnd = (result) => {
  console.log(result);
  if (!result.destination) return;

const newTodoList =todoList;
const [reorderedItem] =newTodoList.splice(result.source.index, 1);

  newTodoList.splice(result.destination.index, 0,reorderedItem );
  setTodoList(newTodoList);
  localStorage.setItem("todoList", JSON.stringify(newTodoList));
};


  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todoApp">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((data, index) =>
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div key={data.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} className= {snapshot.isDragging ? "dragging":undefined }>
                      
                      <div className="list">
                        <input type="checkbox" defaultChecked={data.completed} onChange={() => checkboxCompleted(data.id)}/>
                        <span className={data.completed ? "completed": undefined}>{data.title}</span>
                        <button className="btn" onClick={() => btnClick(data.id)}>X</button> 
                      </div>

                    </div>
                )}
                </Draggable>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
