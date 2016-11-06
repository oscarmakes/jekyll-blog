# jekyll-blog
A simple Jekyll blog with an alternative workflow using Grunt

## Workflow
Conventionally, many Content Management Systems (CMSs) will have a post that contains images that exist in a separate folder like an `assets` folder. This is true of Jekyll and this workflow may be unsuitable to many.

This content structure follows a `feature by package` approach than the default Jekyll `feature by layer` approach.

The Grunt task runner will essentially convert this workflow from:-
```
_posts/
    2016-11-05-hello-world/
        index.md
        image.jpg
sample-page/
    index.md
    image-2.jpg
    
```

Then transforms it into a structure that Jekyll understands.

```
assets/
    img/
        posts/
            2016-11-05-hello-world-image.jpg
        pages/
            sample-page/
                image-2.jpg
_posts/
    2016-11-05-hello-world.md
sample-page/
    index.md
```

If this workflow is what you're after, then this starter Jekyll blog I made is for you!

## Prerequisites
If you're new to web development, then you'll need to install these before you get started. Open up the Terminal and run these tasks.

You'll need to install macOS' Command Line Tools (don't worry, this won't actually install Xcode)
```
xcode-select --install
```
Then you'll need to install Node (will also install Node Package Manager).
```
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```
Install Grunt and the CLI companion.
```
sudo npm install -g grunt
sudo npm install -g grunt-cli
```
Install these Ruby gems.
```
gem install jekyll bundler
```
And you should be off to the races!

## Getting started
Here's the actual part to get this blog running. Go ahead and download this repository however you wish. Once it's downloaded, get your Terminal window again and `cd` into the directory.

Here's the easy bit. Just run:
```
sh setup
```
This will install all of the needed dependencies required and gives you a development link for you to test. Once done, open your browser of choice and go to:
```
localhost:4000
```
And feel free to start putting your blog together!

##Bugs and Issues
I will openly admit that I shoddily put this workflow together for mine and others' benefit. Seasoned developers stay away from the Gruntfile.js

If you ever encounter a bug/issue, feel free to open an issue or tweet/DM me at <http://www.twitter.com/oscarmakes>.

There's also the possibility I may have missed something out in the Prerequisites and Getting Started sections in this Readme!

##Thanks!
If this has helped you immensely, just give me a tweet. Happy blogging!
