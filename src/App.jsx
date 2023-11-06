import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { checkTime } from "./utils/checkTime";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("finishDate");

  useEffect(() => {
    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
    if (tasksFromStorage) {
      setTasks(tasksFromStorage);
    }
  }, []);

  useEffect(() => {
    checkTime(tasks);
  }, [tasks]);

  const addTask = (task) => {
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const removeTask = (taskId) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(remainingTasks);
    localStorage.setItem("tasks", JSON.stringify(remainingTasks));
  };

  const updateTask = (taskId, updatedTaskInfo) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...updatedTaskInfo };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <h1>to-do list</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        removeTask={removeTask}
        sortBy={sortBy}
        updateTask={updateTask}
      />
      <button onClick={() => setSortBy("creation")}>
        Сортировать по дате создания
      </button>
      <button onClick={() => setSortBy("finishDate")}>
        Сортировать по сроку выполнения
      </button>
    </div>
  );
};

export default App;
