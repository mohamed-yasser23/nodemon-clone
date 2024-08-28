
import fs from "node:fs"
import { dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));


let watching = false; 

/* 
the whole watching thing is because fs.watch() triggers twice with every change so a solution is :
1- using timeout so that it doesn`t detect the double changes that happens mostly because of windows 
2- using chokdir which solves alot of the problems with the fs.watch()  [better option]
                                             <stack overflow>
*/

fs.watch(__dirname, (eventType, filename) => {
    if (filename) {

    if(watching) return;
    watching = true;
    
    setTimeout(() => {
        console.log(`Filename: ${filename} & Event: ${eventType}`);
        filestart();
    watching = false;
}, 100);
    } else {
        console.log(`Event: ${eventType}`);
    }
});

let childProcess = null;
let RunFile = "index.js"; /* this is the file we want to run using the tracker  */
function filestart() 
{
    if (childProcess) {
        childProcess.kill();
    }
    console.log(`Running ${RunFile}...`);
    childProcess = exec(`node ${RunFile}`, (err, stdout, stderr) => { /*this line excute the command in terminal*/
        if (err) {
            console.error(`Error executing file: ${err.message}`);
        }
        console.log(stdout);
        console.error(stderr);
    });
}

console.log("runnig fileTracker ...");
filestart();