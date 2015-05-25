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
