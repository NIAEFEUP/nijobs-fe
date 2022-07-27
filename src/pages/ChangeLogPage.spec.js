import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "../AppTheme";
import { renderWithStoreAndTheme } from "../test-utils";
import ChangeLogPage from "./ChangeLogPage";
import * as changeLogService from "../services/changeLogService";
import { act } from "@testing-library/react";
import { isAfter } from "date-fns";
import { MockedReactMarkdown } from "../components/utils/MockedReactMarkdown";

/* eslint-disable camelcase */

jest.mock("react-markdown", () => function rmMock(props) {
    return <MockedReactMarkdown {...props} />;
});
jest.mock("remark-gfm", () => () => null);
jest.mock("../services/changeLogService.js");

const mockedResponse = [
    {
        tag_name: "test2",
        name: "v1.0.0",
        draft: false,
        created_at: "2022-05-24T18:23:20Z",
        published_at: "2022-07-06T15:11:54Z",
        body: "- Moved image 1 cm to the right\r\n- Moved image 1 cm to the left\r\n- Idk what I'm doing",
    },
    {
        tag_name: "test",
        name: "Testing GitHub API",
        created_at: "2022-05-24T18:23:20Z",
        published_at: "2022-05-26T10:02:09Z",
        body: "### This is a test to verify if GitHub API can fetch releases\r\n",
    },
];

describe("Changelog Page", () => {
    it("Should show Changelog text", () => {
        changeLogService.fetchReleases.mockImplementationOnce(
            () =>
                new Promise((resolve, _) => {
                    resolve(mockedResponse);
                })
        );

        const wrapper = renderWithStoreAndTheme(
            <BrowserRouter>
                <ChangeLogPage />
            </BrowserRouter>,
            { theme: AppTheme }
        );

        expect(wrapper.getByText("Changelog")).toBeInTheDocument();
    });

    it("Last Updated text should have the most recent date", async () => {
        changeLogService.fetchReleases.mockImplementationOnce(
            () =>
                new Promise((resolve, _) => {
                    resolve(mockedResponse);
                })
        );

        let wrapper;
        await act(() => {
            wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <ChangeLogPage />
                </BrowserRouter>,
                { theme: AppTheme }
            );
        });

        expect(wrapper.getByText("Changelog")).toBeInTheDocument();

        const releaseDates = wrapper
            .getAllByTestId("releaseDate")
            .map((release) => release.innerHTML);

        let mostRecentDate = null;
        let mostRecentText = "";
        for (const releaseDate of releaseDates) {
            const formattedDate = new Date(
                `${releaseDate.substring(3, 5)}-${releaseDate.substring(
                    0,
                    2
                )}-${releaseDate.substring(6)}`
            );
            if (
                mostRecentDate === null ||
                isAfter(formattedDate, mostRecentDate)
            ) {
                mostRecentDate = formattedDate;
                mostRecentText = releaseDate;
            }
        }

        expect(wrapper.getByText(`Last updated: ${mostRecentText}`));
    });
});
