/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-25 18:33:43
 * @LastEditTime: 2021-12-25 19:00:58
 * @LastEditors: Please set LastEditors
 * @Description: 创建组件脚本
 * @FilePath: /test/myapp/scripts/create.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const colors = require('colors');
/*
 * @Description: 打印执行成功的提示信息
 * @Author: zhoupengfei03
 */
function logSuccess(text) {
    console.log(text.brightGreen);
}
/*
 * @Description: 打印执行过程中的提示信息
 * @Author: zhoupengfei03
 */
function logTips(text) {
    console.log('\033[40;31m ' + text);
}
/*
 * @Description: 判断文件或者文件夹是否存在
 * @params path <string>
 * @Author: zhoupengfei03
 */
function exitFolder(path) {
    try {
        let stat = fs.statSync(path);
        if (stat.isDirectory()) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}
/*
 * @Description: 初始化readline
 * @Author: zhoupengfei03
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
/*
 * @Description: 首字母大写
 * @Author: zhoupengfei03
 */
function firstToUpper(str) {
    return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}
/*
 * @Description: 咨询文件夹名称
 * @Author: zhoupengfei03
 */
function acceptFileName() {
    rl.question('**请输入要创建的组件名称:'.brightGreen, answer => {
        let patt = /^[a-zA-Z][A-Za-z0-9]+$/;
        if (patt.test(answer)) {
            // 创建目录和文件
            createWidget(answer);
            process.exit(0);
        } else {
            logTips(`${answer}组件名称格式错误，请重新创建...`);
            process.exit(0);
        }
    });
}
function getWidget(dirname, folderName) {
    return '/*\r'
        + '* @Author: your name\r'
        + '* @Date: time\r'
        + '* @LastEditTime: time\r'
        + '* @LastEditors: Please set LastEditors\r'
        + '* @Description: widget Description\r'
        + '* @FilePath: /blue-cli/src/components/' + dirname + '/index.js\r'
        + '*/\r'
        + '\r'
        + 'import {\r'
        + '    useCallback,\r'
        + '    useEffect,\r'
        + '    useMemo,\r'
        + '    useState,\r'
        + '    useRef,\r'
        + '    useImperativeHandle\r'
        + '} from \'react\';\r'
        + 'import _ from \'lodash\';\r'
        + 'import \'./index.less\';\r'
        + '\r'
        + 'const ' + folderName + ' = props => {\r'
        + '    const [count, setCount] = useState(0);\r'
        + '    const handleAddCount = useCallback(\r'
        + '        () => {\r'
        + '            setCount(1);\r'
        + '        },\r'
        + '        [],\r'
        + '    );'
        + '    useEffect(() => {\r'
        + '        console.log(count);\r'
        + '        return () => {\r'
        + '            console.log(count);\r'
        + '        }\r'
        + '    }, [count]);\r'
        + '    return (<div className=\"' + dirname + '-container\">\r'
        + '        {count}\r'
        + '    </div>);\r'
        + '};'
        + '\r'
        + 'export default ' + folderName + ';';
}
/*
 * @Description: 创建楼层
 * @Author: zhoupengfei03
 */
function createWidget(dirname) {
    let folderName = firstToUpper(dirname);
    if (exitFolder(path.join(__dirname, '../src/components', folderName))) {
        logTips(`${folderName}组件已存在，请重新创建...`);
        process.exit(0);
    } else {
        try {
            let widgetLess = `.${dirname}-container {background: #fff;}`;
            let widgetScript = getWidget(dirname, folderName);
            fs.mkdirSync(path.join('./src/components', folderName));
            fs.writeFileSync(path.join('./src/components', folderName, 'index.js'), widgetScript, 'utf-8');
            fs.writeFileSync(path.join('./src/components', folderName, 'index.less'), widgetLess, 'utf-8');
            logSuccess(`${folderName}组件已创建完成...`);
        } catch (error) {
            logTips(`${folderName}组件已存在，请重新创建...`);
        }
    }
}
acceptFileName();