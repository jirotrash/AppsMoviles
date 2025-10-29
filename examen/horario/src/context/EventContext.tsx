import React, { createContext, useCallback, useState, ReactNode } from 'react';

export type EventItem = {
  id: string;
  title: string;
  description?: string;
  date?: string;
};

type EventContextType = {
  events: EventItem[];
  addEvent: (e: Omit<EventItem, 'id'>) => void;
  getEvent: (id: string) => EventItem | undefined;
};

export const EventContext = createContext<EventContextType>({
  events: [],
  addEvent: () => {},
  getEvent: () => undefined,
});

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventItem[]>([]);

  const addEvent = useCallback((e: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = { id: Date.now().toString(), ...e };
    setEvents(prev => [newEvent, ...prev]);
  }, []);

  const getEvent = useCallback((id: string) => events.find(ev => ev.id === id), [events]);

  return (
    <EventContext.Provider value={{ events, addEvent, getEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
