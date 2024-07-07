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
| *string* | cssPropertiesText | The text that should be used for the "CSS Properties" title. |
| *string* | attributesText | The text that should be used for the "Attributes" title. |
| *string* | sizeText | The text that should be used for the "Size" title. |
| *string* | noAttributesAvailableText | The text that should be used for the "No attributes are available." warning. |
| *string* | closeText | The text that should be used for the "Close" button. |

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