# Music Library Generator
> Generate a random music collection library for testing purposes

This program allows to generate a random music library, useful to test
applications such as music players.

## Requirements

AS IT IS, THIS PROGRAM WORKS ON LINUX. Probably, it can work on macOS as well out of the box.

### ffmpeg

The program uses the **ffmpeg** library to manipulate the metadata tags of the
mp3 files. The ffmpeg library must be present on the system for the program to
run correctly.

To install the library on Debian systems, run:

`$ sudo apt install ffmpeg`

## Install Node Dependencies

As usual, ensure to install the required dependencies with:

`$ npm install`

## Run the program

The program allows a certain degree of flexibility in the type of library it can generate. In particular, we can specify parameters that allow us to generate a collection based on a certain number of files, and a *density* parameter.

Given a certain number of files we want to generate, the density parameter
allows us to control the distribution of files in randomly generated folders.

The density parameter can be a value from 1 to 5. A low value (say 1) indicates
that we want the music collection to be made of many folders, each containing
fewer files. While a high density value (say 5) will create a music collection
with fewer folders, each containing many files, depending on how many we want to create.

**Options:**

`-V, --version` Output the version number.

`-n, --num-files [number]` The total number of audio files to generate. (default: 10).

`-d, --folder-density [number]` Indicate a parameter of files density per folder. (default: 3).

`-v, --verbose [boolean]` Enables verbose program logging. (default: false).

`-h, --help` Output usage information.


#### Examples

Based on the above, the program can be run with default values like this:

`node ./src/generator.js`

Or specifying some parameters:

`node ./src/generator.js -n 10 -d 3`

## Output

The files for the music collection will be generated into an output folder created in the source of the program itself. No other location will be written on the system.

