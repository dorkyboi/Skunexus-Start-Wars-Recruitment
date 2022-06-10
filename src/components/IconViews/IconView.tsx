import React, {ReactNode} from "react";

interface Props {
    className?: string,
    icon: ReactNode,
    children: ReactNode,
}

function IconView({className, icon, children}: Props) {
    return (
        <div className={'flex flex-col w-full h-full p-5 items-center justify-center ' + (className || '')}>
            {icon}
            {children}
        </div>
    );
}

export default IconView;
