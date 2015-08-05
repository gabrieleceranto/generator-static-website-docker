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
docker run -it -v `pwd`:/data gceranto/nodejs-bower-grunt-yeoman yo static-website-docker --no-docker
```
**--no-docker** option is required because script *is running in docker*. Final result is the same, anyway.

## Build generated projects
It use a preconfigured docker image, and scripts are provided to use it in the best way.

Just run, from project's root:
```bash
# For build (once)
./build.sh

# For build (watch on change)
./watch.sh
```

## Local webserver
If you want to use docker to test website locally (without any kind of installation), just run:
```bash
./server.sh [port]
```

## Addictional operation allowed
You can access to docker image to run all command you need, with command:
```bash
./dock <command with args>
```

For example, you can need to install new dependencies, and you don'want to have any tool installed locally:
```bash
./dock bower install --save bootstrap
```

Keep in mind that all changes affecting all files outside project dir will be deleted after each docker's command execution.
