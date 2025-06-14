import { useState, useEffect } from "react";
import "./App.css";


function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = () => {
    if (editText.trim() === "") return;
    const updated = [...tasks];
    updated[editIndex].text = editText;
    setTasks(updated);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="App">
      <h1>📝 Amer's To-Do List</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span className="checkbox" onClick={() => toggleTask(index)}>
              {task.completed ? "✔️" : "⬜"}
            </span>

            {editIndex === index ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => startEditing(index)}>✏️ Edit</button>
              </>
            )}

            <button onClick={() => deleteTask(index)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}


export default App;
