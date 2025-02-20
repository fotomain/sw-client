
import React, { Children, FC } from "react";

export interface ThisProps {
    children: React.ReactNode;
}


export const SafelyRenderChildren: FC<ThisProps> = ({ children }) => {
    const count = Children.count(children);
    if (count > 5000) {
        return <span>You're attempting to render too many children</span>;
    }

    return <>{children}</>;
};
