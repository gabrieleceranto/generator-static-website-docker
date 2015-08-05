# generator-static-website-docker
Yeoman generator to build static website using docker (optional) to drive build and test in local webserver.

## Installation
Execute command
```bash
npm install -g yo grunt-cli generator-static-website
```
with sudo if you get permission error

## Usage
Just type
```bash
yo static-website
```

If you want to be fully helped by docker, you can use this to prevent to install anything (Yeoman included) and have same result:
```bash
cd <your project dir>
docker run --name=yeoman.install -it -v `pwd`:/data gceranto/nodejs-bower-grunt-yeoman yo static-website
```
