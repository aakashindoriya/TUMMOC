const fs = require('fs');

console.log('Start of the non-blocking code');

// Non-blocking file read operation
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`File content will be read asynchronously: ${data}`);
});

console.log('End of the non-blocking code');

// When we run node index.js, the following happens:

// 1. The script starts executing synchronously from top to bottom.
// 2. The console.log('Start of the non-blocking code') statement is executed and logs "Start of the non-blocking code" to the console.
// 3. The fs.readFile() function is called to read the content of the 'example.txt' file asynchronously.
// 4. While the file reading operation is in progress, the execution continues to the next line.
// 5. The console.log('End of the non-blocking code') statement is executed and logs "End of the non-blocking code" to the console.
// 6. Once the file reading operation is complete, the callback function is called with the content of the file as the 'data' parameter.
// 7. Inside the callback function, the file content is logged to the console using console.log(`File content will be read asynchronously: ${data}`).

console.log('Start of Blocking code');

// Blocking file read operation
let data = fs.readFileSync('example.txt', 'utf8');
console.log(`File content reading while blocking: ${data}`);

console.log('End of Blocking code');

// Here the output will be:
// Start of the Blocking code
// File content: Hello! I am Aakash
// End of the Blocking code

// When the program reaches fs.readFileSync(), it blocks the execution until the file is completely read.
// This means that the program cannot move to the next line of code until the file reading operation is finished.
// Once the file reading operation is complete, the content of the file is stored in the 'data' variable.
// The console.log(`File content reading while blocking: ${data}`) statement logs the file content to the console.
// Finally, the console.log('End of Blocking code') statement is executed and logs "End of Blocking code" to the console.
