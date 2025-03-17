import React, { useState, useEffect } from "react";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    // โหลดข้อมูลจาก LocalStorage เมื่อเปิดเว็บ
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // บันทึกข้อมูลลง LocalStorage ทุกครั้งที่ tasks เปลี่ยนแปลง
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    // เพิ่ม Task
    const addTask = () => {
        if (newTask.trim() === "") return;
        let updatedTasks = [...tasks];

        if (editIndex !== null) {
            updatedTasks[editIndex] = { ...updatedTasks[editIndex], text: newTask };
            setEditIndex(null);
        } else {
            updatedTasks.push({ text: newTask, completed: false });
        }

        setTasks(updatedTasks);
        setNewTask("");
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // บันทึกทันที
    };

    // ลบ Task
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // บันทึกทันที
    };

    // แก้ไข Task
    const editTask = (index) => {
        setNewTask(tasks[index].text);
        setEditIndex(index);
    };

    // ติ๊กว่าเสร็จแล้ว
    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // บันทึกทันที
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>To-Do List</h2>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="เพิ่มงาน..."
            />
            <button onClick={addTask}>{editIndex !== null ? "แก้ไข" : "เพิ่ม"}</button>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(index)} />
                        {task.text}
                        <button onClick={() => editTask(index)}>✏️</button>
                        <button onClick={() => deleteTask(index)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
