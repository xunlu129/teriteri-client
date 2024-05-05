## 安装运行

[Past Releases of Elastic Stack Software | Elastic](https://www.elastic.co/cn/downloads/past-releases#elasticsearch)

将下载好的 `elasticsearch-7.17.16-linux-x86_64.tar.gz` 文件放到 `/usr/local/soft` 目录下

```bash
tar -zxvf elasticsearch-7.17.16-linux-x86_64.tar.gz		# 解压
```

配置环境变量：

```bash
vim /etc/profile

# 如果/etc/bashrc文件不可编辑，需要修改为可编辑
chmod -v u+w /etc/environment

# 在最后一行加上
export ES_JAVA_HOME=/usr/local/soft/elasticsearch-7.17.16/jdk
```

> 注意事项：
>
> - 生效时间：新开终端生效，或者手动 `source /etc/environment` 生效
>
> - 生效期限：永久有效
>
> - 生效范围：对所有用户有效

修改主配置文件 `elasticsearch.yml`：

```bash
cd /usr/local/soft/elasticsearch-7.17.16

vim config/elasticsearch.yml

# ES开启远程访问
network.host: 0.0.0.0

# 设置主节点（一个集群设一个就行）
node.master: true

# 配置发现设置
discovery.seed_hosts: ["127.0.0.1"]		# "127.0.0.1"可以改为外网ip
cluster.initial_master_nodes: ["node-1"]

# 跨域问题
http.cors.enabled: true
http.cors.allow-origin: "*"

# 允许请求头携带密码访问
http.cors.allow-headers: Authorization

# 开启密码访问
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
```

修改JVM配置：

修改`config/jvm.options`配置文件，调整JVM堆内存大小

```bash
-Xms1g
-Xmx1g
```

> - **注意：**
>
> 启动 `elasticsearch` 不能使用 root 用户

创建新用户：

```bash
sudo useradd -m -s /bin/bash username	# 创建

sudo passwd username	# 设置密码

sudo usermod -aG root username	# 添加该用户到管理员组

# 切换到root用户
chmod -R g+rwx /usr/local/soft/elasticsearch-7.17.16	# 赋予组对该目录及其子目录的读写权
```

**启动：**

```bash
# 在/usr/local/soft/elasticsearch-7.17.16目录下
bin/elasticsearch

# 后台启动
bin/elasticsearch -d
```

常见启动报错：

1. **max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]**

```bash
# 编辑/etc/sysctl.conf文件，在最后添加一行
vm.max_map_count=262144

# 重启
sudo sysctl -p
```

2. **the default discovery settings are unsuitable for production use; at least one of [discovery.seed_hosts, discovery.seed_providers, cluster.initial_master_nodes] must be configured**

```bash
# 在 elasticsearch.yml 配置文件中，添加如下内容：
discovery.seed_hosts: ["127.0.0.1"]		# "127.0.0.1"可以改为外网ip
cluster.initial_master_nodes: ["node-1"]
```

**设置密码：**

执行设置用户名和密码的命令，这里需要为4个用户分别设置密码，elastic, kibana, logstash_system, beats_system

```bash
bin/elasticsearch-setup-passwords interactive
```

```bash
[xunlu@xunlu-20231103 elasticsearch]$ bin/elasticsearch-setup-passwords interactive
Initiating the setup of passwords for reserved users elastic,apm_system,kibana,kibana_system,logstash_system,beats_system,remote_monitoring_user.
You will be prompted to enter passwords as the process progresses.
Please confirm that you would like to continue [y/N]y

Enter password for [elastic]: 
Reenter password for [elastic]: 
Enter password for [apm_system]: 
Reenter password for [apm_system]: 
Enter password for [kibana_system]: 
Reenter password for [kibana_system]: 
Enter password for [logstash_system]: 
Reenter password for [logstash_system]: 
Enter password for [beats_system]: 
Reenter password for [beats_system]: 
Enter password for [remote_monitoring_user]: 
Reenter password for [remote_monitoring_user]: 
Changed password for user [apm_system]
Changed password for user [kibana_system]
Changed password for user [kibana]
Changed password for user [logstash_system]
Changed password for user [beats_system]
Changed password for user [remote_monitoring_user]
Changed password for user [elastic]
```

