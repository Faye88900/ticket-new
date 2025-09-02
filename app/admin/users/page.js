"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // 用户数据始终是写死的
    setUsers([
      { id: 1, name: "Alice", email: "user@gmail.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ]);

    // 默认管理员
    const defaultAdmins = [
      { id: 101, name: "Admin Tom", email: "admin@gmail.com", role: "Super Admin", status: "Active" },
      { id: 102, name: "Admin Jane", email: "admin2@system.com", role: "Moderator", status: "Active" },
    ];

    // 读取本地存储的管理员
    const storedAdmins = JSON.parse(localStorage.getItem("admins") || "[]");

    // 合并：默认管理员 + 新增管理员
    setAdmins([...defaultAdmins, ...storedAdmins]);
  }, []);

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const deleteAdmin = (id) => {
    const updated = admins.filter((a) => a.id !== id);
    setAdmins(updated);

    // ⚡ 保存到 localStorage，但只存新增的那部分
    const defaultIds = [101, 102];
    const onlyNew = updated.filter((a) => !defaultIds.includes(a.id));
    localStorage.setItem("admins", JSON.stringify(onlyNew));
  };

  // 共用表格渲染
  const renderTable = (title, data, onDelete, viewPath, showAddBtn = false) => (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: "20px 0" }}>{title}</h1>
        {showAddBtn && (
          <Link href="/admin/admins/create">
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                background: "#28a745",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ➕ Add New Admin
            </button>
          </Link>
        )}
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ background: "#f5f5f5", textAlign: "left" }}>
          <tr>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={item.id}
              style={{
                background: idx % 2 === 0 ? "#fff" : "#fafafa",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f0f8ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  idx % 2 === 0 ? "#fff" : "#fafafa")
              }
            >
              <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                {item.id}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                {item.name}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                {item.email}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                <Link href={`${viewPath}/${item.id}`} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: "#17a2b8",
                      color: "#fff",
                      marginRight: "8px",
                    }}
                  >
                    🔍 View
                  </button>
                </Link>

                <button
                  onClick={() => onDelete(item.id)}
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: "#dc3545",
                    color: "#fff",
                  }}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "Arial" }}>
      {renderTable("👥 User Management", users, deleteUser, "/admin/users")}
      {renderTable("🛠️ Admin Management", admins, deleteAdmin, "/admin/admins", true)}
    </div>
  );
}
