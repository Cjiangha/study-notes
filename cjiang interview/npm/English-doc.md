# Getting packages from the registry
教程：[Getting packages from the registry](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry)

## 1、Searching for and choosing packages to download

### Searching for a package

![npm图片](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry/search-qr-results.png)

To list packages ranked according to package search rank criteria, in the left sidebar, under "Sort packages", click the criterion. For example, to sort packages by popularity, click "Popularity".


### Package search rank criteria
* Popularity
* Quality
* Maintenance
* Optimal

## 2、Downloading and installing packages locally

### Installing an unscoped package：
```
npm install <package_name>
```

### Installed a scoped public package：
```
npm install @scope/package-name
```

### Installing a private package
```
npm install @scope/private-package-name
```
### Testing package installation
```
ls node_modules
```

### Installed package version

>If there is a package.json file in the directory in which npm install is run, npm **installs the latest version** of the package that satisfies the semantic versioning rule declared in package.json.

>If there is no package.json file, the latest version of the package is installed.

## 3、Downloading and installing packages globally

>Tip: If you are using npm 5.2 or higher, we recommend using npx to run packages globally.

Installing a package **globally(全局)** allows you to use the code in the package as a set of tools on your local computer.

```
npm install -g <package_name>
```

## 4、Resolving EACCES permissions errors when installing packages globally

**注意：**本节不适用于 Microsoft Windows。

[Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)


## 5、Updating packages downloaded from the registry

### Updating local packages

1)、Navigate to the root directory of your project and ensure it contains a package.json file:

```
cd /path/to/project
```

2)、In your project root directory, run the [`update` command](https://docs.npmjs.com/cli/update):

```
npm update
```
3)、To test the update, run the [`outdated` command](https://docs.npmjs.com/cli/outdated). (过时的命令)  command. There should not be any output.

```
npm outdated
```

###  Updating globally-installed packages
>Note: If you are **using npm version 2.6.0 or less**, run this script to update all outdated global packages.
However, please consider upgrading to the latest version of npm:
```
npm install npm@latest -g
```

### Determining which global packages need updating
```
npm outdated -g --depth=0
```

### Updating a single global package
```
npm update -g <package_name>

```

### Updating all globally-installed packages
```
npm update -g
```

## 6、Using npm packages in your projects

### Using unscoped packages in your projects
Node.js module
If you are creating a Node.js module, you can use a package in your module by passing it as an argument to the require function.

```javascript
var lodash = require('lodash');

var output = lodash.without([1, 2, 3], 1);
console.log(output);
```

### package.json file

In `package.json`, list the package under dependencies. You can optionally include a [semantic version](https://docs.npmjs.com/about-semantic-versioning).

```json
{
  "dependencies": {
    "@package_name": "^1.0.0"
  }
}
```

## Using scoped packages in your projects

To use a scoped package, simply include the scope wherever you use the package name.

### Node.js module

```js
var projectName = require("@scope/package-name")
```

### package.json file

In `package.json`:

```json
{
  "dependencies": {
    "@scope/package_name": "^1.0.0"
  }
}
```

## Resolving "Cannot find module" errors

- For scoped packages, run `npm install <@scope/package_name>`
- For unscoped packages, run `npm install`

# 7、Using deprecated packages

.

![Screenshot of a deprecated package showing that it is no longer supported](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry/package-deprecated.png)

A deprecation message doesn't always mean the package or version is unusable; it may mean the package is unmaintained and will no longer be updated by the publisher.

出现  deprecated packages可能是没有维护	

# 8、Uninstalling packages and dependencies

## Uninstalling local packages

### Removing a local package from your node_modules directory



#### nscoped package

```
npm uninstall <package_name>
```

#### Scoped package

```
npm uninstall <@scope/package_name>
```

### Example

```
npm uninstall lodash
```



### Removing a local package from the `package.json` dependencies

**Note:** If you installed a package as a "devDependency" (i.e. with `--save-dev`), use `--save-dev` to uninstall it:



```
npm uninstall --save-dev package_name
```

### Confirming local package uninstallation

- Unix system (such as OSX): `ls node_modules`
- Windows systems: `dir node_modules`



## Uninstalling global packages

### Unscoped package

```
npm uninstall -g <package_name>
```

### Scoped package

```
npm uninstall -g <@scope/package_name>
```

### Example

For example, to uninstall a package called `jshint`, run:

```
npm uninstall -g jshint
```