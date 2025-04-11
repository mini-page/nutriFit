tsx
import React from 'react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
}

interface JournalEntryListProps {
  entries: JournalEntry[];
}

const JournalEntryList: React.FC<JournalEntryListProps> = ({ entries }) => {
  return (
    <div>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id} className="mb-4 p-4 border rounded-md">
              <h3 className="font-semibold">{entry.title}</h3>
              <p className="text-sm text-gray-500">{entry.date.toLocaleDateString()}</p>
              <p className="mt-2">{entry.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JournalEntryList;