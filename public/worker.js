self.addEventListener('push', e => {
    const data = e.data.json()
    console.log(data)
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://quindiplatanos.s3.amazonaws.com/5ec08c82e07c773c4c78e792-logo.png',
        badge: 'https://quindiplatanos.s3.us-east-2.amazonaws.com/5ec32d6c990c1102f1371c6b-logo%20%281%29%20%281%29.png',
        image: 'https://quindiplatanos.s3.amazonaws.com/5ec08c82e07c773c4c78e792-logo.png',
        sound: 'https://quindiplatanos.s3.us-east-2.amazonaws.com/5ec17266e345f31cbcf6eaec-alarma.mp3',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
    })
})