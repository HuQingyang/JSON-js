const chai = require('chai');
const {expect} = chai;
const parse = require('../dist');


describe('parse test', function () {
    it('parse int', function () {
        const data = `{"uid":2639271515,"class_id":0,"ts":1522659325}`;
        const result = [
            {"label": "OPTIONAL","name":"uid","type":"int","value":"2639271515"},
            {"label": "OPTIONAL","name":"class_id","type":"int","value":"0"},
            {"label": "OPTIONAL","name":"ts","type":"int","value":"1522659325"}
        ];
        expect(parse(data)).eql(result);
    });

    it('parse float', function () {
        const data = `{"retData":1441151997421.03334}`;
        const result = [{"label": "OPTIONAL","name":"retData","type":"float","value":"1441151997421.03334"}];
        expect(parse(data)).eql(result);
    });

    it('parse string', function () {
        const data = `{"remote":"/10.60.38.128:35770","errmsg":""}`;
        const result = [
            {"name":"remote","type":"string","label":"OPTIONAL","value":"/10.60.38.128:35770"},
            {"name":"errmsg","type":"string","label":"OPTIONAL","value":""}
        ];
        expect(parse(data)).eql(result);
    });

    it('parse boolean', function () {
        const data = `{"getAll":false}`;
        const result = [{"label": "OPTIONAL","name":"getAll","type":"boolean","value":false}];
        expect(parse(data)).eql(result);
    });

    it('parse null', function () {
        const data = `{"retMsg":null}`;
        const result = [{"label": "OPTIONAL","name":"retMsg","type":"null","value":null}];
        expect(parse(data)).eql(result);
    });

    it('parse repeated', function () {
        const data = `{"users":[{"uid":2639271515,"class_id":0,"ts":1522659325},{"uid":144115199742103334,"class_id":0,"ts":1522728716,"uid_type":2}]}`;
        const result = [{"name":"users","type":"message","label":"REPEATED","value":[
            {"type":"message","label":"OPTIONAL","value":[
                {"name":"uid","type":"int","value":"2639271515","label":"OPTIONAL"},
                {"name":"class_id","type":"int","value":"0","label":"OPTIONAL"},
                {"name":"ts","type":"int","value":"1522659325","label":"OPTIONAL"}
            ]},
            {"type":"message","label":"OPTIONAL","value":[
                {"name":"uid","type":"int","value":"144115199742103334","label":"OPTIONAL"},
                {"name":"class_id","type":"int","value":"0","label":"OPTIONAL"},
                {"name":"ts","type":"int","value":"1522728716","label":"OPTIONAL"},
                {"name":"uid_type","type":"int","value":"2","label":"OPTIONAL"}
            ]}
        ]}];
        expect(parse(data)).eql(result);
    });

});
