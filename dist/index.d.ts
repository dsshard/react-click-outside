import React, { ReactNode } from 'react';
declare type ComponentProps = {
    children: ReactNode | undefined | null;
    onClose: () => void;
    visible?: boolean;
};
export declare const ReactClickOutside: React.NamedExoticComponent<ComponentProps>;
export {};
