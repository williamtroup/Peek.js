# Peek.js - Public Functions:

Below is a list of all the public functions that can be called from the Peek.js instance.
<br>
<br>


## Running:

#### **start( *options* )**:
Starts the peek process using the options passed and attaches the viewed to the DOM elements.
<br>
***Parameter: options***: '*Object*' - All the options that should be used (refer to ["Options"](options/OPTIONS.md) documentation for properties).
<br>
***Returns***: '*Object*' - The Peek.js class instance.
<br>

#### **stop()**:
Stops the peek process.
<br>
***Returns***: '*Object*' - The Peek.js class instance.
<br>

#### **close()**:
Closes the dialog.
<br>
***Returns***: '*Object*' - The Peek.js class instance.
<br>
<br>


## Configuration:

### **setConfiguration( *newConfiguration* )**:
Sets the specific configuration options that should be used.
<br>
***Parameter: newConfiguration***: '*Object*' - All the configuration options that should be set (refer to ["Configuration Options"](configuration/OPTIONS.md) documentation for properties).
<br>
***Returns***: '*Object*' - The Peek.js class instance.
<br>
<br>


## Additional Data:

### **getVersion()**:
Returns the version of Peek.js.
<br>
***Returns***: '*string*' - The version number.
<br>
<br>


## Example:

```markdown
<script> 
    var version = $peek.getVersion();
</script>
```