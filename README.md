# toddlenhart.com
Website for toddlenhart.com

Using a couple of guides for structure of the angular app/website:
[https://github.com/johnpapa/ng-demos/tree/master/modular](https://github.com/johnpapa/ng-demos/tree/master/modular)
[https://github.com/johnpapa/ng-demos](https://github.com/johnpapa/ng-demos)

Style Guide: (Not implemented, just putting the link here for now.)
[https://github.com/johnpapa/angular-styleguide](https://github.com/johnpapa/angular-styleguide)


See [https://github.com/johnpapa/ng-demos/tree/master/modular](https://github.com/johnpapa/ng-demos/tree/master/modular) and go through any further setup that may be needed.
Each component should be separated out in ...


/build should be generated when deployed/built/maybe even when testing. It shouldn't be added to the repository, (at least for now).
/build probably shouldn't have server stuff in it, (since the build folder should be the one used to serve the files.)

Testing deployment.
