"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAdminPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Moderator");
  const [status, setStatus] = useState("Active");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAdmin = {
      id: Date.now(),
      name,
      email,
      password, // ⚠️ demo用
      role,
      status,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const existingAdmins = JSON.parse(localStorage.getItem("admins") || "[]");
    localStorage.setItem("admins", JSON.stringify([...existingAdmins, newAdmin]));

    alert("✅ Admin Created!");
    router.push("/admin/users");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}>
        ➕ Add New Admin
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "28px",
          borderRadius: "14px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px", fontWeight: 600 }}>👤 Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px", fontWeight: 600 }}> Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px", fontWeight: 600 }}> Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Role */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px", fontWeight: 600 }}> Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="Support">Support</option>
            </select>
          </div>

          {/* Status */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px", fontWeight: 600 }}> Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#28a745",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#218838")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#28a745")}
          >
             Create Admin
          </button>
        </form>
      </div>
    </div>
  );
}
