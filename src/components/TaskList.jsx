import Task from "./Task";

const TaskList = ({
  tasks,
  toggleComplete,
  removeTask,
  updateTask,
  sortBy,
}) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "creation") {
      return new Date(a.creationDate) - new Date(b.creationDate);
    }
    return new Date(a.finishDate) - new Date(b.finishDate);
  });

  return (
    <div>
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
