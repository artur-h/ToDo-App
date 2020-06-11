export function prepareTask(newTask, list) {
  let currentTask = list.find(task => task.id === newTask.id);

  if (currentTask) {
    currentTask = {...currentTask, ...newTask};
    const index = list.findIndex(task => task.id === newTask.id);
    list[index] = currentTask;
  } else {
    list.push(newTask);
  }

  return currentTask || newTask;
}
