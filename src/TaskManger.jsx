import { useState } from "react";

function TaskManger() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    setTitle("");
    setBody("");
    setEditingTaskId(null);
  };

  const addTask = () => {
    if (title.trim() === "" || body.trim() === "") {
      return;
    }

    if (editingTaskId !== null) {
      const editedTasks = tasks.map((task) => {
        if (task.id === editingTaskId) {
          return {
            ...task,
            title,
            body,
          };
        }
        return task;
      });
      setTasks(editedTasks);
      setEditingTaskId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        body,
      };

      setTasks([...tasks, newTask]);
    }
    toggleForm();
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    if (editingTaskId === taskId) {
      setEditingTaskId(null);
    }
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setBody(taskToEdit.body);
      setEditingTaskId(taskId);
      setShowForm(true);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-8">Task Manager</h1>
      <div className="flex justify-end">
        {!showForm && (
          <button
            className="bg-blue-500 text-white py-1 px-4 rounded mb-4  "
            onClick={toggleForm}
          >
            Add New Task
          </button>
        )}
      </div>

      {showForm && (
        <div className="border-2 border-blue-400 rounded-lg p-4">
          <div className="mb-4">
            <label className="block mb-1 text-xl font-medium">Title</label>
            <input
              type="text"
              className="border px-2 py-1 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-xl font-medium">Body</label>
            <textarea
              className="border px-2 py-1 w-full"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>

          <button
            className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
            onClick={addTask}
          >
            {editingTaskId !== null ? "Update Task" : "Add Task"}
          </button>
        </div>
      )}

      <div className="mt-8">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex border p-4 mb-4 shadow-xl rounded-lg"
          >
            <div className="flex-grow text-left">
              <h2 className="text-xl font-bold mb-2">{task.title}</h2>
              <p>{task.body}</p>
            </div>
            <div className="mt-2">
              <button
                className="bg-[#3b82f6] text-white py-1 px-4 rounded mr-2 mb-2"
                onClick={() => editTask(task.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-1 px-2 rounded"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TaskManger;
