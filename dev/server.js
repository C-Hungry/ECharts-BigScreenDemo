var PORT = 10010; //这里设置的是端口号，访问url：localhost:10010

var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
}; //同级目录下的mine.js文件，需要node支持的文件类型。
var path = require('path');//path文件路径

var server = http.createServer(function (request, response) {
    
    var pathname = url.parse(request.url).pathname;//url.parse路径/后面的

    if (pathname == '/') {
        //如果访问目录
        pathname += "index_prod.html"; //指定为默认网页
    }

    //这里是配置项目文件路径，比如说我的项目是在build目录下面，build和bin是同级别关系，所以../build进入文件，这样配置之后在浏览器中访问的url则是：localhost:3000/index.html，有其他文件或者文件夹相应加上目录即可。
    var realPath = path.join("./", pathname);
    // console.log(realPath);

    fs.exists(realPath, function (exists) { //测试某个路径下的文件是否存在。

        if (!exists) {
            realPath = path.join("./", "/index_prod.html");
        }

        var ext = path.extname(realPath);//path.extname path后缀名
        ext = ext ? ext.slice(1) : 'unknown';

        fs.readFile(realPath, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.end(err);
            } else {
                var contentType = mine[ext] || "text/plain";
                response.writeHead(200, {
                    'Content-Type': contentType
                });
                response.write(file, "binary");
                response.end();
            }
        });
    });
});

server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");