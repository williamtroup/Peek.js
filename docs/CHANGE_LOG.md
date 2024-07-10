# Peek.js - Change Log:

## Version 1.2.0:

#### **New Features:**
- Added "Copy" button support (for CSS and Attribute modes), which will copy all the properties values (in the right format) to the clipboard.
- Added "Copy", "Paste", and "Remove" support for individual properties (for CSS and Attribute modes).

#### **Configuration:**
- Added configuration option "copyText" (defaults to "Copy"), which states the text to use for the "Copy" button.
- Added configuration option "copySymbolText" (defaults to "❐"), which states the symbol text to use for the "Copy" button.
- Added configuration option "pasteText" (defaults to "Paste"), which states the text to use for the "Paste" button.
- Added configuration option "pasteSymbolText" (defaults to "+"), which states the symbol text to use for the "Paste" button.
- Added configuration option "removeText" (defaults to "Remove"), which states the text to use for the "Remove" button.
- Added configuration option "removeSymbolText" (defaults to "⌫"), which states the symbol text to use for the "Remove" button.

<br>


## Version 1.1.1:
- Updated NPM packages to the latest versions.
- Fixed a fault that caused attribute values to assign their values to CSS properties when "allowEditing" is enabled.

<br>


## Version 1.1.0:
- Added a new binding option called "showOnly" (excepts a string, or string array), which states the properties that should be shown in the dialog.
- Added a new binding option called "allowEditing" (defaults to false), which allows CSS and Attribute values to be entered (simply type and press Enter).
- Fixed a fault that caused the dialog elements to be included when viewing specific node types.
- Added a new data attribute called "data-peek-js-ignore-state", which can be set to "ignore" on elements so that they cannot be used by the viewer.

<br>


## Version 1.0.0:
- Everything :)