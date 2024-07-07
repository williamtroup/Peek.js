# Peek.js - Options:

Below are all the options that can be passed to the "start()" public function.
<br>
<br>


### Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *Object* | nodeType | The DOM element types to use the viewer for (can be either an array of strings, or a space separated string, and defaults to []). |
| *Object* | mode | States the viewing mode to use (1 = CSS, 2 = Attributes, 3 = Size/Position. Defaults to 1). |

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