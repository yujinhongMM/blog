const fs = require('fs');
// https://blog.csdn.net/mashibing_web/article/details/110408238
class ModifyConsole {
    apply(compiler) {
        compiler.hooks.done.tap('modifyConsole', stats => {
            const { path, filename } = stats.compilation.options.output;
            let filePath = path + "/" + filename;
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) console.log(err);
                const rgx = /console.log\(['|"](.*?)[‘｜“]\)/;
                const newData = data.replace(rgx, "");
                
            })
        })
    }
}

module.exports= ModifyConsole;