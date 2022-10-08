import React, {
  memo,
  ReactElement, ReactNode,
  useCallback,
  useEffect,
  useRef
} from 'react'

export { useToggle } from '@coxy/utils/dist/use/use-toggle'

type ComponentProps = {
  children: ReactNode | undefined | null,
  onClose: () => void,
  visible?: boolean
}

export const ReactClickOutside = memo<ComponentProps>(function ReactClickOutside (
  props
): ReactElement | null {
  const ref = useRef<Element>()
  const isTouch = useRef<boolean>(false)

  const handleClickOutside = useCallback((event: Event) => {
    const { visible, onClose } = props
    const node = ref.current
    if (!node || !node.contains(event.target as Element)) {
      if (event.type === 'touchend') isTouch.current = true
      if (event.type === 'click' && isTouch.current) return

      if (visible) {
        setTimeout(() => {
          if (visible) {
            onClose()
          }
        })
      }
    }
  }, [props, ref])

  // handler ESC button
  const handleEsc = useCallback(({ keyCode }: KeyboardEvent) => {
    if (keyCode === 27 && props.visible) {
      props.onClose()
    }
  }, [props])

  useEffect(() => {
    if (props.visible) {
      document.addEventListener('click', handleClickOutside, true)
      document.addEventListener('keydown', handleEsc, true)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('keydown', handleEsc, true)
    }
  }, [handleClickOutside, handleEsc, props])

  // return if not visible
  if (!props.visible) return null

  const elements = React.Children.map(
    props.children as ReactElement,
    (child: ReactElement) => React.cloneElement(child, {
      ref
    })
  )

  return React.createElement(React.Fragment, null, elements)
})
