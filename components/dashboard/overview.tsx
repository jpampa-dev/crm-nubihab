"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    leads: 65,
    sales: 4,
  },
  {
    name: "Feb",
    leads: 59,
    sales: 3,
  },
  {
    name: "Mar",
    leads: 80,
    sales: 5,
  },
  {
    name: "Apr",
    leads: 81,
    sales: 6,
  },
  {
    name: "May",
    leads: 56,
    sales: 4,
  },
  {
    name: "Jun",
    leads: 55,
    sales: 3,
  },
  {
    name: "Jul",
    leads: 40,
    sales: 2,
  },
  {
    name: "Aug",
    leads: 45,
    sales: 3,
  },
  {
    name: "Sep",
    leads: 62,
    sales: 4,
  },
  {
    name: "Oct",
    leads: 78,
    sales: 5,
  },
  {
    name: "Nov",
    leads: 85,
    sales: 6,
  },
  {
    name: "Dec",
    leads: 91,
    sales: 7,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="leads" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
