import { create } from 'zustand';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../lib/firebase';

interface PresentationState {
  currentPage: number;
  totalPages: number;
  isAdmin: boolean;
  sessionId: string | null;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setSessionId: (id: string) => void;
  initializeSession: (sessionId: string) => void;
}

export const useStore = create<PresentationState>((set) => ({
  currentPage: 1,
  totalPages: 1,
  isAdmin: false,
  sessionId: null,
  
  setCurrentPage: (page) => {
    set({ currentPage: page });
    const { sessionId } = useStore.getState();
    if (sessionId) {
      set(ref(database, `sessions/${sessionId}/currentPage`), page);
    }
  },
  
  setTotalPages: (total) => set({ totalPages: total }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setSessionId: (id) => set({ sessionId: id }),
  
  initializeSession: (sessionId) => {
    set({ sessionId });
    const sessionRef = ref(database, `sessions/${sessionId}`);
    onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.currentPage) {
        set({ currentPage: data.currentPage });
      }
    });
  },
}));