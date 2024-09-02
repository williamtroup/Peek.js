# Peek.js - Change Log:

## Version 1.8.0:

#### **Adjustments:**
- Moved from ES2016 to ES2020.
- Updated to the latest NPM packages.
- Added an ignore path for ".DS_Store" files when packing the NuGet package.


## Version 1.7.0:

#### **Start Options:**
- Added a start option "ignore" (defaults to "[]"), which states the property values that only should be ignored.
- Added start option "showLockButtonInTitle" (defaults to true), which states if the lock button should be shown in the title bar.

#### **Configuration Options:**
- Changed the default value for the "text.dialogMovedSymbolText" option to "✸".
- Added start option "lockText" (defaults to "Lock), which states the text to use for the title bar "Lock" button.

#### **UI Improvements:**
- The title bar now uses the main title text as the starting text (instead of the Node Type, when "showNodeNameInTitle" is enabled).
- The Search and Property Value text fields now select all the text when they are focused.
- Added a lock button (configurable) to the right side of the title bar, which will allow you to quickly lock the dialog without having to move it.

#### **Adjustments:**
- Updated to the latest NPM packages.
- Renamed the type "Options" to "StartOptions".
- Added missing type declarations.
- Added configuration settings to force types to be declared.

#### **Fixes:**
- Fixed a fault that prevented a property from being removed when the item was deleted.
- Fixed a fault that caused a double dash to appear in the title bar when "showNodeNameInTitle" is enabled.
- Fixed some script errors in the console when the "stop()" is called.
- Fixed a fault that caused the dialog to still appear for elements after "stop()" is called.

<br>


## Version 1.6.1:
- Fixed missing return types for private shared functions.
- Massive code reorganization (split up into separate folders, renamed, etc).
- NPM package updates.

<br>


## Version 1.6.0:

#### **New Features:**
- Added support to move an element Up/Down within the elements parent node.
- Added support to show when the dialog has been moved and locked.

#### **Configuration:**
- Added configuration option "text.dialogMovedSymbolText" (defaults to "✱"), which states the symbol to show in the dialog title when the dialog has been moved and locked.
- Added configuration option "text.propertyValuePlaceHolderText" (defaults to "Enter value..."), which states the placeholder text to use for the property values.
- Added configuration option "text.modeNotSupportedText" (defaults to "The mode you have specified is not supported."), which states the warning text to show when a mode is not supported.
- Added configuration option "text.unknownModeText" (defaults to "Unknown Mode"), which states the dialog title to use when a mode is not supported.
- Added configuration option "text.moveUpText" (defaults to "Move Up"), which states the text to use for the Move Up button.
- Added configuration option "text.moveUpSymbolText" (defaults to "↑"), which states the text to use for the Move Up symbol button.
- Added configuration option "text.moveDownText" (defaults to "Move Down"), which states the text to use for the Move Down button.
- Added configuration option "text.moveDownSymbolText" (defaults to "↓"), which states the text to use for the Move Down symbol button.
- Added configuration option "text.removeElementSymbolText" (defaults to "⌫"), which states the text to use for the Remove element symbol button.

#### **UI Enhancements:**
- The "Search properties..." search field now uses a new style for the placeholder text.

<br>


## Version 1.5.0:

#### **New Features:**
- Added Search support! This will allow you to filter the properties down via the property name (if more than 15 are available).
- HEX and RGB(a) colors are now shown in the property values are a left border.

#### **Configuration:**
- BREAKING: All text options are now under a new section called "text" (see documentation).
- Added configuration option "text.clearText" (defaults to "Clear"), which states the text to use for the "Clear" button.
- Added configuration option "text.clearSymbolText" (defaults to "✕"), which states the symbol text to use for the "Clear" button.
- Added configuration option "text.searchPropertiesPlaceHolderText" (defaults to "Search properties..."), which states the placeholder text to use for the search input field.
- Added configuration option "text.noPropertiesFoundForSearchText" (defaults to "No properties were found for your search."), which states the warning text to show when no search results are found.
- Added configuration option "searchDelayDelay" (defaults to 500 milliseconds), which states how long the search should wait when typing before running the search.

#### **UI Enhancements:**
- Improved the focus background color used for text input fields.

#### **Adjustments:**
- Moved all string concatenation to use string templates.
- Updated to the latest NPM packages.

#### **Fixes:**
- Fixed a fault that caused the edited property values to be incorrectly reflected when the "Copy" button was pressed.

<br>


## Version 1.4.0:

#### **New Features:**
- Added a "Remove" button to the right side of the bottom buttons, allowing you to remove the focused element from the DOM.

#### **Start() > Options:**
- Added option "showNodeNameInTitle" (defaults to false), which states if the node name should be shown in the title (if more than one node type is being used).
- Renamed option "cssPropertiesText" to "cssText", and changed the default value to "CSS".
- The option "showIdOrNameInTitle" now defaults to true.

#### **Public API Functions:**
- Added a "close()" public API function, which will close the dialog if it's open.

#### **UI Adjustments:**
- The warning text shown when no attributes/classes are available now uses its own CSS class.
- Added a focus effect for editable property values.
- Massive improvements to the title bar and spacing around the dialog.

#### **Fixes:**
- Fixed a fault that caused the dialog moving to sometimes fail when moving the mouse quickly.
- Fixed documentation stating that events get fired when they don't.
- Fixed a fault that caused the dialog to still appear even when the mouse leaves an element.

<br>


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