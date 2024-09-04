# Peek.js - Configuration - Options:

Below are all the configuration options that can be passed to the "setConfiguration()" public function.
<br>
<br>


### Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *number* | dialogShowDelay | States the delay (in milliseconds) that should be used before showing the viewer dialog (defaults to 1000). |
| *number* | dialogHideDelay | States the delay (in milliseconds) that should be used before hiding the viewer dialog when moving away from a DOM element (defaults to 500). |
| *number* | searchDelay | States the delay (in milliseconds) that should be used when typing before searching (defaults to 500). |

<br/>


### Options - Strings:

| Category: | Type: | Name: | Description: |
| --- | --- | --- |
| text | *string* | cssText | The text used for the "CSS" title. |
| text | *string* | attributesText | The text used for the "Attributes" title. |
| text | *string* | sizeText | The text used for the "Size" title. |
| text | *string* | classesText | The text used for the "Classes" title. |
| text | *string* | noAttributesAvailableText | The text used for the "No attributes are available." warning. |
| text | *string* | closeText | The text used for the "Close" button. |
| text | *string* | copySymbolText | The text used for the "❐" copy symbol button. |
| text | *string* | pasteText | The text used for the "Paste" button. |
| text | *string* | pasteSymbolText | The text used for the "☐" paste symbol button. |
| text | *string* | removeText | The text used for the "Remove" button. |
| text | *string* | removeSymbolText | The text used for the "✕" remove symbol button. |
| text | *string* | noClassesAvailableText | The text used for the "No classes are available." warning. |
| text | *string* | searchPropertiesPlaceHolderText | The text used for the "Search properties" placeholder. |
| text | *string* | clearText | The text used for the "Clear" button. |
| text | *string* | clearSymbolText | The text used for the "✕" clear symbol button. |
| text | *string* | noPropertiesFoundForSearchText | The text that should be used for the "No properties were found for your search." search warning. |
| text | *string* | modeNotSupportedText | The text that should be used for the "The mode you have specified is not supported." warning. |
| text | *string* | unknownModeText | The text that should be used for the "Unknown Mode" title. |
| text | *string* | moveUpText | The text that should be used for the "Move Up" button. |
| text | *string* | moveUpSymbolText | The text that should be used for the "Move Up" symbol button. |
| text | *string* | moveDownText | The text that should be used for the "Move Down" button. |
| text | *string* | moveDownSymbolText | The text that should be used for the "Move Down" symbol button. |
| text | *string* | removeElementSymbolText | The text that should be used for the "Remove Element" symbol button. |

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