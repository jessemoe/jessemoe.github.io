---
title: {{ Gost教程（一） }}
tags: proxy
categories: proxy
---

配置 Gost 路由转发

你可以使用如下命令来启动 gost 转发规则。下面的命行行意思是，把本地的 8080 端口转发到 Cloudflare WARP 的 Socks5 代理上。

`gost -L "http://:8080" -F "socks5://127.0.0.1:40000"`
当然，上面的配置是不够好的，我们最好使用有证书的 HTTPS 代理。这里的内容参见于 前的面 3.3 用 Gost 设置 HTTPS 服务。

为了使用两种不同的代理，Gost需要启动两个服务：

一个是通过 443 端口直接代理
另一个是通过 8443 端口转发到 Cloudflare WARP 的 Socks5 代理上
# 下面的四个参数需要改成你的
```
DOMAIN="YOU.DOMAIN.NAME"
USER="username"
PASS="password"
PORT=443

BIND_IP=0.0.0.0
CERT_DIR=/etc/letsencrypt
CERT=${CERT_DIR}/live/${DOMAIN}/fullchain.pem
KEY=${CERT_DIR}/live/${DOMAIN}/privkey.pem
sudo docker run -d --name gost \
    -v ${CERT_DIR}:${CERT_DIR}:ro \
    --net=host ginuerzh/gost \
    -L "http2://${USER}:${PASS}@${BIND_IP}:${PORT}?cert=${CERT}&key=${KEY}&probe_resist=code:404&knock=www.google.com"

sudo docker run -d --name gost-warp \
    -v ${CERT_DIR}:${CERT_DIR}:ro \
    --net=host ginuerzh/gost \
    -L "http2://${USER}:${PASS}@${BIND_IP}:8443?cert=${CERT}&key=${KEY}&probe_resist=code:404&knock=www.google.com" -F "socks://localhost:40000"
```
Note

你也可以使用 V2Ray 的路由模式，参见 V2Ray 的路由功能。V2Ray的路由模式就比 gost 要强很多。你还可以通过使用预定义域名列表 geolocation-cn 把其的路由转发到 Cloudflare WARP 的 Socks5 代理上，以避免你的 VPS 的 IP 被暴露。

其它事宜

warp-cli 是 warp-svc 的客户端，真正的程序是 warp-svc，你可以使用如下命令来查看：

`systemctl status warp-svc
`另外，如果你的程序出现文件描述不足的情况：

`warp-cli connect
Status update: Unable to connect. Reason: Insufficient system resource: file descriptor
`
你需要修改文件描述符的限制，这类的文章比较多，你自行 Google，这里就不再赘述了。如果你想配置 Cloudflare WARP 文件描述符的限制，你可以编辑 /lib/systemd/system/warp-svc.service，在 [Service] 下面添加如下内容：
```
[Service]
LimitNOFILE=65535
LimitNOFILESoft=65535
```
