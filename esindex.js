const { spawn } = require("child_process");
const concat = require("concat-stream");


const executeCLIwithInput = (cmd,cmdArgs=[], inputArgs=[]) => {
  return new Promise((resolve, reject) => {
    const ENTER = "\x0D";
    const childProc = spawn(cmd, cmdArgs);
    childProc.stdin.setEncoding("utf-8");
    childProc.stderr.once('error',(err) => {
      childProc.stdin.end();
      curTimeout && clearTimeout(curTimeout);
      reject(err);
    });
    childProc.on("error", reject);
    const handleResult = (result) => resolve(result.toString());

    childProc.stdout.pipe(concat(handleResult));

    const timeout = 100;
    let curTimeout;
    const passEndOfParam = () => {
      curTimeout && clearTimeout(curTimeout);
      curTimeout = setTimeout(() => {
        childProc.stdin.write(ENTER);
        passInput(inputsArgs);
      }, timeout);
    };
    const passParam = (param) => {
      curTimeout && clearTimeout(curTimeout);
      setTimeout(() => {
        childProc.stdin.write(param);
        passEndOfParam();
      }, timeout);
    };
    const passInput = (inputsArgs) => {
      if (inputsArgs.length) {
        const param = inputsArgs.shift();
        passParam(param);
      } else {
        childProc.stdin.end();
      }
    };
    passInput(inputsArgs);
  });
};

const cmd='t';
const cmdArgs=['c'];
const inputArgs = [];
executeCLIwithInput(cmd,cmdArgs, inputArgs).then((res)=>{
    console.log(res)
}).catch(err=>{
    console.error(err)
})
