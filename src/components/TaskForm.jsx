import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [finishDate, setFinishDate] = useState(new Date());
  const currentDate = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask({
      id: uuidv4(),
      title,
      description,
      finishDate,
      creationDate: currentDate,
      completed: false,
    });
    setTitle("");
    setDescription("");
    setFinishDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">название задачи</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">описание</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="finishDate">дата выполнения</label>
        <DatePicker
          selected={finishDate}
          onChange={(date) => setFinishDate(date)}
        />
      </div>
      <button type="submit">Добавить задачу</button>
    </form>
  );
};

export default TaskForm;
