"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mockTickets } from "../../mockData";
import "./ReportsPage.css"; 

export default function ReportsPage() {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // 模拟销量
    const grouped = mockTickets.reduce((acc, ticket) => {
      const sold = Math.floor(Math.random() * ticket.quantity);
      const revenue = sold * ticket.price;

      if (!acc[ticket.eventTitle]) {
        acc[ticket.eventTitle] = {
          eventTitle: ticket.eventTitle,
          totalRevenue: 0,
          totalSold: 0,
        };
      }
      acc[ticket.eventTitle].totalRevenue += revenue;
      acc[ticket.eventTitle].totalSold += sold;
      return acc;
    }, {});
    setReportData(Object.values(grouped));
  }, []);

  // Summary 计算
  const totalRevenue = reportData.reduce((sum, e) => sum + e.totalRevenue, 0);
  const totalTickets = reportData.reduce((sum, e) => sum + e.totalSold, 0);
  const avgTicketPrice = totalTickets ? (totalRevenue / totalTickets).toFixed(2) : 0;

  return (
    <div className="rp-wrapper">
      <h1 className="rp-title">📊 Sales Reports</h1>

      {/* KPI */}
      <div className="rp-kpi-grid">
        <div className="rp-card rp-kpi">
          <div className="rp-kpi-label">Total Revenue</div>
          <div className="rp-kpi-value rp-green">RM {totalRevenue.toLocaleString()}</div>
        </div>
        <div className="rp-card rp-kpi">
          <div className="rp-kpi-label">Tickets Sold</div>
          <div className="rp-kpi-value rp-blue">{totalTickets.toLocaleString()}</div>
        </div>
        <div className="rp-card rp-kpi">
          <div className="rp-kpi-label">Avg Ticket Price</div>
          <div className="rp-kpi-value rp-purple">RM {avgTicketPrice}</div>
        </div>
      </div>

      {/* 图表 */}
      <div className="rp-grid-2">
        <div className="rp-card">
          <div className="rp-card-title">Event Revenue</div>
          <div className="rp-chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData}>
                <XAxis dataKey="eventTitle" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalRevenue" radius={[8, 8, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rp-card">
          <div className="rp-card-title">Tickets Sold</div>
          <div className="rp-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData}
                  dataKey="totalSold"
                  nameKey="eventTitle"
                  outerRadius={110}
                  label={(e) => `${e.eventTitle} (${e.totalSold})`}
                >
                  {reportData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#6366f1", "#f97316", "#22c55e", "#eab308", "#06b6d4", "#8b5cf6"][i % 6]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 表格 */}
      <div className="rp-card">
        <div className="rp-card-title">Detailed Report</div>
        <div className="rp-table-wrap">
          <table className="rp-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Tickets Sold</th>
                <th>Total Revenue (RM)</th>
                <th>Avg Price</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, i) => (
                <tr key={i}>
                  <td className="rp-td-event">{row.eventTitle}</td>
                  <td className="rp-td-center">{row.totalSold.toLocaleString()}</td>
                  <td className="rp-td-center">{row.totalRevenue.toLocaleString()}</td>
                  <td className="rp-td-center">
                    {row.totalSold ? (row.totalRevenue / row.totalSold).toFixed(2) : "-"}
                  </td>
                </tr>
              ))}
              {reportData.length === 0 && (
                <tr>
                  <td colSpan="4" className="rp-td-empty">No data</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="rp-td-center">{totalTickets.toLocaleString()}</td>
                <td className="rp-td-center">{totalRevenue.toLocaleString()}</td>
                <td className="rp-td-center">{avgTicketPrice || "-"}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
