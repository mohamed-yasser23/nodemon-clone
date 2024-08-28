
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
        console.log(`Filename: ${filename}`);
        fs.readFile(__dirname+"/"+filename , 'utf8' , (err , data) => {
            if (err){
                console.log("change: file deleted")
            }else {
                if (data == "" && eventType =="rename") {
                    console.log("change: file created");
                }
                else {
                console.log("change: file modified")
                console.log("file contains:");
                console.log(data);
                }
            }
        })
    watching = false;
}, 100);
    } else {
        console.log(`Event: ${eventType}`);
    }
});



console.log("runnig fileTracker ...");
