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

| Category: | Type: | Name: | Description: |
| --- | --- | --- |
| text | *string* | cssText | The text that should be used for the "CSS" title. |
| text | *string* | attributesText | The text that should be used for the "Attributes" title. |
| text | *string* | sizeText | The text that should be used for the "Size" title. |
| text | *string* | classesText | The text that should be used for the "Classes" title. |
| text | *string* | noAttributesAvailableText | The text that should be used for the "No attributes are available." warning. |
| text | *string* | closeText | The text that should be used for the "Close" button. |
| text | *string* | copySymbolText | The text that should be used for the "❐" copy symbol button. |
| text | *string* | pasteText | The text that should be used for the "Paste" button. |
| text | *string* | pasteSymbolText | The text that should be used for the "☐" paste symbol button. |
| text | *string* | removeText | The text that should be used for the "Remove" button. |
| text | *string* | removeSymbolText | The text that should be used for the "✕" remove symbol button. |
| text | *string* | noClassesAvailableText | The text that should be used for the "No classes are available." warning. |
| text | *string* | searchPropertiesPlaceHolderText | The text that should be used for the "Search properties" place holder. |
| text | *string* | clearText | The text that should be used for the "Clear" button. |
| text | *string* | clearSymbolText | The text that should be used for the "✕" clear symbol button. |
| text | *string* | noPropertiesFoundForSearchText | The text that should be used for the "No properties were found for your search." search warning. |

<br/>


## Example:
<br/>

```markdown
<script> 
  $peek.setConfiguration( {
      dialogDisplayDelay: 500,
      text: {
        cssText: "CSS Properties"
      }
  } );
</script>
```