# Peek.js - Options:

Below are all the options that can be passed to the "start()" public function.
<br>
<br>


### Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *Object* | nodeType | The DOM element types to use the viewer for (can be either an array of strings, or a space-separated string, and defaults to []). |
| *Object* | mode | States the viewing mode to use (1 = CSS, 2 = Attributes, 3 = Size/Position, 4 = Classes. Defaults to 1). |
| *string[]* | showOnly | States the names of the properties that only should be shown (defaults to []). |
| *boolean* | allowEditing | States if editing CSS Properties, Attributes, and Classes is allowed (defaults to false). |
| *boolean* | showIdOrNameInTitle | States if showing the Name/ID of the element in the title of the dialog is enabled (defaults to true). |
| *boolean* | showNodeNameInTitle | States if the node type should be shown in the title (if more than one is being used. Defaults to false). |
| *string[]* | ignoreValues | States the property values that only should be ignored (defaults to []). |
| *boolean* | showLockButtonInTitle | States if the lock symbol button should be shown in the title when the dialog is moved (defaults to true). |
| *number* | offset | States the additional offset to use for the dialog position (defaults to 0). |
| *boolean* | showSearch | States if the search bar should be shown (defaults to true). |
| *number* | showSearchPropertyCount | States minimum number of properties that should be available to show the search bar (defaults to 15). |

<br/>


### Options - Strings:

| Type: | Name: | Description: |
| --- | --- | --- |
| *string* | titleText | An override title to use for the dialog (defaults to null). |

<br/>


## Example:
<br/>

```markdown
<script> 
  $peek.start( {
      nodeType: "button"
  } );
</script>
```