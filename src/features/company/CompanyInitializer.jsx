import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectAuthInitialized,
    selectIsAuthenticated,
} from "@/features/auth/authSelectors";

import {
    useGetCompanyQuery,
} from "./companyApi";

import {
    setCompany,
    clearCompany,
} from "./companySlice";

const CompanyInitializer = ({
    children,
}) => {
    const dispatch = useDispatch();

    const isAuthenticated =
        useSelector(
            selectIsAuthenticated
        );

    const authInitialized =
        useSelector(
            selectAuthInitialized
        );

    const {
        data,
        isSuccess,
        isError,
    } = useGetCompanyQuery(undefined, {
        skip:
            !authInitialized ||
            !isAuthenticated,
    });

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(clearCompany());

            return;
        }

        if (
            isSuccess &&
            data?.success &&
            data?.data
        ) {
            dispatch(
                setCompany(data.data)
            );
        }
    }, [
        data,
        isAuthenticated,
        isSuccess,
        dispatch,
    ]);

    useEffect(() => {
        if (isError) {
            /*
             * Do not clear authentication here.
             *
             * A company request failure does not
             * automatically prove that the session
             * is invalid. Authentication failures
             * are handled by baseApi.
             */
        }
    }, [isError]);

    return children;
};

export default CompanyInitializer;