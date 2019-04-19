### React Validator

React tracking click outside children

Need react **>=16.0**

## Example

``` javascript
import React, { useState } from 'react';
import ClickOutside from '@coxy/react-click-outside';

export default () => {
  const [isVisible, handleToggle] = useState('');

  const onOpen = () => handleToggle(true);
  const onClose = () => handleToggle(false);

  return (
    <div>

      <ClickOutside visible={isVisible} onClose={onClose}>
        <div>Popup data</div>
      </ClickOutside>

      <button onClick={onOpen} type="button">
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
