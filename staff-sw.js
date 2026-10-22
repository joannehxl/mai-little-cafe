// Mai Little Cafe staff PWA foundation.
// No caching of staff or order data.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>{
  if(!event.data)return;
  let data={};try{data=event.data.json()}catch(_){return}
  // Notification payloads must originate from a trusted push sender.
  const title='Mai Little Cafe — New order';
  event.waitUntil(self.registration.showNotification(title,{
    body:'A new website order needs staff review.',
    tag:'mai-new-order',
    renotify:true,
    icon:'./assets/logo.jpeg',
    data:{url:'./staff-queue.html'}
  }));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(self.clients.openWindow(new URL('./staff-queue.html',self.registration.scope).href));
});