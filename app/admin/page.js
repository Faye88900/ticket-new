"use client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>🎉 Welcome Admin</h1>
      
      {/* 功能入口卡片 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div onClick={() => router.push("/admin/events")} style={cardStyle}>
          📅 Events Management
        </div>
        <div onClick={() => router.push("/admin/tickets")} style={cardStyle}>
          🎟 Tickets Management
        </div>
        <div onClick={() => router.push("/admin/reports")} style={cardStyle}>
          📊 Sales Reports
        </div>
        <div onClick={() => router.push("/admin/users")} style={cardStyle}>
          👥 Users Management
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "30px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "0.3s",
  textAlign: "center"
};
