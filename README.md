# 一个用Springboot + Vue开发的仿B站项目



## 项目：Teriteri

- 使用 java 语言复刻了一个B站，实现了一个弹幕视频网站所具备的大部分功能。
- 采用前后端分离模式开发，web端分为客户端和后台管理。本项目主要实现客户端各功能，后台管理只写了视频审核。
- 项目界面纯手搓，因此开发缓慢，总耗时7个多月。



## 项目地址：

- **视频演示：**
  - [我用 SpringBoot + Vue 复刻了一个B站作为毕设项目(bilibili.com)](https://www.bilibili.com/video/BV1pM4m1D7Vt)

- **后端代码：**
  - [xunlu129/teriteri-backend: 一个基于 springboot + mybatis-plus 搭建的视频网站平台后端 (github.com)](https://github.com/xunlu129/teriteri-backend)

- **客户端代码：**
  - [xunlu129/teriteri-client: 一个基于 vue3 搭建的视频网站平台客户端 (github.com)](https://github.com/xunlu129/teriteri-client)

- **管理员端代码：**
  - [xunlu129/teriteri-admin: 一个基于 vue3 搭建的视频网站平台管理员端 (github.com)](https://github.com/xunlu129/teriteri-admin)

### ==**代码都拿了，顺手帮忙给我视频点个赞，给代码点个star呗，拜托了，这对我真的很重要![0EF500CA](README.assets/0EF500CA.png)**==

### ==**声明：本项目只用作学习参考，无任何商业用途，对于项目中的部分图片来源，我已注明出处，若他人使用本项目造成的侵权问题，本人概不负责**==



## 技术线

- **前端（web端）：**
  - Vue3全家桶 + Element-Plus + Axios等

- **后端（服务端）：**
  - SpringBoot2.7 + MyBatis-Plus + JWT + Netty等

- **数据库：**
  - MySQL + Redis + ElasticSearch7.17.16

- **开发环境：**
  - NodeJs: 16.16.0 + JDK: 1.8



## 项目功能

- **首页视频随机推荐**
- **用户注册登录**
- **个人中心信息修改**
- **视频投稿**
- **视频审核**
- **内容搜索（视频 + 用户）**
- **视频详情页（观看 + 点赞 + 收藏 + 弹幕 + 评论）**
- **消息系统（聊天等）**
- **个人空间（用户作品 + 收藏夹等）**

其他由于时间问题，暂停开发的功能：

- 视频分区
- 用户动态
- 观看历史
- 热门排行
- 数据统计
- 推荐算法



## 代码部署注意事项

- 首先：要体验完整功能，三个端的代码必须版本一致，前端启动依赖后端，所以建议先启动好后端后再启动前端，以防出现一些问题报错。
- 鉴于很多小伙伴对ES都不是很了解，我自己整理了一份ES笔记可供参考：[Elasticsearch笔记](./elasticsearch.md) ，笔记内容部分是在linux系统上操作的，windows上可以对照修改一下。**注意其中要安装两个分词插件。**

### 数据库

1. 除了 category 表是固有数据，其他表我是没有提供数据的。
2. 由于没有初始数据，注册一个新用户后，修改 `user表` 的 `role` 属性为 1 或者 2 ，该用户就是管理员了，方能登录管理员端。
3. 除了第二点以外，其他情况尽量不要直接修改数据库，防止 MySQL 和 Redis 和 ES 数据不一致出问题。

### 后端

1. 在项目根目录下（src同级目录）创建 `public/chunk/` 文件夹，即创建public文件夹后再在里面创建chunk文件夹，用于存储上传的视频分片。如果不创建，在上传视频时会出异常。
2. 项目使用 `阿里云OSS` 存储视频，请自行准备，当然代码也有提供上传本地的方法（已注掉），但是没有写怎么观看视频，要是不嫌麻烦可以自行补写，不过本地视频的话，前端要通过读数据流播放可能非常困难，因此，本人还是建议开通一个阿里云对象存储，省时省力，而且也不贵。
3. 项目使用的 `ElasticSearch` 版本为 `7.17.16`，如果使用其他版本，请更改 `pom.xml` 内对应的 `version` 。ES的索引创建，可以运行测试类 `ApplicationTests` 中的 `createIndex` 方法自动创建。
4. 另外，如果运行测试类 `ApplicationTests` 中的函数时出现 `websocket` 相关的报错，可以先把 `WebSocketConfig` 类里的全部东西注掉，**记得测试完后还原回去**。
5. 项目使用 `application.yml` 文件作为启动配置，因此不要在 `application.properties` 中写东西，或者你把配置信息全部写到pro也行。把 resources 中的 `application` 文件加上后缀 `.yml` 即可，需要根据自己服务器信息填写好其中带 `***` 号的配置信息。**注意个人信息泄露风险！！！**
6. 注意Netty服务占用7071端口，如果需要更换，请在 `IMServer` 类中设置。

准备好以上说的后，就可以启动项目了：

```bash
1、下载Maven依赖

2、启动BackendApplication
```

### 前端

1. 轮播图是在 `carousel.json` 写死的，可以改成你自己的，目前轮播的是我OSS上的资源，我只开了 localhost:8787 的白名单，所以如果服务端口改成其他会出现图片加载失败的情况。
2. 一些图标库可以在阿里巴巴矢量图标库上找，因为现在用的是我创建的图标库，指不定哪天我改几下，旧的图标就用不了了。
3. 注意代理端口号和后端匹配

剩下没什么好注意的，启动就完事了：

```bash
1、下载依赖
npm install

2、启动项目
npm run serve
```

### ==**最后注意一下版权问题**==



## 界面展示

### 网站首页

![image-20240415162456125](README.assets/image-20240415162456125.png)

### 创作中心

![image-20240415165805944](README.assets/image-20240415165805944.png)

![image-20240415170725088](README.assets/image-20240415170725088.png)

![image-20240415170948347](README.assets/image-20240415170948347.png)

### 视频审核

![image-20240415171701224](README.assets/image-20240415171701224.png)

![image-20240415171759941](README.assets/image-20240415171759941.png)

### 视频详情页

![image-20240415173743314](README.assets/image-20240415173743314.png)

![image-20240415174054777](README.assets/image-20240415174054777.png)

### 搜索页面

![image-20240415174815293](README.assets/image-20240415174815293.png)

![image-20240415175047210](README.assets/image-20240415175047210.png)

![image-20240415174616748](README.assets/image-20240415174616748.png)

![image-20240415174842325](README.assets/image-20240415174842325.png)

![image-20240415175335504](README.assets/image-20240415175335504.png)

![image-20240415175456058](README.assets/image-20240415175456058.png)

### 个人中心

![image-20240415175625450](README.assets/image-20240415175625450.png)

![image-20240415175654208](README.assets/image-20240415175654208.png)

![image-20240415175708364](README.assets/image-20240415175708364.png)

### 消息中心

![image-20240415180214595](README.assets/image-20240415180214595.png)