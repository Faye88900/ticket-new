// app/mockData.js

export const mockEvents = [
  {
    id: 1,
    title: "2025 HYERI FANMEETING TOUR <Welcome to HYERI's STUDIO> IN KUALA LUMPUR",
    start_time: "17 Aug 2025 7:00 PM",
    location: "Zepp Kuala Lumpur",
    tickets: [
      { type: "VIP", price: 580 },
      { type: "CAT 1", price: 380 },
      { type: "CAT 2", price: 250 },
    ],
  },
  {
    id: 2,
    title: "SEKAI NO OWARI ASIA TOUR 2025 [Phoenix] in KUALA LUMPUR",
    start_time: "8 Oct 2025 8:00 PM",
    location: "Zepp Kuala Lumpur",
    tickets: [
      { type: "VIP", price: 520 },
      { type: "CAT 1", price: 358 },
    ],
  },
  {
    id: 3,
    title: "陳華 HUA CHEN K《A Journey of Summer Love 》KUALA LUMPUR 2025",
    start_time: "17 Oct 2025 7:30 PM",
    location: "Zepp Kuala Lumpur",
    tickets: [
      { type: "VIP", price: 520, benefit: "Meet & Greet" },
      { type: "CAT 1", price: 238 },
    ],
  },
];

// 自动展开 tickets => mockTickets
export const mockTickets = mockEvents.flatMap((event) =>
  event.tickets.map((ticket, index) => ({
    id: `${event.id}-${index + 1}`, // 唯一ID
    eventId: event.id,
    eventTitle: event.title,
    type: ticket.type,
    price: ticket.price,
    benefit: ticket.benefit || null,
    quantity: ticket.quantity || 100, // 默认100张
  }))
);
