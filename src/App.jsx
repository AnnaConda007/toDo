import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { checkTime } from "./utils/checkTime";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("finishDate");

  useEffect(() => {
    checkTime(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const updateTask = (taskId, updatedTaskInfo) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...updatedTaskInfo };
        }
        return task;
      })
    );
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
