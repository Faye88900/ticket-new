"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = parseInt(params.id);

  const [eventData, setEventData] = useState({
    title: "",
    start_time: "",
    location: "",
    price: "",
    image: "",
  });

  // 🟦 载入要编辑的事件
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const eventToEdit = savedEvents.find((e) => e.id === eventId);

    if (eventToEdit) {
      setEventData(eventToEdit);
    }
  }, [eventId]);

  // 🟦 输入框变更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🟦 保存修改
  const handleSave = () => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = savedEvents.map((e) =>
      e.id === eventId ? { ...eventData, id: eventId } : e
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    alert("✅ Event updated successfully!");
    router.push("/admin/events");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            color: "#1f2937",
          }}
        >
          Edit Event
        </h1>

        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
            style={inputStyle}
          />

          <input
            type="date"
            name="start_time"
            value={eventData.start_time}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="price"
            value={eventData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="image"
            value={eventData.image}
            onChange={handleChange}
            placeholder="Image URL"
            style={inputStyle}
          />

          {/* ✅ 即时图片预览 */}
          {eventData.image && (
            <img
              src={eventData.image}
              alt="Event Preview"
              style={{
                width: "100%",
                borderRadius: "8px",
                marginTop: "10px",
                objectFit: "cover",
              }}
            />
          )}

          {/* 按钮区域 */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              type="button"
              onClick={handleSave}
              style={saveBtn}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#1d4ed8")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#2563eb")
              }
            >
              💾 Save Changes
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/events")}
              style={cancelBtn}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#e5e7eb")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#f3f4f6")
              }
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* 🎨 样式配置 */
const inputStyle = {
  padding: "12px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "16px",
  outline: "none",
  transition: "border 0.2s",
};

const saveBtn = {
  flex: 1,
  padding: "14px",
  backgroundColor: "#2563eb",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "background 0.3s",
};

const cancelBtn = {
  flex: 1,
  padding: "14px",
  backgroundColor: "#f3f4f6",
  color: "#111827",
  fontWeight: "bold",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "background 0.3s",
};
