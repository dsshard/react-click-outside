### React Validator

React tracking click outside children

Need react **>=17.0**

## Example

``` javascript
import React, { useState } from 'react';
import { ReactClickOutside, useToggle } from '@coxy/react-click-outside';

export default () => {
  const [isVisible, open, close] = useToggle(false');

  return (
    <div>

      <ClickOutside visible={isVisible} onClose={close}>
        <div>Popup data</div>
      </ClickOutside>

      <button onClick={open} type="button">
        Open
      </button>

    </div>
  );
};
```

### Api

**props:**
- visible [bool]
- onClose [fn]
