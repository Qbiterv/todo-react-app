import { useEffect, useRef, useState } from "react";
import { Button } from "./components/Button";
import { List } from "./components/List/List";
import "./App.css";

interface Task {
  title: string;
  description: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const [modalStatus, setModalStatus] = useState(false);

  const taskTitle = useRef<HTMLInputElement>(null!);
  const taskDesc = useRef<HTMLTextAreaElement>(null!);

  function taskHandler(event: React.FormEvent<HTMLFormElement>): void {
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
            <input maxLength={20} id="title" type="text" ref={taskTitle} />
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
        <div>
          <Button
            type="button"
            onClick={() => {
              setModalStatus(true);
            }}
          >
            Create new task 😊
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
