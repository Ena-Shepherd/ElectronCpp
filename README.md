# Cpp-WebUI-Template
C++ app with a modern Web UI

## About the template
This repo contains everything you need to **setup any C++ app with a web interface.** <br/>
We are using <a href="https://www.electronjs.org/fr/">ElectronJS</a> to pack the interface inside a window and **AJAX APIs** to communicate from the Interface to the app using Json requests

## Preview
![image](https://github.com/Ena-Shepherd/Cpp-WebUI-Template/assets/62568994/8618d4da-56cc-4e73-960b-05727fc0d625)

***

## How to use
First, make sure you have <a href="https://nodejs.org/en">Node.js</a> installed <br/>
`npm --version` <br/>
## Install & Start app
| Yarn | Node |
| :---  | :---  |
|`yarn install` <br/> `yarn start `| `npm install` <br/> `npm start` |

***

## Changing app behavior
### Basic operations :
 - Add your sources inside the template
 - Compile with `server.cpp` and `listener.cpp`
 - name your executable `app.exe` <br/><br/>
 
> **Default port is 444** <br/>
> You can change the port in the `.env` file <br/>
<br/>

## Handling AJAX Requests
### Sending requests from Electron :
It is recommended to have a script folder to handle Json requests between the UI and your executable.
You can have a look inside `renderer.js` to see how it works. <br/>
Basically **we're sending an API request on an endpoint** which is listened by the c++ server file `server.cpp` <br/><br/>
### Receiving requests on C++ side :
Have a look inside `listener.cpp`, there is a basic `processRequest()` function which processes the received json request. <br/>
From there, you should be able to feed the output to your other functions