其中，用户权限分别如下：

- elastic 账号：拥有 superuser 角色，是内置的超级用户。
- kibana 账号：拥有 kibana_system 角色，用户 kibana 用来连接 elasticsearch 并与之通信。Kibana 服务器以该用户身份提交请求以访问集群监视 API 和 .kibana 索引。不能访问 index。
- logstash_system 账号：拥有 logstash_system 角色。用户 Logstash 在 Elasticsearch 中存储监控信息时使用。

修改密码命令如下（新密码为123456）：

```bash
curl -H "Content-Type:application/json" -XPOST -u elastic 'http://127.0.0.1:9200/_xpack/security/user/elastic/_password' -d '{ "password" : "123456" }'
```

ElasticSearch设置用户名密码之后，不能再直接使用ElasticSearch head 访问，可以在查询等API上加上用户等参数：

```bash
curl -XGET --user user:passwd 'http://XXXX:9200/XX/XXX'
```

如果忘记密码：

1. 修改elasticsearch.yml 配置，将身份验证相关配置屏蔽掉；

2. 重启ES,查看下索引,发现多了一个.security-7索引，将其删除

   ```bash
   curl -XDELETE 'http://127.0.0.1:9200/.security-7'
   ```

3. 到此就回到ES没有设置密码的阶段了，如果想重新设置密码，请从头开始

**安全并正确地关闭或重启Elasticsearch：**

> elasticsearch本身具有高可用性，可以做到停机不停服务，在重启elasticsearch后可能存在数据丢失，或者是“启动ES后，怎么一直有大量的数据在迁移？”

原因有两点：

ES中的数据不是实时写入磁盘的。

- 数据进入ES后先进入data buffer segment和transientLog这两个buffer，（此处又涉及到数据防丢失的机制）然后进入操作系统文件系统缓存的数据段，最后再特定时机（两个条件，一个是segment到达容量，一个是到达refresh时间间隔）下才刷入磁盘。即在内存中有很多数据是没写入磁盘的。

- ES的分片自动分配迁移机制。当集群发现经过一分钟后（index.unassigned.node_left.delayed_timeout参数设置）还连接不上某个节点，就会把集群内的数据重新进行分布，即使后来节点重新连接上，原来的数据因为重新分布也无效了。

设置集群重新分配的类型，使用`cluster.routing.allocation.enable`设置选项。

启用或禁用分片重新分配的类型：

- `all` - (默认) 允许所有类型分片重新分配
- `primaries` - 只允许主分片重新分配
- `new_primaries `- 只允许新索引的主分片重新分配
- `none` - 所有索引的任何类型分片不被允许重新分配

```bash
# 1 关闭分片分配
PUT _cluster/settings
{
  "persistent": {
    "cluster.routing.allocation.enable": "none"
  }
}

# 2 停止索引并执行同步刷新
POST _flush/synced

# 3 暂时停止机器学习和数据仓库相关任务
POST /_ml/set_upgrade_mode?enabled=true&pretty

# 4 关闭所有节点
# 查看进程pid
ps -ef|grep elasticsearch
# 杀死进程及其子进程
kill -SIGTERM 2510857 2510909
# 或者直接根据进程名杀死所有进程
pkill -f elasticsearch

# 5 重启
bin/elasticsearch -d

# 6 启用分片自动分布
PUT _cluster/settings
{ 
  "persistent": {
    "cluster.routing.allocation.enable": null
  }
}
```

- 注：开放9200端口

查看ES服务端状态：

```bash
curl -XGET http://114.514.19.19:9200
curl -XGET http://114.514.19.19:9200/_cluster/health
```



## 客户端 Kibana

