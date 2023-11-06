export function checkTime(tasks) {
  const intervalValue = 360000; // 1 час
  const checkTimeValue = 720000; //12 часов
  setInterval(() => {
    const now = new Date();
    tasks.forEach((task) => {
      const timeLeft = new Date(task.finishDate) - now;
      console.log(timeLeft);
      console.log(task.finishDate);
      if (timeLeft > 0 && timeLeft <= checkTimeValue) {
        alert(`Задача "${task.title}" должна быть выполнена через 12 часов`);
      }
    });
  }, intervalValue);
}
