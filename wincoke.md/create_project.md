### 创建编辑项目页面

+ 新建/编辑项目接口

#### 说明:

> 现在新建/编辑采集项目分为三步，"项目设置"，"采集模板"，"采集人员"。现在新建的接口格式按照最后一步才提交数据来设计的。

#### http method:put

#### input:
```
{
    name:"销售数据采集",
    id:123,
    operatorId:"管理员甲"//这个可以不传，读cookie拿sessionID
    content:[
        {
            type:1,//@1
            title:"客户姓名",
            desc:"请输入客户的中文全名"
        },
        {
            type:3,
            title:"客户类型",
            desc:"客户所属行业",
            attr:{//@2
                options:["超市","烟酒","副食","其他"]
            }
        }
    ],
    user:[001,002,003]
}
```
> @1 1,文本输入 2,单选题 3,多选题 4,图片 5,地理位置 6,条形码

> @2 attr为扩展属性，目前只有单选和多选用到了options

+ 读取模板组件接口

#### http method:get

#### input: 拿sessionId

#### output:
```
[
    {
        type:1,
        name:"文字输入",
        attr:{
            ?
        }
    }
]
```
+ 读取采集员列表接口

#### http method:get

#### input: sessionId

#### out:
```
[
    {
        id:1,
        name:"张三"
    },
    {
        id:2,
        name:"李四"
    }
]
```
+ 新建采集员接口

#### http method:put

#### input:
```
[
    {
        id:1,
        name:"张三"
    },
    {
        id:2,
        name:"李四"
    }
]
```