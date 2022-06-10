import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

function extractRtkQueryError(error: FetchBaseQueryError | SerializedError): string | undefined {
    if ('status' in error) {
        if (error.status === 'FETCH_ERROR' || error.status === 'PARSING_ERROR' || error.status === 'CUSTOM_ERROR')
            return error.error;
        else
            return (error.data as {detail: string}).detail;
    }
    else
        return error.message;
}

export default extractRtkQueryError;