[Past Releases of Elastic Stack Software | Elastic](https://www.elastic.co/cn/downloads/past-releases#kibana)

- **注意：kibana装在计算机本地就好，装服务器会占用大量内存和CPU**

> 装本地计算机的↓
>
> 修改 配置文件 `kibana.yml`
>
> ```bash
> # elasticsearch的访问地址
> elasticsearch.hosts: ["http://127.0.0.1:9200"]
> 
> # kibana的访问账户密码
> elasticsearch.username: "kibana_system"
> elasticsearch.password: "pass"
> 
> # kibana汉化
> i18n.locale: "zh-CN"
> ```
>
> 双击 `bin/kibana.bat` 启动

> 装服务器的↓
>
> 同样解压到 `/usr/local/soft` 目录下并且修改读写权限。
>
> 修改 `kibana.yml`
>
> **后台启动：**
>
> ```bash
> nohup bin/kibana &
> ```
>
> **关闭kibana进程：**
>
> ```bash
> # 查看5601端口进程
> netstat -nlp|grep 5601
> 
> # 杀掉
> kill -9 2525782
> ```
>

kibana启动好后，可以访问 http://localhost:5601/



## 分词插件安装

- IK分词器：[Releases · infinilabs/analysis-ik (github.com)](https://github.com/infinilabs/analysis-ik)
- pinyin分词器：[Releases · infinilabs/analysis-pinyin (github.com)](https://github.com/infinilabs/analysis-pinyin)

将zip压缩包上传到 plugins 目录

```bash
unzip elasticsearch-analysis-ik-7.17.16.zip -d analysis-ik		# 解压

rm elasticsearch-analysis-ik-7.17.16.zip		# 删除压缩包
```

测试分词：

```bash
GET _analyze
{
	"analyzer": "ik_max_word",
	"text": "原神生日会"
}
```



## 基本概念

### 关系型数据库 vs ES

- 在7.0之前，一个index可以设置多个Types
- 目前Type已经被Deprecated，7.0开始，一个索引只能创建一个Type - "_doc"
- 传统关系型数据库和ElasticSearch的区别：
  - ElasticSearch - Schemaless / 相关性 / 高性能全文检索
  - RDMS - 事务性 / Join

![image-20240213213632758](elasticsearch.assets/image-20240213213632758.png)

注：弱化了之后，表概念上升到index，即一个表对应一个index。

### 文档（Document）

- ElasticSearch是面向文档的，文档是所有可搜索数据的最小单位。
- 文档会被序列化成JSON格式，保存在ElasticSearch中。
- 每个文档都有唯一ID，可以自己指定也可以由ES自动生成。
- 一篇文档包含了一系列字段，类似数据库表中的一条记录。
- JSON文档，格式灵活，不需要预先定义格式

#### 文档元数据

元数据，用于标注文档的相关信息：

- _index: 文档所属的索引名
- _type: 文档所属的类型名
- _id: 文档的唯一ID
- _source: 文档的原始JSON数据
- _version: 文档的版本号，修改删除操作\_version都会自增1
- _seq_no: 和\_version一样，一旦数据发生改变，数据也一直是累计的。Shard级别严格递增，保证后写入的Doc的\_seq_no大于先写入的Doc的\_seq_no
- _primary_term: _primary_term主要是用来恢复数据时处理当多个文档的\_seq_no一样时的冲突，避免Primary Shard上的写入被覆盖。每当Primary Shard发生重新分配时，比如重启，Primary选举等，\_primary_term会自增1。

#### 并发场景下修改文档

\_seq_no和_primary_term是对\_version的优化，7.x版本的ES默认使用这种方法控制版本，所以当在高并发环境下使用乐观锁机制修改文档时，要带上当前文档的\_seq_no和\_primary_term进行更新：

```bash
POST /test/_doc/2?if_seq_no=21&if_primary_term=6
{
	"name": "张三"
}
```

如果版本号不对会发生冲突



## 索引操作

[Elasticsearch Guide [7.17] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index.html)

索引命名必须小写字母，不能以下划线开头

格式：`PUT /索引名称`

```bash
# 创建索引
PUT /test

# 创建索引时可以设置分片数和副本
PUT /test
{
	"settings": {
		"number_of_shards": 3,
		"number_of_replicas": 2
	}
}

# 修改索引配置
PUT /video/_settings
{
	"index": {
		"number_of_replicas": 1
	}
}

# 查询索引
GET /test
GET /test/_settings

# test 是否存在
HEAD /test

# 删除索引
DELETE /test
```



## 文档操作

示例数据

```bash
PUT /test
{
	"settings": {
		"index": {
			"analysis.analyzer.default.type": "ik_max_word"
		}
	}
}

PUT /test/_doc/5
{
	"title": "此......此视频无人能白嫖！",
	"mc_id": "douga",
	"sc_id": "mad",
	"tags": "动画\r\nAMV\r\nMAD·AMV\r\nMAD\r\n治愈向\r\n综漫\r\n音乐\r\n剪辑\r\n动漫\r\n新人向\r\n",
	"descr": "孜然胳肢窝,刘茜悦 - 别让我等待\n看完这个视频吧，真的很用心做了，喜欢的关注一下吧~~\n感谢审核 运营大大\n\n转载自：https://www.bilibili.com/video/BV1PZ4y1p743"
}

PUT /test/_doc/6
{
	"title": "芭芭拉冲呀！",
	"mc_id": "fashion",
	"sc_id": "cos",
	"tags": "cos\r\n芭芭拉\r\n原神\r\n二次元\r\n害羞7\r\n海边\r\n仿妆cos\r\n动漫\r\n",
	"descr": "别不开心~请你看海\n啦 啦啦啦啦 啦啦啦啦 啦啦\n\n拍摄：岩酱\n后勤：鱼鱼 欣欣\nBGM：Kiss me More\n\n转载自：https://www.bilibili.com/video/BV1va411g7pg"
}

PUT /test/_doc/19
{
	"title": "【原神生日会】别让我担心",
	"mc_id": "music",
	"sc_id": "original",
	"tags": "原神\r\n原神生日会\r\n原创音乐\r\n派蒙\r\n旅行者\r\n同人曲\r\nchilichill\r\n治愈\r\n音乐\r\n",
	"descr": "送你一朵纯白色的花\n生长在清冷而风急的高处\n也是我们旅行开始的地方\n\n演唱：\n派蒙 —— 多多poi\n\n词曲、音乐制作：ChiliChill\n编曲：頼暐哲、ChiliChill\nMV：KKOMDA and Frank\n人声录音棚：Cashmere Studio\n\n伴奏下载：https://pan.baidu.com/s/1Kz_vCRj2h9Hmj9NUc8di5g?pwd=yp3z 提取码: yp3z\n\n转载自：https://www.bilibili.com/festival/genshin3rd?bvid=BV1Yj41187gS"
}

PUT /test/_doc/20
{
	"title": "【原神生日会】神里绫华应援曲《FUTURE WING》",
	"mc_id": "music",
	"sc_id": "original",
	"tags": "原神\r\n原神生日会\r\n神里绫华\r\n原创音乐\r\n美依礼芽\r\nFUTURE WING\r\nMV\r\nGARNiDELiA\r\n燃起来了\r\n",
	"descr": "我们以《原神》中的神里绫华为灵感来源创作的应援曲《FUTURE WING》上线啦！\n\n这首歌由MARiA作词，toku作曲&编曲，一起演绎一段不惧未来，自由飞翔的旅程，希望可以为同样喜爱神里绫华的你们，增添些许追逐梦想的勇气。\n\n祝《原神》三周年生日快乐！如果大家喜欢这首歌，请为它一键三连吧！\n\n转载自：https://www.bilibili.com/festival/genshin3rd?bvid=BV1dp4y1F7yo"
}

PUT /test/_doc/25
{
	"title": "【雪柔】拜托～圣诞节和我一起过吧❤️",
	"mc_id": "dance",
	"sc_id": "otaku",
	"tags": "宅舞\r\n圣诞节\r\n可爱\r\n圣诞舞蹈派对\r\n染上你的颜色\r\n",
	"descr": "圣诞节有我在你就不是一个人哟~\n\n转载自：https://www.bilibili.com/video/BV1oC4y1K7iF"
}
```

### 添加文档

- 格式：`[PUT | POST] /索引名称/[_doc | _create]/id`

```bash
# 创建文档，指定id
# 如果id不存在，创建新文档，否则先删除现有文档，再创建新文档，版本会增加
PUT /test/_doc/5
{
	"title": "此......此视频无人能白嫖！",
	"mc_id": "douga",
	"sc_id": "mad",
	"tags": "动画\r\nAMV\r\nMAD·AMV\r\nMAD\r\n治愈向\r\n综漫\r\n音乐\r\n剪辑\r\n动漫\r\n新人向\r\n",
	"descr": "孜然胳肢窝,刘茜悦 - 别让我等待\n看完这个视频吧，真的很用心做了，喜欢的关注一下吧~~\n感谢审核 运营大大\n\n转载自：https://www.bilibili.com/video/BV1PZ4y1p743"
}

# 创建文档，ES生成id
POST /test/_doc
{
	"title": "此......此视频无人能白嫖！",
	"mc_id": "douga",
	"sc_id": "mad",
	"tags": "动画\r\nAMV\r\nMAD·AMV\r\nMAD\r\n治愈向\r\n综漫\r\n音乐\r\n剪辑\r\n动漫\r\n新人向\r\n",
	"descr": "孜然胳肢窝,刘茜悦 - 别让我等待\n看完这个视频吧，真的很用心做了，喜欢的关注一下吧~~\n感谢审核 运营大大\n\n转载自：https://www.bilibili.com/video/BV1PZ4y1p743"
}
```

- **区别**：**POST和PUT搭配_doc**都能起到**创建/更新**的作用，**PUT**需要对一个具体的资源进行操作也就是**要确定id**才能进行更新/创建，而**POST**是**可以**针对整个资源集合进行操作的，如果**不写id**就由ES生成一个唯一id进行创建新文档，如果填了id那就针对这个id的文档进行创建/更新。
- _create只能创建，如果id存在就会创建失败。

### 修改文档

- 全量更新，整个json都会替换，格式：`[PUT | POST] /索引名称/_doc/id`

如果文档存在，现有文档会被删除，新文档会被索引

- 使用_update部分更新，格式：`[PUT | POST] /索引名称/_update/id`

update不会删除原来的文档，而是实现真正的数据更新

```bash
# 部分更新，在原有文档上更新
# update -文档必须已经存在，更新只会对相应字段做增量修改
POST /test/_update/5
{
	"doc": {
		"title": "此视频无人能白嫖！"
	}
}
```

如果更新前后数据没有变化，**版本号也不会变化**

- 使用_update_by_query先查后更，格式：`[PUT | POST] /索引名称/_update_by_query`

```bash
# 先查后更
POST /test/_update_by_query
{
	"query": {
		"match": {
			"_id": 5
		}
	},
	"script": {
		"source": "ctx._source.title = '此......此视频无人能白嫖！'"
	}
}
```

这种方式即使数据没有变化，**版本号也会增加**

### 查询文档

- 根据id查询，格式：`GET /索引名称/_doc/id`

```bash
GET /test/_doc/5
```

- 条件查询_search，格式：`GET /索引名称/_search`

```bash
# 查询前十条文档
GET /test/_search

# query精确查询
GET /test/_search
{
  "query": {
    "term": {
      "tags": {
        "value": "音乐"
      }
    }
  }
}

GET /test/_search
{
  "query": {
    "match": {
      "title": "原"
    }
  }
}
```

ES Search API提供了两种条件查询搜索方式：

- REST风格的请求URL，直接将参数带过去
- 封装到request body中，这种方式可以定义更加易读的JSON格式

```bash
# 通过URI搜索，使用"q"指定查询字符串，"query string syntax"KV键值对

# 条件查询，如要查询age等于28岁的 _search?q=*:***
GET /test/_doc/_search?q=age:28

# 范围查询，如要查询age在25至26岁之间的 _search?q=***[** TO **] 注意:TO必须为大写
GET /test/_doc/_search?q=age[25 TO 26]

# 查询年龄小于等于28岁的 :<=
GET /test/_doc/_search?q=age:<=28
#查询年龄大于28前的 :>
GET /test/_doc/_search?q=age:>28

#分页查询from=*&size=*
GET /test/_doc/_search?q=age[25 TO 26]&from=0&size=1

#对查询结果只输出某些字段 _source=字段,字段
GET /test/_doc/_search?_source=name,age

#对查询结果排序sort=字段:desc /asc
GET /test/_doc/_search?sort=age:desc
```

### 删除文档

格式：`DELETE /索引名称/_doc/id` 

```bash
DELETE /test/_doc/5
```

### 批量写入

批量对文档进行写操作是通过\_bulk的API来实现的

- 请求方式：POST
- 请求地址：\_bulk
- 请求参数：通过_bulk操作文档，一般至少有两行参数（或偶数行参数）
  - 第一行参数为指定操作的类型及操作的对象（index，type和id）
  - 第二行参数才是操作的数据

参数类似于：

```bash
{"actionName":{"_index":"indexName","_type":"typeName","_id":"id"}}
{"field1":"value1","fie1d2":"value2"}
```

- actionName: 表示操作类型，主要有create,index,delete和update

#### 批量创建文档 create

```bash
POST /_bulk
{"create":{"_index":"test2", "_type":"_doc", "_id":1}}
{"id":1, "name":"teriteri", "sex":2, "description":"teriteri官方账号"}
{"create":{"_index":"test2", "_type":"_doc", "_id":2}}
{"id":2, "name":"寻鹿", "sex":1, "description":"世界拯救摆烂宅"}
```

#### 普通创建或全量替换 index

```bash
POST /_bulk
{"index":{"_index":"test2", "_type":"_doc", "_id":1}}
{"id":1, "name":"teriteri", "sex":2, "description":"teriteri官方账号"}
{"index":{"_index":"test2", "_type":"_doc", "_id":2}}
{"id":2, "name":"寻鹿", "sex":1, "description":"世界拯救摆烂宅"}
```

#### 批量删除 delete

```bash
POST /_bulk
{"delete":{"_index":"test2", "_type":"_doc", "_id":1}}
{"delete":{"_index":"test2", "_type":"_doc", "_id":2}}
```

#### 批量修改 update

```bash
POST /_bulk
{"update":{"_index":"test2", "_type":"_doc", "_id":1}}
{"doc":{"description":"特丽丽官方账号"}}
{"update":{"_index":"test2", "_type":"_doc", "_id":2}}
{"doc":{"description":"技术宅拯救世界"}}
```

四种写入操作可以组合运用

### 批量读取

ES的批量查询可以使用mget和msearch两种。其中mget是需要我们知道它的id，可以指定不同的index，也可以指定返回值source。msearch可以通过字段查询来进行一个批量的查找。

#### _mget

```bash
# 可以通过ID批量获取不同index和type的数据
GET _mget
{
	"docs": [
		{
			"_index": "test",
			"_id": 5
		},
		{
			"_index": "test1",
			"_id": 2
		}
	]
}

# 可以通过ID批量获取test的数据
GET /test/_mget
{
	"docs": [
		{
			"_id": 5
		},
		{
			"_id": 6
		}
	]
}

# 简化后
GET /test/_mget
{
	"ids": ["5", "6"]
}
```

#### _msearch

在_msearch中，请求格式和bulk类似。查询一条数据需要两个对象，第一个设置index和type，第二个设置查询语句。查询语句和search相同。如果只是查询一个index，我们可以在url中带上index，这样，如果查该index可以直接用空对象表示。

```bash
GET /test/_msearch
{}
{"query": {"match_all": {}}, "from": 0, "size": 2}
{"index": "test2"}
{"query": {"match_all": {}}}
```



## ES高级查询 Query DSL

### match 模糊匹配

match在匹配时会对所查找的关键词进行分词，然后按分词匹配查找

match支持以下参数:

- query: 指定匹配的值
- operator: 匹配条件类型
  - and: 条件分词后全都要匹配
  - or: 条件分词后有一个匹配即可（默认）

- minmum_should_match: 最低匹配度，即条件在倒排索引中最低的匹配度

```bash
# 模糊匹配	分词后 or 的效果
GET /test/_search
{
  "query": {
    "match": {
      "title": "原神应援曲"
    }
  }
}

# 全部分词都匹配	分词后 and 的效果
GET /test/_search
{
  "query": {
    "match": {
      "title": {
        "query": "原神担心",
        "operator": "and"
      }
    }
  }
}

# 至少匹配三个分词
GET /test/_search
{
  "query": {
    "match": {
      "title": {
        "query": "原神担心应援",
        "minimum_should_match": 3
      }
    }
  }
}
```

### match_phrase 短语查询

match_phrase查询分析文本并根据分析的文本创建一个短语查询。match_phrase 会将检索关键词分词。match_phrase的分词结果必须在被检索字段的分词中都包含，而且顺序必须相同，而且默认必须都是**连续的**。

```bash
# 能查到 "广州白云山公园"
GET /test/_search
{
  "query": {
    "match_phrase": {
      "address": "广州白云山"
    }
  }
}

# 查不到 "广州白云山公园"	因为中间隔了个"白云山"
GET /test/_search
{
  "query": {
    "match_phrase": {
      "address": "广州白云"
    }
  }
}

# 允许跳一个词匹配
GET /test/_search
{
  "query": {
    "match_phrase": {
      "address": {
      	"query": "广州白云",
      	"slop": 2
      }
    }
  }
}
```

### multi_match 多字段查询

可以根据字段类型决定是否使用分词查询，得分最高的在前面

```bash
# 关键词在多个列中存在
GET /test/_search
{
  "query": {
    "multi_match": {
      "query": "原神",
      "fields": [
        "title",
        "tags"
      ]
    }
  }
}
```

### query_string 字符串查询

允许我们在单个查询字符串中指定AND | OR | NOT条件，同时也和multi_match query一样，支持多字段搜索。和match类似，但是match需要指定字段名，query_string是在所有字段中搜索，范围更广泛。

```bash
# 全部字段有符合的
GET /test/_search
{
  "query": {
    "query_string": {
      "query": "原神 OR 舞蹈"
    }
  }
}

# 指定单字段匹配
GET /test/_search
{
  "query": {
    "query_string": {
      "default_field": "title", 
      "query": "原神 OR 圣诞节"
    }
  }
}

# 指定多字段匹配
GET /test/_search
{
  "query": {
    "query_string": {
      "fields": ["title", "tags"], 
      "query": "舞蹈 OR (原神 AND 绫华)"
    }
  }
}
```

简化版：

`simple_query_string`，类似Query String，但是会忽略错误的语法，同时只支持部分查询语法，不支持AND OR NOT，会当作字符串处理。支持部分逻辑：

- \+ 替代 AND
- | 替代 OR
- \- 替代 NOT

```bash
GET /test/_search
{
  "query": {
    "simple_query_string": {
      "query": "神里绫华",
      "fields": ["title", "tags"], 
      "default_operator": "AND"
    }
  }
}

GET /test/_search
{
  "query": {
    "simple_query_string": {
      "query": "神+里+绫+华",
      "fields": ["title", "tags"]
    }
  }
}
```

### term 关键词查询

term用来使用关键词查询（精确匹配），还可以用来查询没有被进行分词的数据类型。term是表达语意的最小单位，搜索和利用统计语言模型进行自然语言处理都需要处理term。match在匹配时会对所查找的关键词进行分词，然后按分词匹配查找，而term会直接对关键词进行查找。一般模糊查找的时候，多用match，而精确查找时可以使用term。

- ES中默认使用分词器为标准分词器(Standard Analyzer)，标准分词器对于英文单词分词友好，对于中文单字分词每字拆分。
- 在ES的Mapping Type 中 keyword , date ,integer, long , double , boolean or ip这些类型不分词，只有text类型分词。

```bash
# 对查找列分词后查询查找关键词，分词后的英文全部会变成小写
GET /test/_search
{
  "query": {
    "term": {
      "title": {
        "value": "future"
      }
    }
  }
}

# 指定列不分词，即将列数据映射为keyword
GET /test/_search
{
  "query": {
    "term": {
      "mc_id.keyword": {
        "value": "music"
      }
    }
  }
}
```

可以通过Constant Score将查询转换成一个Filtering，避免算分，并利用缓存，提高性能。

- 将Query转成 Filter，忽略TF-IDF计算，避免相关性算分的开销
- Filter可以有效利用缓存

```bash
GET /test/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "mc_id.keyword": "music"
        }
      }
    }
  }
}
```

### perfix 前缀搜索

它会对分词后的term进行前缀搜索。

- 它不会分析要搜索字符串，传入的前缀就是想要查找的前缀
- 默认状态下，前缀查询不做相关度分数计算，它只是将所有匹配的文档返回，然后赋予所有相关分数值为1。它的行为更像是一个过滤器而不是查询。两者实际的区别就是过滤器是可以被缓存的，而前缀查询不行。

prefix的原理：需要遍历所有**倒排索引**，并比较每个term是否已所指定的前缀开头。

```bash
GET /test/_search
{
  "query": {
    "prefix": {
      "title": {
        "value": "圣"
      }
    }
  }
}

GET /test/_search
{
  "query": {
    "prefix": {
      "title.keyword": {
        "value": "【原神生日会】"
      }
    }
  }
}
```

### wildcard 通配符查询

通配符查询：工作原理和prefix相同，只不过它不是只比较开头，它能支持更为复杂的匹配模式。

```bash
GET /test/_search
{
  "query": {
    "wildcard": {
      "title": {
        "value": "*诞*"
      }
    }
  }
}
```

### range 范围查询

- gte 大于等于
- lte 小于等于
- gt 大于
- lt 小于
- now 当前时间

```bash
GET /test/_search
{
  "query": {
    "range": {
      "id": {
        "gte": 10,
        "lte": 30
      }
    }
  }
}

# 大于等于两年前的数据
GET /test/_search
{
  "query": {
    "range": {
      "date": {
        "gte": "now-2y"
      }
    }
  }
}
```

### ids 多ID查询

```bash
GET /test/_search
{
  "query": {
    "ids": {
      "values": [5, 6, 7]
    }
  }
}
```

### fuzzy 模糊查询

在实际的搜索中，我们有时候会打错字，从而导致搜索不到。在ElasticSearch中，我们可以使用fuzziness属性来进行模糊查询，从而达到搜索有错别字的情形。

fuzzy查询会用到两个很重要的参数，fuzziness，prefix_length

- **fuzziness**: 表示输入的关键字通过几次操作可以转变成为ES库里面的对应field的字段
  - 操作是指:新增一个字符，删除一个字符，修改一个字符，每次操作可以记做编辑距离为1
  - 如中文集团到中威集团编辑距离就是1，只需要修改一个字符
  - 该参数默认值为0，即不开启模糊查询
  - 如果fuzziness值在这里设置成2，会把编辑距离为2的东东集团也查出来

- **prefix_length**: 表示限制输入关键字和ES对应查询field的内容开头的第n个字符必须完全匹配，不允许错别字匹配。如这里等于1，则表示开头的字必须匹配，不匹配则不返回
  - 默认值也是0
  - 加大prefix_length的值可以提高效率和准确率

```bash
GET /test/_search
{
  "query": {
    "fuzzy": {
      "tags": {
        "value": "万圣节", 
        "fuzziness": 2,
        "prefix_length": 1
      }
    }
  }
}
```

注意：fuzzy 模糊查询最大模糊错误必须在0-2之间

- 搜索关键词长度为2，不允许存在模糊
- 搜索关键词长度为3-5，允许1次模糊
- 搜索关键词长度大于5，允许最大2次模糊











