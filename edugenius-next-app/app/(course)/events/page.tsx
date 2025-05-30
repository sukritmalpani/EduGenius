"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Event {
  title: string;
  location: string;
  date: string;
  link: string;
  type: "hackathon" | "meetup";
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState<"all" | "hackathon" | "meetup">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterAndSortEvents();
  }, [events, searchTerm, eventType, sortBy]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const filterAndSortEvents = () => {
    let filtered = events.filter((e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (eventType !== "all") {
      filtered = filtered.filter((e) => e.type === eventType);
    }

    filtered.sort((a, b) =>
      sortBy === "date"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : a.title.localeCompare(b.title)
    );

    setFilteredEvents(filtered);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Latest Meetups and Hackathons
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />

        <Select value={eventType} onValueChange={(v) => setEventType(v)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="hackathon">Hackathons</SelectItem>
            <SelectItem value="meetup">Meetups</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ul>
        {filteredEvents.map((e) => (
          <li key={e.title}>{e.title}</li>
        ))}
      </ul>
    </div>
  );
}
