import axiosClient from "../axiosClient";
import { useEffect, useState } from "react";

export default function Test() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axiosClient
      .get("/tasks", { withCredentials: true })
      .then((response) => {
        console.log(response.data.data.tasks);
        setTasks(response.data.data.tasks);
      })
      .catch((error) => {
        console.log("Error fetching tasks", error.message);
      });
  };

  const handleDeleteTask = (task) => {
    console.log(task);
    axiosClient
      .delete(`tasks/${task.id}`, { withCredentials: true })
      .then(() => {
        getTasks();
      });
  };

  const handleUpdateTask = () => {};

  console.log(tasks.map((task) => task.title));
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => handleDeleteTask(task)}>Delete</button>
          <button onClick={handleUpdateTask}>Update</button>
          <h1>{task.title}</h1>
          <p>{task.subject}</p>
          <p>{task.difficulty}</p>
          <p>{task.estimatedDuration}</p>
          <p>{`${
            new Date(task.createdAt).toISOString().split("T")[0]
          } ${new Date(task.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}</p>
          <p>{`${
            new Date(task.deadline).toISOString().split("T")[0]
          } ${new Date(task.deadline).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}</p>
        </div>
      ))}
    </div>
  );
}
