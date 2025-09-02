"use client";

import useOrderStore from "../orderStore";

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f0f3",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>📑 My Orders</h1>

        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Order Number</th>
                <th style={thStyle}>Activity Name</th>
                <th style={thStyle}>Ticket Type</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Total Price</th>
                <th style={thStyle}>Seat</th>
                <th style={thStyle}>Event Location</th>
                <th style={thStyle}>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#fdf1f6",
                    transition: "background 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3d9e1")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#fff" : "#fdf1f6")
                  }
                >
                  <td style={tdStyle}>{order.id}</td>
                  <td style={tdStyle}>{order.eventTitle}</td>
                  <td style={tdStyle}>{order.ticketType}</td>
                  <td style={tdStyle}>{order.quantity}</td>
                  <td style={tdStyle}>
                    RM {(order.price * order.quantity).toFixed(2)}
                  </td>
                  <td style={tdStyle}>{order.seat}</td>
                  <td style={tdStyle}>{order.eventLocation}</td>
                  <td style={tdStyle}>{order.eventTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// 表格样式
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const thStyle = {
  padding: "12px",
  backgroundColor: "#eac7d4",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};
