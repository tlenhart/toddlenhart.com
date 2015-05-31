# toddlenhart.com
Website for toddlenhart.com

> A lot of the stuff below is just notes for myself and things I need to do for the website. 

Using a couple of guides for structure of the angular app/website:
[https://github.com/johnpapa/ng-demos/tree/master/modular](https://github.com/johnpapa/ng-demos/tree/master/modular)
[https://github.com/johnpapa/ng-demos](https://github.com/johnpapa/ng-demos)

Style Guide: (Not implemented, just putting the link here for now.)
[https://github.com/johnpapa/angular-styleguide](https://github.com/johnpapa/angular-styleguide)


See [https://github.com/johnpapa/ng-demos/tree/master/modular](https://github.com/johnpapa/ng-demos/tree/master/modular) and go through any further setup that may be needed.
Each component should be separated out in ...


/build should be generated when deployed/built/maybe even when testing. It shouldn't be added to the repository, (at least for now).
/build probably shouldn't have server stuff in it, (since the build folder should be the one used to serve the files.)

# Building the website
Steps to building/running the website. (This is going to change.)
 1. ...
 2. Going to want `npm init`, any `npm install` commands.
 3. Any configuration things that need to be setup.
 4. ...

# Things that need to be added to the build process.
 1. Move and compile all file to /build
 2. Each .css and .js file should be minified and uglified.
  1. The angular files should be run through the angular pre-minifier thing to prevent things from happening with the uglifier.
 4. Perhaps add the cdnizer plugin that automatically adds cdn links in html files.
 5. ...
 
# Things that need to be added to the dev build/run process
 1. Compile .scss files into .css files. Include the source maps.
 2. Generate sourcemaps for .js files.
 3. Live reload using Browsersync? or something else...
 4. ...
 
# Changes that need to be made to js build process
 1. Bundles need to move to /build
 2. Or, they need to combined and added to the html file (replaced with gulp-html-replace)
 3. Might want to put all of the individual js files in index.html (or other html files) 
    and bundle them up for /build.
 4. Keeping it the way it is though (with bundles in /src, and combined in /build), might be the better approach.
 
Have to decide where and when we are going to copy the html files over to /build and /dist.
Decide when to copy the libs over from /node_modules/ to assets/lib/
Decide when to cdnify. Probably when building.

The key to remember here is that the build folder is used for testing, especially on the server.
Regular development should occur completely within /src.
  Gulp live reloading should also use files only in /src.
  Everything should then be compiled for /build
  
/dist should be an exact copy of /build

# Once tests pass in /build, move all files to /dist.

### cdnify task needs to change.
cdnify and bundle other js files at the same time. (When moving to /build).
Change load-libs to load-srclibs or load-devlibs
Add load-build-libs to move the libs from /src to /build
