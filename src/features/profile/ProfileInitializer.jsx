import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectAuthInitialized,
    selectIsAuthenticated,
} from "@/features/auth/authSelectors";

import {
    useGetProfileQuery,
} from "./profileApi";

import {
    setProfile,
    clearProfile,
} from "./profileSlice";

const ProfileInitializer = ({
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
    } = useGetProfileQuery(undefined, {
        skip:
            !authInitialized ||
            !isAuthenticated,
    });

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(clearProfile());

            return;
        }

        if (
            isSuccess &&
            data?.success &&
            data?.data
        ) {
            dispatch(
                setProfile(data.data)
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
             * A profile request failure is not
             * automatically proof that the session
             * is invalid. RTK Query/baseApi handles
             * authentication failures.
             */
        }
    }, [isError]);

    return children;
};

export default ProfileInitializer;