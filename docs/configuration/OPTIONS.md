# Peek.js - Configuration - Options:

Below are all the configuration options that can be passed to the "setConfiguration()" public function.
<br>
<br>


### Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *number* | dialogDisplayDelay | States the delay (in milliseconds) that should be used before showing the viewer dialog (defaults to 1000). |

<br/>


### Options - Strings:

| Type: | Name: | Description: |
| --- | --- | --- |
| *string* | cssText | The text that should be used for the "CSS" title. |
| *string* | attributesText | The text that should be used for the "Attributes" title. |
| *string* | sizeText | The text that should be used for the "Size" title. |
| *string* | classesText | The text that should be used for the "Classes" title. |
| *string* | noAttributesAvailableText | The text that should be used for the "No attributes are available." warning. |
| *string* | closeText | The text that should be used for the "Close" button. |
| *string* | copySymbolText | The text that should be used for the "❐" symbol button. |
| *string* | pasteText | The text that should be used for the "Paste" button. |
| *string* | pasteSymbolText | The text that should be used for the "☐" symbol button. |
| *string* | removeText | The text that should be used for the "Remove" button. |
| *string* | removeSymbolText | The text that should be used for the "✕" symbol button. |
| *string* | noClassesAvailableText | The text that should be used for the "No classes are available." warning. |

<br/>


## Example:
<br/>

```markdown
<script> 
  $peek.setConfiguration( {
      dialogDisplayDelay: 500
  } );
</script>
```