import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Task = ({ task, toggleComplete, removeTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedfinishDate, setEditedfinishDate] = useState(
    new Date(task.finishDate)
  );

  const handleSave = () => {
    updateTask(task.id, {
      ...task,
      title: editedTitle,
      description: editedDescription,
      finishDate: editedfinishDate,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
        <DatePicker
          selected={editedfinishDate}
          onChange={(date) => setEditedfinishDate(date)}
        />
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={() => setIsEditing(false)}>Отменить</button>
      </div>
    );
  } else {
    return (
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.title} - до {new Date(task.finishDate).toLocaleString()}
        </span>
        <button onClick={() => setIsEditing(true)}>Изменить</button>
        <button onClick={() => removeTask(task.id)}>Удалить</button>
      </div>
    );
  }
};

export default Task;
