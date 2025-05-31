importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB988uKta8NW8qFKU5Bi4korIiukCKethA",
  authDomain: "kgu-life-watch.firebaseapp.com",
  projectId: "kgu-life-watch",
  storageBucket: "kgu-life-watch.appspot.com",
  messagingSenderId: "889480333790",
  appId: "1:889480333790:web:78cfe6b6f8b5840f68754f",
  measurementId: "G-TSMGPLM6XT"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[SW] 백그라운드 메시지 수신:', payload);

  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
    const isForeground = clients.some(client =>
      client.focused || client.visibilityState === 'visible'
    );

    if (isForeground) {
      console.log('[SW] 포그라운드에서 이미 처리되므로 무시함');
      return;
    }

    clients.forEach(client => {
      client.postMessage({ type: 'BACKGROUND_MESSAGE', payload });
    });
  });
});
