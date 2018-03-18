import fs = require("fs");
import csvParse = require('csv-parse');

export let loadMatchValues = (filename: string, callback: Function) => {
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        
        csvParse(data, {columns: true, auto_parse: true}, function (err, output: MatchValue[]) {
            if (err) {
                return console.log(err);
            }
            callback(output);
        });
    });
}