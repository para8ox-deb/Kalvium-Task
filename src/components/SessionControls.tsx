import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { database } from '../lib/firebase';
import { ref, set } from 'firebase/database';

export const SessionControls: React.FC = () => {
  const [newSessionId, setNewSessionId] = useState('');
  const { sessionId, setSessionId, setIsAdmin, initializeSession } = useStore();

  const createSession = async () => {
    if (newSessionId.trim()) {
      await set(ref(database, `sessions/${newSessionId}`), {
        currentPage: 1,
        createdAt: Date.now(),
      });
      setSessionId(newSessionId);
      setIsAdmin(true);
      initializeSession(newSessionId);
    }
  };

  const joinSession = () => {
    if (newSessionId.trim()) {
      setSessionId(newSessionId);
      setIsAdmin(false);
      initializeSession(newSessionId);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newSessionId}
          onChange={(e) => setNewSessionId(e.target.value)}
          placeholder="Enter session ID"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {!sessionId && (
          <div className="flex space-x-2">
            <button
              onClick={createSession}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Session
            </button>
            <button
              onClick={joinSession}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Join Session
            </button>
          </div>
        )}
      </div>
      {sessionId && (
        <div className="text-gray-600">
          Current Session: {sessionId}
        </div>
      )}
    </div>
  );
};