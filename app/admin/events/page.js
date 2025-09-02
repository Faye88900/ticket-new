"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  

export default function EventsManagement() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // 默认活动 mockData
  const mockData = [
    {
      id: 1,
      title: "2025 HYERI FANMEETING TOUR",
      start_time: "2025-08-15",
      location: "KL Convention Centre",
      price: 250,
      category: "Music",
      image:
        "https://my.bookmyshow.com/api/v2/assets/image?image=https%3A%2F%2Fcdn-sea.bookmyshow.com%2Fprod%2Fimages%2F202506%2Ff7618751-43db-4497-9421-ad5125667ef3%2Fog%2F1280x500%2FHYERI_FANMEETING_2025_KL_BMS_Web_Banner.png&q=80&t=webp&w=1280",
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      start_time: "2025-09-10",
      location: "Penang Digital Hub",
      price: 358,
      category: "Technology",
      image:
        "https://my.bookmyshow.com/api/v2/assets/image?image=https%3A%2F%2Fcdn-sea.bookmyshow.com%2Fprod%2Fimages%2F202507%2F6942b1e3-1717-4b66-8b41-603a481dc3d9%2Fog%2F1280x500%2FBMS_1280x500.jpg&q=80&t=webp&w=1280",
    },
    {
      id: 3,
      title: "Art & Design Expo",
      start_time: "2025-08-20",
      location: "KL Art Gallery",
      price: 238,
      category: "Art",
      image:
        "https://my.bookmyshow.com/api/v2/assets/image?image=https%3A%2F%2Fcdn-sea.bookmyshow.com%2Fprod%2Fimages%2F202506%2Faee43b6f-33d5-4824-93b4-363cae441283%2Fog%2F1280x500%2FNew_Project__30_.png&q=80&t=webp&w=1280",
    },
  ];

  // 初始化，从 localStorage 读取活动数据
  useEffect(() => {
    let savedEvents = JSON.parse(localStorage.getItem("events"));

    if (!savedEvents || savedEvents.length === 0) {
      localStorage.setItem("events", JSON.stringify(mockData));
      savedEvents = mockData;
    }

    setEvents(savedEvents);
  }, []);

  // 删除活动
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    const updatedEvents = events.filter((e) => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  // 搜索 + 分类过滤
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || event.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>📅 Events Management</h1>

      {/* 搜索 + 分类 + 新增 */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", gap: "10px" }}>
        {/* 搜索框 */}
        <input
          type="text"
          placeholder="🔍 Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />

        {/* 分类筛选 */}
        <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{
        padding: "12px",
        border: "1px solid #0070f3", // ✅ 蓝色边框
        borderRadius: "8px",
        backgroundColor: "#f0f8ff",  // ✅ 淡蓝色背景，更醒目
        fontWeight: "bold",
        color: "#000000ff",            // ✅ 字体也用蓝色
        cursor: "pointer",
        }}
>
        <option value="All">All Categories</option>
        <option value="Music">Music</option>
        <option value="Technology">Technology</option>
        <option value="Art">Art</option>
    </select>


        {/* 新增活动按钮 */}
        <button
          onClick={() => router.push("/add-event")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          ➕ Add New Event
        </button>
      </div>

      {/* 活动列表 */}
      {filteredEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ backgroundColor: "#f5f5f5" }}>
            <tr>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Price</th>
              <th style={{ ...thStyle, minWidth: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id}>
                <td style={tdStyle}>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{ width: "120px", borderRadius: "8px" }}
                  />
                </td>
                <td style={tdStyle}>{event.title}</td>
                <td style={tdStyle}>{event.location}</td>
                <td style={tdStyle}>{event.start_time}</td>
                <td style={tdStyle}>RM {event.price}</td>
                <td style={tdStyle}>
                  <button
                    style={editBtnStyle}
                    onClick={() => router.push(`/edit-event/${event.id}`)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    style={deleteBtnStyle}
                    onClick={() => handleDelete(event.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  verticalAlign: "middle",
};

const editBtnStyle = {
  padding: "8px 16px",
  backgroundColor: "#ffc107",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  marginRight: "10px",
  fontWeight: "bold",
  minWidth: "80px",
};

const deleteBtnStyle = {
  padding: "8px 16px",
  backgroundColor: "#dc3545",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
  minWidth: "80px",
};
