import React from "react";
import { HomeHero, HomeFeatures } from "../widgets/home";

export const HomePage: React.FC = () => {
    return (
        <>
            <HomeHero />
            <HomeFeatures />
        </>
    );
};