# Folder copy with no recursion

This is a demo for a [StackOverflow question](https://stackoverflow.com/q/58685395/1913729). It will copy the contents of the `node_modules` folder into a `copy` folder, using NodeJS.

It copies the folder _recursively_ (meaning that all subfolders will be explored as well), but it does not use function recursion. Instead, it uses a queue, which gets filled by an auxiliary function which we run in a loop.

## Usage

```bash
# Clone the repo
git clone git@github.com:blex41/non-recursive-folder-copy.git
# Go into the project
cd non-recursive-folder-copy
# Install dependencies
npm i
# Run the demo
npm start
```
