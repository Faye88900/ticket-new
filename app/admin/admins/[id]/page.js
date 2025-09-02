"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const mockAdmins = [
  { id: 101, name: "Admin Tom", email: "admin@gmail.com", role: "Super Admin", createdAt: "2024-05-01" },
  { id: 102, name: "Admin Jane", email: "admin2@system.com", role: "Moderator", createdAt: "2024-06-10" },
];

export default function AdminDetailPage() {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let found = mockAdmins.find((a) => a.id === Number(id));

    if (!found) {
      const storedAdmins = JSON.parse(localStorage.getItem("admins") || "[]");
      found = storedAdmins.find((a) => a.id === Number(id));
    }

    setAdmin(found || null);
  }, [id]);

  if (!admin) {
    return <p style={{ padding: "20px" }}>❌ Admin Not Found</p>;
  }

  return (
    <div style={{ maxWidth: "720px", margin: "40px auto", fontFamily: "Segoe UI, Arial, sans-serif" }}>
      {/* 顶部标题 + 返回按钮 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
        <Link href="/admin/users">
          <button
            style={{
              marginRight: "16px",
              padding: "8px 16px",
              border: "none",
              borderRadius: "8px",
              background: "#007bff",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ⬅ Back
          </button>
        </Link>
        <h1 style={{ margin: 0, fontSize: "22px" }}>🛠️ Admin Detail</h1>
      </div>

      {/* 详情卡片 */}
      <div
        style={{
          background: "#fff",
          padding: "28px",
          borderRadius: "14px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", rowGap: "16px", columnGap: "10px" }}>
          <p style={{ fontWeight: "600", margin: 0 }}> ID:</p> 
          <p style={{ margin: 0 }}>{admin.id}</p>

          <p style={{ fontWeight: "600", margin: 0 }}> Name:</p> 
          <p style={{ margin: 0 }}>{admin.name}</p>

          <p style={{ fontWeight: "600", margin: 0 }}> Email:</p> 
          <p style={{ margin: 0 }}>{admin.email}</p>

          <p style={{ fontWeight: "600", margin: 0 }}> Password:</p> 
          <p style={{ margin: 0 }}>
            {showPassword ? (admin.password || "admin123") : "••••••••"}
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                marginLeft: "10px",
                padding: "4px 8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: "#181818ff",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </p>

          <p style={{ fontWeight: "600", margin: 0 }}> Role:</p> 
          <p style={{ margin: 0 }}>{admin.role}</p>

          <p style={{ fontWeight: "600", margin: 0 }}> Status:</p> 
          <p style={{ margin: 0, color: admin.status === "Disabled" ? "red" : "green" }}>
            {admin.status || "Active"}
          </p>

          <p style={{ fontWeight: "600", margin: 0 }}> Created At:</p> 
          <p style={{ margin: 0 }}>{admin.createdAt || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
