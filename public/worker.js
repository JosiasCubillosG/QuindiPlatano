self.addEventListener('push', e => {
  const data = e.data.json()
  self.registration.showNotification(data.title, {
      body: data.message,
      icon: 'https://quindiplatanos.s3.amazonaws.com/5ecc3fc467ce857162d88307-logo192x192.png',
      badge:'https://quindiplatanos.s3.amazonaws.com/5ecc3fc467ce857162d88307-logo192x192.png',
      image:data.imageNotification,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
  })
})

self.addEventListener('notificationclick', event => {
  event.notification.close();
  clients.openWindow('https://quindiplatanos.herokuapp.com/options/crops');

});
