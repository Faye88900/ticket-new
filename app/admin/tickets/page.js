"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockEvents, mockTickets } from "../../mockData"; // ✅ 引入 mockData

export default function TicketsManagement() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [events, setEvents] = useState([]);

  // 加载数据
  const loadData = () => {
    // Events
    let savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    if (savedEvents.length === 0) {
      savedEvents = mockEvents;
      localStorage.setItem("events", JSON.stringify(mockEvents));
    }
    setEvents(savedEvents);

    // Tickets
    let savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    if (savedTickets.length === 0) {
      savedTickets = mockTickets;
      localStorage.setItem("tickets", JSON.stringify(mockTickets));
    }
    setTickets(savedTickets);
  };

  useEffect(() => {
    loadData();

    // ✅ 监听 localStorage 的变化
    const handleStorageChange = () => loadData();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 删除票券
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    const ticketToDelete = tickets.find((t) => t.id === id);
    if (!ticketToDelete) return;

    // 1. 删除该票
    const updatedTickets = tickets.filter((t) => t.id !== id);
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    // 2. 检查 event 是否还有票
    const hasOtherTickets = updatedTickets.some(
      (t) => t.eventId === ticketToDelete.eventId
    );

    if (!hasOtherTickets) {
      // 3. 删除 event
      const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
      const updatedEvents = savedEvents.filter(
        (e) => e.id !== ticketToDelete.eventId
      );
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    }
  };

  // 找到 event 名称
  const getEventTitle = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    return event ? event.title : "Unknown Event";
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        🎟 Tickets Management
      </h1>

      {/* 新增按钮 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => router.push("/add-ticket")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ➕ Add New Ticket
        </button>
      </div>

      {/* 票券列表 */}
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
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
              <th style={thStyle}>Event</th>
              <th style={thStyle}>Ticket Type</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td style={tdStyle}>{getEventTitle(ticket.eventId)}</td>
                <td style={tdStyle}>{ticket.type}</td>
                <td style={tdStyle}>RM {ticket.price}</td>
                <td style={tdStyle}>{ticket.quantity}</td>
                <td style={tdStyle}>
                  <button
                    style={editBtnStyle}
                    onClick={() =>
                      router.push(`/admin/tickets/edit/${ticket.id}`)
                    }
                  >
                    ✏️ Edit
                  </button>
                  <button
                    style={deleteBtnStyle}
                    onClick={() => handleDelete(ticket.id)}
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

// 样式
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
