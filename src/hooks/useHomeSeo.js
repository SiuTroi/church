import { useEffect, useState } from "react";
import { getHomeSeo, getHomeSite } from "../api";

export function useHomeSeo() {
    const [homeSeo, setHomeSeo] = useState({});
    const [homeSite, setHomeSite] = useState({});

    useEffect(() => {
        const getApiAsync = async () => {
            const homeSeoRespone = await getHomeSeo();
            const homeSeoData = await homeSeoRespone.data;
            setHomeSeo(homeSeoData[0]);

            const homeSiteRespone = await getHomeSite();
            const homeSiteData = await homeSiteRespone.data;
            setHomeSite(homeSiteData[0]);
        };
        getApiAsync()
    }, [])
    return {
        homeSeo,
        homeSite
    }
}