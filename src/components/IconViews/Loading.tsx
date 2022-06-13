import React, {ReactNode} from "react";
import {Spinner} from "reactstrap";

function Loading({children}: {children?: ReactNode}) {
    return (
        <div className={'d-flex flex-column justify-content-center align-items-center'}>
            <Spinner/>
            {children}
        </div>
    );
}

export default Loading;
