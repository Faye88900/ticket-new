"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddTicketPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id"); // 有 id 就是编辑模式

  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    eventId: "",
    type: "",
    price: "",
    quantity: "",
  });

  // 新活动表单
  const [newEvent, setNewEvent] = useState({
    title: "",
    start_time: "",
    location: "",
  });

  // 初始化加载 events & 如果是编辑，加载该票券
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);

    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    if (editId) {
      const ticket = savedTickets.find((t) => t.id === Number(editId));
      if (ticket) {
        setForm({
          eventId: String(ticket.eventId), // ✅ 转 string，确保 select 正确显示
          type: ticket.type,
          price: ticket.price,
          quantity: ticket.quantity,
        });
      }
    }
  }, [editId]);

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedEvents = [...events];
    let eventId = form.eventId;

    // 如果用户要新增活动
    if (form.eventId === "new") {
      if (!newEvent.title || !newEvent.start_time || !newEvent.location) {
        alert("Please fill in the new event information completely");
        return;
      }

      const newId =
      events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
      const createdEvent = { id: newId, ...newEvent };

      updatedEvents.push(createdEvent);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);

      eventId = newId; // 用新活动的 id
    }

    // 保存票券
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];

    if (editId) {
      // ✅ 编辑模式：更新原来的 ticket
      const updatedTickets = savedTickets.map((t) =>
        t.id === Number(editId)
          ? {
              ...t,
              eventId: Number(eventId),
              type: form.type,
              price: Number(form.price),
              quantity: Number(form.quantity),
            }
          : t
      );
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      alert("✅ Ticket updated successfully!");
    } else {
      // ➕ 新增模式
      const newId =
        savedTickets.length > 0
          ? Math.max(...savedTickets.map((t) => t.id)) + 1
          : 1;

      const newTicket = {
        
        id:Date.now().toString(),
        eventId: Number(eventId),
        type: form.type,
        price: Number(form.price),
        quantity: Number(form.quantity),
      };

      const updatedTickets = [...savedTickets, newTicket];
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));

      alert("✅ Ticket added successfully!");
    }

    router.push("/admin/tickets");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        {editId ? "✏️ Edit Ticket" : "➕ Add Ticket"}
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Select Event */}
        <label style={labelStyle}>Select Event</label>
        <select
          name="eventId"
          value={form.eventId}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">-- Select Event --</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
          <option value="new"> Add New Event</option>
        </select>

        {/* 如果选了新活动，就显示额外表单 */}
        {form.eventId === "new" && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", // 渐变蓝色
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid #bae6fd",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#0369a1",
                borderBottom: "1px solid #bae6fd",
                paddingBottom: "8px",
              }}
            >
              New Event Info
            </h3>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Event Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter event title"
                value={newEvent.title}
                onChange={handleNewEventChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Start Time</label>
              <input
                type="text"
                name="start_time"
                placeholder="e.g. 17 Aug 2025 7:00 PM"
                value={newEvent.start_time}
                onChange={handleNewEventChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Event location"
                value={newEvent.location}
                onChange={handleNewEventChange}
                style={inputStyle}
                required
              />
            </div>
          </div>
        )}

        {/* Ticket Type */}
        <label style={labelStyle}>Ticket Type</label>
        <input
          type="text"
          name="type"
          placeholder="e.g. VIP, CAT 1"
          value={form.type}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* Price */}
        <label style={labelStyle}>Price (RM)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* Quantity */}
        <label style={labelStyle}>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button type="submit" style={submitBtnStyle}>
          {editId ? "💾 Update Ticket" : " Save Ticket"}
        </button>
      </form>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const submitBtnStyle = {
  padding: "12px 20px",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
