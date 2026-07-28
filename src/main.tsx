import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 1. Create a native DOM mounting anchor for the system notice toast overlay
const notificationAnchorId = 'meherah-system-toast-layer';
let toastContainer = document.getElementById(notificationAnchorId);
if (!toastContainer) {
  toastContainer = document.createElement('div');
  toastContainer.id = notificationAnchorId;
  toastContainer.className = 'fixed bottom-16 right-6 z-[9999] space-y-3 pointer-events-none font-mono';
  document.body.appendChild(toastContainer);
}

// 2. High-visibility UI banner constructor for network state changes
function showSystemNetworkToast(message: string, isOnline: boolean) {
  if (!toastContainer) return;
  
  // Wipe out existing transient toasts before redrawing
  toastContainer.innerHTML = '';

  const toastCard = document.createElement('div');
  toastCard.className = `p-4 rounded-lg border shadow-2xl transition-all duration-300 pointer-events-auto transform translate-y-0 flex items-center space-x-3 text-xs text-white ${
    isOnline 
      ? 'bg-emerald-950/95 border-emerald-500 shadow-emerald-900/30' 
      : 'bg-rose-950/95 border-rose-500 shadow-rose-900/30 animate-pulse'
  }`;

  toastCard.innerHTML = `
    <div class="h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-rose-400'}"></div>
    <div class="flex-1">
      <span class="font-bold tracking-wider block">${isOnline ? 'NETWORK ONLINE' : 'OFFLINE MODE ACTIVE'}</span>
      <span class="text-slate-400 block mt-0.5">${message}</span>
    </div>
  `;

  toastContainer.appendChild(toastCard);

  // Automatically fade out positive connection sync prompts after 4 seconds
  if (isOnline) {
    setTimeout(() => {
      toastCard.style.opacity = '0';
      setTimeout(() => toastCard.remove(), 300);
    }, 4000);
  }
}

// 3. Operational Browser Listener Initializations
window.addEventListener('online', () => {
  showSystemNetworkToast('Connection re-established. Synchronizing local operations cache with PostgreSQL cloud...', true);
});

window.addEventListener('offline', () => {
  showSystemNetworkToast('Local payment simulators, Knowledge Mesh, and File Manager active via secure Service Worker fallback.', false);
});

// 4. Initial network check trigger on launch sequence
if (!navigator.onLine) {
  showSystemNetworkToast('System initialized in local container sandbox isolation.', false);
}

// 5. Native mounting execution
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
