Application generator for [Kona](https://github.com/jbielick/kona)
=======

[![Build Status](https://secure.travis-ci.org/jbielick/generator-kona.svg?branch=master)](https://travis-ci.org/jbielick/generator-kona)
[![Coverage Status](https://coveralls.io/repos/jbielick/generator-kona/badge.svg)](https://coveralls.io/r/jbielick/generator-kona)

### What is this?

This is a [yeoman](http://yeoman.io) generator. A generator is basically a plugin that can be run with the `yo` command to scaffold complete projects or useful parts.

This generator generates fresh, new [Kona](https://github.com/jbielick/kona) apps, controllers, scaffolds, views and other stuff.

### Getting Started

If you don't have yeoman installed, install it globally via npm:

```bash
npm install -g yo
```

Then you'll need this *generator-kona* generator globally so yeoman can find it:

```bash
npm install -g generator-kona
```

Now you're all set! You can now use `yo` to generate kona applications or controllers, views, and scaffolds
for your kona apps! See *Generators* below for the available generators.

[cli]: http://i.imgur.com/Mbf0jWz.gif "Usage: generate a kona app"

### Generators

A Kona app:

```bash
yo kona myNewApp
```

A controller:

```bash
yo kona:controller books [optional actions to create for you separated by spaces...]
```

A scaffold (controller, resource route, views):

```bash
yo kona:scaffold user follow unfollow
```

...will yield

```
[A] app/controllers/user-controller.js
[A] app/views/user/add.html
[A] app/views/user/edit.html
[A] app/views/user/index.html
[A] app/views/user/show.html
[M] app/routes.js
```

## License

MIT