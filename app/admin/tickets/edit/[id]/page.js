"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTicketPage() {
  const { id } = useParams(); // 动态路由传来的 id
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [form, setForm] = useState({
    eventId: "",
    type: "",
    price: "",
    quantity: "",
  });

  // 初始化加载 events 和当前 ticket
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);

    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const found = savedTickets.find((t) => String(t.id) === String(id));

    if (found) {
      setTicket(found);
      setForm({
        eventId: String(found.eventId),
        type: found.type,
        price: String(found.price),
        quantity: String(found.quantity),
      });
    }
  }, [id]);

  // 输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 提交修改
  const handleSubmit = (e) => {
    e.preventDefault();

    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const updatedTickets = savedTickets.map((t) =>
      String(t.id) === String(id)
        ? {
            ...t,
            eventId: Number(form.eventId),
            type: form.type,
            price: Number(form.price),
            quantity: Number(form.quantity),
          }
        : t
    );

    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    alert("✅ Ticket updated successfully!");
    router.push("/admin/tickets");
    router.refresh();
  };

  if (!ticket) {
    return <p style={{ color: "red" }}>❌ Ticket not found</p>;
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>✏️ Edit Ticket</h1>

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
        </select>

        {/* Ticket Type */}
        <label style={labelStyle}>Ticket Type</label>
        <input
          type="text"
          name="type"
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
          💾 Save Changes
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
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
