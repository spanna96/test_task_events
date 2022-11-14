import React, { useEffect, useState, useRef, useCallback } from "react";
import { NoteCard, TableHeader } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import {
  getEventsAction,
  getNotesAction,
  clearStoreAction,
} from "../../redux/actions";
import { Store } from "../../types";

import "./History.css";

function History() {
  const { events, notes, loading } = useSelector((store: Store) => store);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);

  const listNoteRef = useRef<HTMLHeadingElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasMore = events.length > notes.length;

  const lastNoteElementRef = useCallback(
    (node: HTMLHeadingElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prev) => prev + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const getEvents = () => {
    if (!events.length) {
      dispatch(getEventsAction());
    }
  };

  const clearStore = () => {
    dispatch(clearStoreAction());
  };

  const getNotes = (page: number) => {
    if (events.length && hasMore) {
      dispatch(getNotesAction(page));
    }
  };

  useEffect(() => {
    getEvents();

    return () => clearStore();
  }, []);

  useEffect(() => {
    getNotes(currentPage);
  }, [events.length]);

  useEffect(() => {
    getNotes(currentPage);
  }, [currentPage]);

  return (
    <div className="History">
      <TableHeader />
      <div ref={listNoteRef}>
        {notes.map((note, i) => {
          return (
            <div
              key={note.id}
              ref={notes.length === i + 1 ? lastNoteElementRef : null}
            >
              <NoteCard note={note} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
