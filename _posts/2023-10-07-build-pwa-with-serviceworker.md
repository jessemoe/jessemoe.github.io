---
layout: post
title: 使用Service Worker构建PWA应用
date: 2023-10-07
Author: Jesse 
tags: [web]
comments: true
toc: true
---

 PWA是使用现代 API 构建和增强的 Web 应用程序，可提供增强的功能、可靠性和可安装性，同时可通过单一代码实现跨平台。

## Caching
你可以使用Cache API 下载、存储、删除或更新设备上的资源。然后，可以在设备上提供这些资源，而无需网络请求。
```
caches.open("pwa-assets")
.then(cache => {
  // you can download and store, delete or update resources with cache arguments
});
```
要浏览器下载并存储资源，请使用 add 或 addAll 方法。 add 方法发出请求并存储一个 HTTP 响应，并根据一组请求或 URL 来 addAll 将一组 HTTP 响应作为事务。
```
caches.open("pwa-assets")
.then(cache => {
  cache.add("styles.css"); // it stores only one resource
  cache.addAll(["styles.css", "app.js"]); // it stores two resources
});
```
由于服务工作线程可以随时停止，因此您可以请求浏览器等待 addAll Promise 完成，以增加存储所有资源并保持应用程序一致性的机会
```
const urlsToCache = ["/", "app.js", "styles.css", "logo.svg"];
self.addEventListener("install", event => {
   event.waitUntil(
      caches.open("pwa-assets")
      .then(cache => {
         return cache.addAll(urlsToCache);
      });
   );
});
```

 ## Service Worker 
 Service Worker是 PWA 的基本组成部分。它们支持快速加载（无论网络如何）、离线访问、推送通知和其他功能。
 ![image](https://web-dev.imgix.net/image/RK2djpBgopg9kzCyJbUSjhEGmnw1/iKWO7c2WNobLt30VZx9C.png?auto=format&w=1252)
 当应用程序请求 Service Worker 范围内的资源时（包括用户离线时），Service Worker 会拦截该请求并充当网络代理。

 ### Scope
 Service Worker 所在的文件夹决定了其范围。位于 `example.com/my-pwa/sw.js` 的 Service Worker 可以控制 my-pwa 路径或以下路径的任何导航，例如 `example.com/my-pwa/demos/`
 每个范围仅允许一名 Service Worker。当活动和运行时，无论内存中有多少客户端（例如 PWA 窗口或浏览器页签），通常只有一个实例可用。

 ### Lifecicle
 Service Worker 的生命周期决定了它们的安装方式，这与 PWA 安装是分开的。 Service Worker 的生命周期从注册 Service Worker 开始。
```
// This code executes in its own worker or thread
self.addEventListener("install", event => {
   console.log("Service worker installed");
});
self.addEventListener("activate", event => {
   console.log("Service worker activated");
});
```
### 更新 Service Worker
当浏览器检测到当前控制客户端的 Service Worker 与同一文件的新（来自服务器）版本存在字节不同时，Service Worker 就会得到更新。

## Workbox
Workbox是一个封装好的service worker库，你可以使用他很方便的构建PWA应用

## precache VS runtime cache
