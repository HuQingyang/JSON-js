# big-json-parser
🍺 Parse JSON with Big Number to ProtoBuf Schema or JS Object
![](https://api.travis-ci.org/HuQingyang/JSON-js.svg?branch=master)

# Installation
`npm i big-json-parser`

# Usage
```js
const source = '{"n":1441151997421.03334,"getAll":false,"retData":{"respBodyMsg":{"users":[{"uid":2639271515,"class_id":0,"ts":1522659325},{"uid":144115199742103334,"class_id":0,"ts":1522728716,"uid_type":2}],"shards":1,"tid":2000006564,"cid":76629},"respHeader":{"time":324,"remote":"/10.60.38.128:35770","errmsg":"","errcode":0}},"retMsg":null}';
const result = parse(source);
console.log(result);
/*  
{
    "n": 1441151997421.03334,
    "getAll": false,
    "retData": {
        "respBodyMsg": {
            "users": [
                {"uid":2639271515,"class_id":0,"ts":1522659325},
                {"uid":144115199742103334,"class_id":0,"ts":1522728716,"uid_type":2}
            ],
            "shards": 1,
            "tid": 2000006564,
            "cid": 76629
        },
        "respHeader": {
            "time": 324,
            "remote": "/10.60.38.128:35770",
            "errmsg":"",
            "errcode":0
        }
    },
    "retMsg":null
}
 */
```
