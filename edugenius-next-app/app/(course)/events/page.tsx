// app/events/page.tsx
"use client";

import { useState, useEffect } from "react";

interface Event {
  title: string;
  location: string;
  date: string;
  link: string;
  type: "hackathon" | "meetup";
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Latest Meetups and Hackathons
      </h1>
      <ul>
        {events.map((event) => (
          <li key={event.title}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}
