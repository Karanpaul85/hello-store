importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyB2YSdZvfODz38HymDhdlw-n8o4vYTjj1A",
  authDomain: "breaking-news-notification.firebaseapp.com",
  projectId: "breaking-news-notification",
  storageBucket: "breaking-news-notification.appspot.com",
  messagingSenderId: "472854924420",
  appId: "1:472854924420:web:23a8c1812625004b2f46d1",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
