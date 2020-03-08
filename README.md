# gofront

#  目录结构
    +-- /public 所有的样式文件(css文件），前端脚本，网站小图标，上传的图片，打包生成的js文件都存放在这个目录
    | +-- /public/assets/css 
    | +-- /public/assets/js 
    | +-- /public/assets/css 
    | +-- /public/assets/images 
    | +-- /public/assets/fonts 
    +-- /config 配置目录
    +-- /db 数据库文件目录
    +-- /log 日志目录
    +-- /src go代码的存放目录
    | +-- /src/controller 处理器代码
    ||+-- /src/controller/websocket_controller  websocket处理器代码
    | +-- /src/controller 处理器代码
    | +-- /src/inits 初始化代码
    | +-- /src/model 数据模型
    | +-- /src/kafka kafka网络代码
    | +-- /src/routes 路由代码
    | +-- /src/supports 日志等支持代码
    | +-- /src/utils 工具代码
    | +-- /src/gofrontdb db操作代码
    -- main.go 主程序