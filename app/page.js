"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👇 判断是 admin 还是 user
    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      localStorage.setItem("role", "admin");
      router.push("/admin"); // 管理员跳转
    } else if (form.email === "user@gmail.com" && form.password === "123456") {
      localStorage.setItem("role", "user");
      router.push("/home"); // 普通用户跳转
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={{ display: "block", margin: "5px 0", padding: "8px" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={{ display: "block", margin: "5px 0", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
