import { useCurrentWindowSize } from '@/hooks/useCurrentWindowSize';
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';

type collapseType = {
  isOpen: boolean;
  children: ReactNode;
  disableCollapse?: boolean;
  disableAnimation?: boolean;
  forceRender?: string;
};

const CLOSE_HEIGHT = 0;

export const Collapse = ({
  isOpen,
  children,
  disableCollapse = false,
  forceRender = '',
  disableAnimation = false,
}: collapseType): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dynamicMaxHeight, setDynamicMaxHeight] = useState<{ maxHeight: string }>({ maxHeight: '0px' });
  const sizeBrowser = useCurrentWindowSize();

  useEffect(() => {
    const sizeAnimation = ref?.current?.offsetHeight || 0;
    const newHeightStyle: { maxHeight: string } = {
      maxHeight: isOpen ? `${sizeAnimation}px` : CLOSE_HEIGHT.toString(),
    };

    setDynamicMaxHeight(newHeightStyle);
  }, [sizeBrowser, isOpen, children, forceRender]);

  if (disableCollapse) {
    return <div>{children}</div>;
  }

  return (
    <div
      className={`${disableAnimation ? '' : 'transition-all ease-in-out duration-500'} overflow-hidden`}
      style={disableAnimation && isOpen ? {} : dynamicMaxHeight}>
      <div ref={ref}>{children}</div>
    </div>
  );
};
