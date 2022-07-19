import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "../AppTheme";
import { renderWithStoreAndTheme } from "../test-utils";
import ChangeLogPage from "./ChangeLogPage";
import * as changeLogService from "../services/changeLogService";
import { act } from "@testing-library/react";

jest.mock(
    "react-markdown",
    () =>
        function ReactMarkdown({ children }) {
            return <>{children}</>;
        }
);
jest.mock("remark-gfm", () => null);
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
        body: "### This is a test to verify if GitHub API can fetch releases\r\n\r\n_Boas amigo__\r\n\r\n`console.log('hello')`\r\n\r\n`console.log('world')`\r\n\r\n- [ ] Destensar\r\n- [X] We\r\n- [ ] le\r\n- [ ] le\r\n- [ ] le\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \r\n\r\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \r\n\r\nDui nunc mattis enim ut tellus elementum sagittis vitae et. Ante in nibh mauris cursus mattis. \r\n\r\nFaucibus vitae aliquet nec ullamcorper sit amet. Fusce id velit ut tortor pretium viverra suspendisse potenti.\r\n",
    },
];

describe("Changelog Page", () => {
    it("Should show Changelog text", async () => {
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

        const components = await wrapper.getAllByTestId("releaseDate");
        console.log("components -> ", components);
    });
});
