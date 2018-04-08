# big-json-parser
🍺 Parse JSON with Big Number to ProtoBuf Schema
![](https://api.travis-ci.org/HuQingyang/JSON-js.svg?branch=master)

# Installation
`npm i big-json-parser`

# Usage
```js
const source = '{"n":1441151997421.03334,"getAll":false,"retData":{"respBodyMsg":{"users":[{"uid":2639271515,"class_id":0,"ts":1522659325},{"uid":144115199742103334,"class_id":0,"ts":1522728716,"uid_type":2}],"shards":1,"tid":2000006564,"cid":76629},"respHeader":{"time":324,"remote":"/10.60.38.128:35770","errmsg":"","errcode":0}},"retMsg":null}';
const result = parse(source);
console.log(result);
/*
[
    { "name": "n", "type": "float", "value": "1441151997421.03334", "label": "OPTIONAL" },
    { "name": "getAll", "type": "boolean", "label": "OPTIONAL", "value": false },
    { "name": "retData", "type": "message", "label": "OPTIONAL", "value": [
        { "name": "respBodyMsg", "type": "message", "label": "OPTIONAL", "value": [
            { "name": "users", "type": "message", "label": "REPEATED", "value": [
                { "type": "message", "label": "OPTIONAL", "value": [
                    { "name": "uid", "type": "int", "value": "2639271515", "label": "OPTIONAL "},
                    { "name": "class_id", "type": "int", "value": "0", "label": "OPTIONAL "},
                    { "name": "ts", "type": "int", "value": "1522659325", "label": "OPTIONAL "}
                ]},
                { "type": "message", "label": "OPTIONAL", "value": [
                    { "name": "uid", "type": "int", "value": "144115199742103334", "label": "OPTIONAL" },
                    { "name": "class_id", "type": "int", "value": "0", "label": "OPTIONAL "},
                    { "name": "ts", "type": "int", "value": "1522728716", "label": "OPTIONAL "},
                    { "name": "uid_type", "type": "int", "value": "2", "label": "OPTIONAL "}
                ]}
            ]},
            { "name": "shards", "type": "int", "value": "1", "label": "OPTIONAL "},
            { "name": "tid", "type": "int", "value": "2000006564", "label": "OPTIONAL" },
            {" name": "cid", "type": "int", "value": "76629", "label": "OPTIONAL "}
        ]},
        { "name": "respHeader", "type": "message", "label": "OPTIONAL", "value": [
            { "name": "time", "type": "int", "value": "324", "label": "OPTIONAL "},
            { "name": "remote", "type": "string", "label": "OPTIONAL", "value": "/10.60.38.128:35770" },
            { "name": "errmsg", "type": "string", "label": "OPTIONAL", "value": " "},
            { "name": "errcode", "type": "int", "value": "0", "label": "OPTIONAL "}
        ]}
    ]},
    {" name": "retMsg", "type": "null", "label": "OPTIONAL", "value": null}
];
 */
```
