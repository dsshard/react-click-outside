import React, { memo, useCallback, useEffect, useRef } from 'react';
export { useToggle } from '@coxy/utils/dist/use/use-toggle';
export const ReactClickOutside = memo(function ReactClickOutside(props) {
    const ref = useRef();
    const isTouch = useRef(false);
    const handleClickOutside = useCallback((event) => {
        const { visible, onClose } = props;
        const node = ref.current;
        if (!node || !node.contains(event.target)) {
            if (event.type === 'touchend')
                isTouch.current = true;
            if (event.type === 'click' && isTouch.current)
                return;
            if (visible) {
                setTimeout(() => {
                    if (visible) {
                        onClose();
                    }
                });
            }
        }
    }, [props, ref]);
    const handleEsc = useCallback(({ keyCode }) => {
        if (keyCode === 27 && props.visible) {
            props.onClose();
        }
    }, [props]);
    useEffect(() => {
        if (props.visible) {
            document.addEventListener('click', handleClickOutside, true);
            document.addEventListener('keydown', handleEsc, true);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleEsc, true);
        };
    }, [handleClickOutside, handleEsc, props]);
    if (!props.visible)
        return null;
    const elements = React.Children.map(props.children, (child) => React.cloneElement(child, {
        ref
    }));
    return React.createElement(React.Fragment, null, elements);
});
