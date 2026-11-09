# Multiplayer Fast Forward for OpenRCT2

A simple plugin that adds the fast forward feature to your server. Simply go to the map menu and open the `Fast Forward` window to start.
Only players with the `toggle_pause` permission will be able to change the time speed.
<br>WARNING: This feature can cause desync between client and server.
Use at your own risk.

## Building

### How to start

1. Install latest (LTS) version of [Node](https://nodejs.org/en/) and make sure to include NPM and enable the "Add to PATH" option during installation.
2. Download the project to a location of your choice on your PC.
3. Open a terminal or command prompt.
4. Use `cd` to change your current directory to the root folder of this project.
5. Run `npm install` to install the project's dependencies.

### Commands

`npm run build`

Creates a release build of the plugin. This version is optimized for sharing with others, using Terser to make the file as small as possible. By default, the plugin will be outputted to `./dist/`.

`npm run build:dev`

Creates a develop build of the plugin. This version is not optimized for sharing, but easier to read in case you want to see the outputted JavaScript. By default, the plugin will be outputted in the plugin folder of the default [OpenRCT2 user directory](https://github.com/Basssiiie/OpenRCT2-Simple-Typescript-Template#openrct2-user-directory).

`npm start` or `npm run start`

Will start a script that will automatically run `npm run build:dev` every time you make a change to any TypeScript or JavaScript file inside the `./src/` folder.
