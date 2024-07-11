# Peek.js - Change Log:

## Version 1.3.0:

#### **New Features:**
- Added a new "class" mode, which will list all the CSS classes assigned to an element (editing is also available).
- Added copy support to "Size" mode values.
- Added title bar Name/ID support.
- Added dialog moving support via the title bar.  When the dialog is moved, it is locked until closed (no over elements will open/update the dialog).

#### **Start() > Options:**
- Added option "showIdOrNameInTitle" (defaults to false), which states if showing the Name/ID of the element in the title of the dialog is enabled.

#### **Configuration:**
- Added configuration option "classesText" (defaults to "Classes"), which states the text to use for the "Classes" title.
- Added configuration option "noClassesAvailableText" (defaults to "No classes are available."), which states the text to show when no classes are available.

#### **Adjustments:**
- Renamed the small Copy, Paste, and Remove button CSS classes to "copy-small", "paste-small", and "remove-small".
- Removed deprecated "cancelBubble" usages and replaced them with "stopPropagation()".

#### **Fixes:**
- Fixed an issue with checking ignore states for elements.
- Fixed a fault that caused the "Paste" and "Remove" buttons to be visible when "allowEditing" is set to false.
- Fixed missing types across the project code.

<br>


## Version 1.2.0:

#### **New Features:**
- Added "Copy" button support (for CSS and Attribute modes), which will copy all the properties values (in the right format) to the clipboard.
- Added "Copy", "Paste", and "Remove" support for individual properties (for CSS and Attribute modes).

#### **Configuration:**
- Added configuration option "copyText" (defaults to "Copy"), which states the text to use for the "Copy" button.
- Added configuration option "copySymbolText" (defaults to "❐"), which states the symbol text to use for the "Copy" button.
- Added configuration option "pasteText" (defaults to "Paste"), which states the text to use for the "Paste" button.
- Added configuration option "pasteSymbolText" (defaults to "☐"), which states the symbol text to use for the "Paste" button.
- Added configuration option "removeText" (defaults to "Remove"), which states the text to use for the "Remove" button.
- Added configuration option "removeSymbolText" (defaults to "✕"), which states the symbol text to use for the "Remove" button.

#### **UI Improvements:**
- The property name label now uses an ellipsis effect when the property name is long.
- Added a 2000 z-index to the dialog, to make sure it's on top of most elements.

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