import React, { useState, useRef, useEffect } from "react";

import MainView from "../components/HomePage/MainView";
import SearchResultsWidget from "../components/HomePage/SearchResultsArea/SearchResultsWidget/SearchResultsWidget";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import { smoothScrollToRef } from "../utils";
import useSession from "../hooks/useSession";
import { Button } from "@material-ui/core";

export const HomePage = () => {

    const productDescriptionRef = useRef(null);
    const searchResultsRef = useRef(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // this will not trigger the scroll on subsequent submits, because the dependencies won't change after the first call
    useEffect(() => {
        if (showSearchResults && searchResultsRef) smoothScrollToRef(searchResultsRef);
    }, [searchResultsRef, showSearchResults]);

    const { data, update } = useSession();

    const login = (e) => {
        e.preventDefault();
        fetch("http://localhost:8087/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": "angelo@niaefeup.com",
                "password": "password123",
            }),
        })
            .then(() => update());
    };

    const logout = (e) => {
        e.preventDefault();
        fetch("http://localhost:8087/auth/login", {
            method: "DELETE",
            credentials: "include",
        })
            .then(() => update());
    };

    return (
        <React.Fragment>
            <Button onClick={login}>LOGIN</Button>
            <Button onClick={logout}>LOGOUT</Button>
            <Button onClick={() => update()}>UPFKNDATE</Button>
            {data && data.email && `Hello ${data.email}`}
            <MainView
                scrollToProductDescription={smoothScrollToRef.bind(null, productDescriptionRef)}
                showSearchResults={() => {
                    setShowSearchResults(true);
                    if (searchResultsRef && searchResultsRef.current) smoothScrollToRef(searchResultsRef);
                }}
            />
            <ProductDescription ref={productDescriptionRef}/>
            {showSearchResults && <SearchResultsWidget ref={searchResultsRef}/>}
        </React.Fragment>
    );

};

export default HomePage;
