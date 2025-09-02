"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mockTickets } from "../../../mockData"; 

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // 模拟用户资料
    const mockUsers = [
      { id: 1, name: "Alice", email: "user@gmail.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ];
    const foundUser = mockUsers.find((u) => u.id == id);
    setUser(foundUser);

    // 模拟用户购买记录
    const purchasedMap = {
      1: ["1-1", "1-2", "2-1"],
      2: ["3-1"],
    };

    const userTickets = mockTickets.filter((t) =>
      purchasedMap[id]?.includes(t.id)
    );

    setTickets(userTickets);
  }, [id]);

  if (!user) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading user...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      {/* 返回按钮 */}
      <button
        onClick={() => router.push("/admin/users")}
        style={{
          marginBottom: "20px",
          padding: "6px 14px",
          background: "#6c757d",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ⬅ Back to Users
      </button>

      {/* 用户资料卡片 */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>👤 {user.name}'s Profile</h1>
        <p style={{ margin: "5px 0", color: "#555" }}>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      {/* Tickets Purchased */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>🎟 Tickets Purchased</h2>

        {tickets.length === 0 ? (
          <p style={{ color: "#888" }}>No tickets purchased.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead style={{ background: "#f1f3f5" }}>
              <tr>
                <th style={thStyle}>Ticket ID</th>
                <th style={thStyle}>Event</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Benefit</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, idx) => (
                <tr
                  key={t.id}
                  style={{
                    background: idx % 2 === 0 ? "#fff" : "#fafafa",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#eef6ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#fafafa")}
                >
                  <td style={tdStyle}>{t.id}</td>
                  <td style={tdStyle}>{t.eventTitle}</td>
                  <td style={tdStyle}>{t.type}</td>
                  <td style={tdStyle}>${t.price}</td>
                  <td style={tdStyle}>{t.benefit || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// 公共样式
const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e9ecef",
};
