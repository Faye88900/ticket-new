"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEvent() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    start_time: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  // 输入框处理
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();

    // 从 localStorage 取出现有 events
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];

    // 生成新活动 ID
    const newEvent = {
      id: savedEvents.length > 0 ? savedEvents[savedEvents.length - 1].id + 1 : 1,
      ...formData,
    };

    // 更新 events
    const updatedEvents = [...savedEvents, newEvent];
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    alert("✅ Event added successfully!");

    // 跳转回管理页面
    router.push("/admin/events");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>➕ Add New Event</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={inputStyle} />
        <input type="date" name="start_time" value={formData.start_time} onChange={handleChange} required style={inputStyle} />
        <input type="number" name="price" placeholder="Price (RM)" value={formData.price} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="category" placeholder="Category (e.g. Music, Art)" value={formData.category} onChange={handleChange} style={inputStyle} />
        <input type="url" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required style={inputStyle} />
        <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} rows="4" style={inputStyle} />

        <button type="submit" style={submitBtn}> Save Event</button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const submitBtn = {
  padding: "12px",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};