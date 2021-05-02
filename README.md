## 项目地址

[线上地址](http://8.130.24.49/)

[前端源码](https://github.com/nineSean/course-system-client)

[后端源码](https://github.com/nineSean/course-system-server)

## 技术栈

TypeScript + Express + Mongoose

### 难点

本项目一共实现了 7 个接口，旨在使用 Node.js 实践服务端开发。主要难点和重点是实践服务端的分层思想，下文项目架构将详细分析。

## 项目架构

下图为通用的服务端结构分层及数据流：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/291560/1619875994445-54dbf744-6840-4a80-832b-e058517685bd.png#height=797&id=lXlWi&margin=%5Bobject%20Object%5D&name=image.png&originHeight=797&originWidth=1177&originalType=binary&size=228820&status=done&style=none&width=1177)

本项目借鉴此分层，简化项目架构如下：

![course mvc in nodejs.png](https://cdn.nlark.com/yuque/0/2021/png/291560/1619951105740-2e1c6cdf-f10e-4da3-b8e7-c95d4a603a56.png#height=593&id=A8XSt&margin=%5Bobject%20Object%5D&name=course%20mvc%20in%20nodejs.png&originHeight=593&originWidth=631&originalType=binary&size=41461&status=done&style=none&width=631)

- Router：路由层，根据 API 路由到不同 Controller
- Controller：控制层，处理 HTTP 请求，收集参数，检查参数类型和合法性，并调用相应的 Service
- Auth middleware：鉴权层，提供 API 鉴权服务
- Service：服务层，处理业务逻辑（由于业务过于简单，所以去掉了该层）
- Model：数据层，与数据库交互

## RESTful API

RESTful 风格的 API，在 HTTP 中的应用为：使用动宾结构描述接口，动词为 HTTP 中的 methods，宾语名词为服务端资源即 URI。

一句话很形象的话来解释RESTful API ：通过指定的方法操作服务端资源。

例如符合 RESTful 风格的登录、登出接口应该如何设计呢？首先找要操作的服务端资源，这里我们可以认为 session 是登录、登出要操作的资源，登录使用 post 方法、登出使用 delete 方法。

本项目实现的接口如下：

| feature      | method | path         | note                                                         |
| ------------ | ------ | ------------ | ------------------------------------------------------------ |
| 登录         | post   | /session     |                                                              |
| 登出         | delete | /session     | 只在前端删除 token；后端未实现，更优的方案[可参考此篇总结实现](https://www.yuque.com/ninesean/note/cnecla) |
| 注册         | post   | /user        |                                                              |
| 获取用户信息 | get    | /user        | 请求头携带 token                                             |
| 上传头像     | post   | /user/avatar |                                                              |
| 获取轮播图   | get    | /slide       |                                                              |
| 获取课程列表 | get    | /course      |                                                              |
| 获取指定课程 | get    | /course/:id  |                                                              |

## 接口文档

本项目配置好了 swagger，只需在对应的路由注释，内联进 YAML 格式的语法即可自动生成文档（该方案有点繁琐，所以只写了用户接口，之后需要探索自动生成方案），用户登录接口的语法与文档效果如下：

```yaml
/**
 * @swagger
 * /session:
 *  post:
 *    tags:
 *      - User
 *    summary: 用户登陆
 *    description:
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                example: xiaoming
 *              password:
 *                type: string
 *                example: 123456
 *              confirmPassword:
 *                type: string
 *                example: 123456
 *
 *    responses:
 *      '200':
 *        description: login successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  type: object
 *
 */
```

![login doc.png](https://cdn.nlark.com/yuque/0/2021/png/291560/1619956762046-b5ef057b-8c7b-4691-979a-e959234ff824.png#height=1544&id=jQZwV&margin=%5Bobject%20Object%5D&name=login%20doc.png&originHeight=1544&originWidth=1171&originalType=binary&size=207834&status=done&style=none&width=1171)

## 调试

使用 IntelliJ IDEA IDE 开发，调试代码可作如下配置：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/291560/1619957205610-7daa8232-ec70-4ec1-9524-cfd4c48dce7d.png#height=675&id=hIG4s&margin=%5Bobject%20Object%5D&name=image.png&originHeight=675&originWidth=1070&originalType=binary&size=65204&status=done&style=none&width=1070)

接口调试推荐 Insomnia，数据库操作推荐 Navicat GUI（支持常用数据库）。


## 发布上线

使用阿里云的 ECS ，计划的部署方案如下：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/291560/1619883463312-c67e1545-fff1-4fb9-92ed-1c1891a1d402.png#align=left&display=inline&height=443&margin=%5Bobject%20Object%5D&name=image.png&originHeight=443&originWidth=752&size=26597&status=done&style=none&width=752)

实际部署线上的过程可谓一步一个坑，在本地执行一个脚本实现自动部署的计划落空了（之后肯定得再尝试直至成功）。

最终通过在云服务器执行部署脚本（使用 docker 过程中遇到无法解决问题降级方案了……）。直接使用 pm2 启动接口服务，可以通过 `.yml` 文件进行各种配置，如注入环境变量、实例进程数量等。

数据库服务则直接使用 docker 启动 mongodb。

## 待改进

- [ ] 探索 swagger 自动生成文档方案
- [ ] 添加单元测试
- [ ] 实现 CI CD

## 参考

[Docker 安装 MongoDB](http://runoob.com/docker/docker-install-mongodb.html)

