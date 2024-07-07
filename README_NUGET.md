# Peek.js v1.0.0

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Peek.js%2C%20a%20free%20JavaScript%json%20converter&url=https://github.com/williamtroup/Peek.js&hashtags=javascript,element,property,viewer)
[![npm](https://img.shields.io/badge/npmjs-v1.0.0-blue)](https://www.npmjs.com/package/jpeek.js)
[![nuget](https://img.shields.io/badge/nuget-v1.0.0-purple)](https://www.nuget.org/packages/Peek.js/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/williamtroup/Peek.js/blob/main/LICENSE.txt)
[![discussions Welcome](https://img.shields.io/badge/discussions-Welcome-red)](https://github.com/williamtroup/Peek.js/discussions)
[![coded by William Troup](https://img.shields.io/badge/coded_by-William_Troup-yellow)](https://william-troup.com/)

> 🐛 A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.


## What features does Peek.js have?

- Zero-dependencies and extremely lightweight!
- Written in TypeScript, allowing greater support for React, Angular, and other libraries!
- Full API available via public functions.
- 3 modes supported:  CSS, Attributes, and Size/Position
- Fully configurable.


## What browsers are supported?

All modern browsers (such as Google Chrome, FireFox, and Opera) are fully supported.


## What are the most recent changes?

To see a list of all the most recent changes, click [here](docs/CHANGE_LOG.md).


## How do I install Peek.js?

You can install the library with npm into your local modules directory using the following command:

```markdown
npm install jpeek.js
```

You can also use the following CDN links:

```markdown
https://cdn.jsdelivr.net/gh/williamtroup/Peek.js@1.0.0/dist/peek.min.js
https://cdn.jsdelivr.net/gh/williamtroup/Peek.js@1.0.0/dist/peek.js.min.css
```


## How do I get started?

To get started using Peek.js, do the following steps:

### 1. Prerequisites:

Make sure you include the "DOCTYPE html" tag at the top of your HTML, as follows:

```markdown
<!DOCTYPE html>
```

### 2. Include Files:

```markdown
<link rel="stylesheet" href="dist/peek.js.css">
<script src="dist/peek.js"></script>
```

### 3. Start Viewing:

```markdown
<script> 
  $peek.start( {
      nodeType: "button"
  } );
</script>
```

To see a list of all the available binding options you can use, click [here](docs/options/OPTIONS.md).

### 4. Finishing Up:

That's it! Nice and simple. Please refer to the code if you need more help (fully documented).


## How do I go about customizing Peek.js?

To customize, and get more out of Peek.js, please read through the following documentation.


### 1. Public Functions:

To see a list of all the public functions available, click [here](docs/PUBLIC_FUNCTIONS.md).


### 2. Configuration:

Configuration options allow you to customize how Peek.js will function.  You can set them as follows:

```markdown
<script> 
  $peek.setConfiguration( {
      dialogDisplayDelay: 500
  } );
</script>
```

To see a list of all the available configuration options you can use, click [here](docs/configuration/OPTIONS.md).