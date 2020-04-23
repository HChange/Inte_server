const express = require("express");
var colors = require("colors");
const multer = require("multer")
const { UPLOADPORT } = require("./config/index");
const server = express();

server.use(express.urlencoded({ urlencoded: false }));
server.use(express.json());

server.post('/upload', multer({dest: './public/upload_tmp/'}).array('file', 10), function (req, res, next) {

        let files = req.files[0];
        console.log(files);
        // console.log(file);
        
        if (files.length === 0) {
            res.render("error", {message: "上传文件不能为空！"});
            return
        } else {
            // let fileInfos = [];
            // for (var i in files) {
            //     let file = files[i];
            //     let fileInfo = {};

                // fs.renameSync('./public/upload_tmp/' + file.filename, './public/images/' + file.originalname);

                //获取文件基本信息
                // fileInfo.mimetype = file.mimetype;
                // fileInfo.originalname = file.originalname;
                // fileInfo.size = file.size;
                // fileInfo.path = file.path;

                // fileInfos.push(fileInfo);
                res.json({msg:"ok"})
            }
            // 设置响应类型、编码
            res.set({
                'content-type': 'application/json; charset=utf-8'
            });
            res.end("成功");
        }
    );


server.listen(UPLOADPORT, (error) => {
  if (error) {
    console.log("【Error】".red + "服务器启动失败:" + error);
  } else {
    console.log("【Success】".green + "服务器启动成功！");
    console.log("【访问地址】".green + `http://localhost:${UPLOADPORT}`.cyan);
  }
});
