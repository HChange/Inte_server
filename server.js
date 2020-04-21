const express = require("express");
var colors = require("colors");
const session = require("express-session");
const mongoose = require("mongoose");
const userRouter = require('./routes/userRouter');
const likeRouter = require('./routes/likeRouter');
const collectionRouter = require('./routes/collectionRouter');
const replyRouter = require('./routes/replyRouter');
const followRouter = require('./routes/followRouter');
const postRouter = require('./routes/postRouter');
const MongoDBStore = require("connect-mongodb-session")(session);
const { PORT, DB_PATH, SESSIONID ,MAXAGE} = require("./config/index");
const server = express();

var store = new MongoDBStore({
  uri: DB_PATH,
  collection: "session",
});

store.on("error", function (error) {
  console.log("[Error]".red+error);
});

server.use(express.urlencoded({ urlencoded: false }));
server.use(express.json());

// 配置session
server.use(
  session({
    secret: "%$#@%$#",
    name: SESSIONID,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: MAXAGE,
    },
    store: store,
  })
);


server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/likes", likeRouter);
server.use("/api/follows", followRouter);
server.use("/api/replys", replyRouter);
server.use("/api/collections", collectionRouter);


/**
 *
 * @description 连接数据库后启动服务器
 *
 */
mongoose.connect(
  DB_PATH,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.error("【Error】".red+"连接数据库失败：" + error);
    } else {
      console.log("【Success】".green+"连接数据成功！");
      // 启动成功
      server.listen(PORT, (error) => {
        if (error) {
          console.log("【Error】".red+"服务器启动失败:" + error);
        } else {
          console.log("【Success】".green + "服务器启动成功！");
          console.log("【访问地址】".green + `http://localhost:${PORT}`.cyan);
        }
      });
    }
  }
);

