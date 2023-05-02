import { useEffect, useRef, useState } from "react";
import Button from "./components/Button";
import List from "./components/List/List";
import "./App.css";

interface Task {
  title: string;
  description: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) return JSON.parse(savedTasks);
    return [];
  });

  const [modalStatus, setModalStatus] = useState(false);

  const taskTitle = useRef<HTMLInputElement>(null!);
  const taskDesc = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function taskHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskTitle.current.value === "" || taskDesc.current.value === "") return;
    setTasks((prevTasks) => [
      ...prevTasks,
      { title: taskTitle.current.value, description: taskDesc.current.value },
    ]);
    setModalStatus(false);
  }

  function listHandler(index: number) {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }

  return (
    <>
      {tasks.length > 0 ? (
        <List items={tasks} onClick={(index) => listHandler(index)} />
      ) : (
        <h1>No tasks</h1>
      )}
      {modalStatus ? (
        <div className="modal">
          <button className="close-modal" onClick={() => setModalStatus(false)}>
            X
          </button>
          <form className="task-modal" onSubmit={taskHandler}>
            <label htmlFor="title">Title</label>
            <input maxLength={40} id="title" type="text" ref={taskTitle} />
            <label htmlFor="description">Description</label>
            <textarea
              ref={taskDesc}
              name="description"
              id="description"
            ></textarea>
            <button type="submit">Add Task</button>
          </form>
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => {
            setModalStatus(true);
          }}
        >
          Create new task 😊
        </Button>
      )}
    </>
  );
}

export default App;
