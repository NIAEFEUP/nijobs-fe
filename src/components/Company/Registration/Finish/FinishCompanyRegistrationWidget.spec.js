import { createTheme } from "@material-ui/core/styles";
import React from "react";
import useComponentController from "../../../../hooks/useComponentController";
import { renderWithTheme, screen, act, fireEvent } from "../../../../test-utils";
import userEvent from "@testing-library/user-event";

import FinishCompanyRegistrationWidget, {
    FinishCompanyRegistrationController,
    FinishCompanyRegistrationControllerContext,
} from "./FinishCompanyRegistrationWidget";
import { FinishCompanyRegistrationConstants } from "./FinishCompanyRegistrationUtils";
import useSession from "../../../../hooks/useSession";
import getCroppedImg from "../../../utils/image/cropImage";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../../hooks/useSession");
jest.mock("../../../utils/image/cropImage");

// eslint-disable-next-line react/prop-types
const FinishCompanyRegistrationWrapper = ({ children }) => {
    const {
        ContextProvider,
        contextProviderProps,
    } = useComponentController(
        FinishCompanyRegistrationController,
        null,
        FinishCompanyRegistrationControllerContext
    );

    return (
        <ContextProvider {...contextProviderProps}>
            {children}
        </ContextProvider>
    );
};

describe("FinishCompanyRegistrationWidget", () => {
    const theme = createTheme({});

    it("Should submit request successfully", async () => {

        useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));
        getCroppedImg.mockImplementation(() => Promise.resolve("logo"));
        fetch.mockResponse(JSON.stringify({}));

        const { findDescriptionOf } = renderWithTheme(
            <BrowserRouter>
                <FinishCompanyRegistrationWrapper>
                    <FinishCompanyRegistrationWidget />
                </FinishCompanyRegistrationWrapper>
            </BrowserRouter>,
            { theme }
        );

        // .parentNode is necessary since MUI BUttons render a span for their text
        expect(screen.getByText("Back").parentNode).toBeDisabled();
        expect(screen.getByText("Next").parentNode).toBeDisabled();

        /** LOGO **/
        const file = new File(["hello"], "hello.png", { type: "image/png" });
        const logoInput = screen.getByLabelText("Upload");

        global.URL.createObjectURL = () => {};
        global.URL.revokeObjectURL = () => {};

        await act(async () => {
            await userEvent.upload(logoInput, file);
        });

        expect(logoInput.files[0]).toStrictEqual(file);
        expect(logoInput.files).toHaveLength(1);

        fireEvent.click(screen.getByText("Next"));
        expect(screen.getByText("Back").parentNode).toBeEnabled();
        expect(screen.getByText("Next").parentNode).toBeDisabled();

        /** BIO **/
        const bioInput = screen.getByLabelText("Company Bio");

        expect(bioInput).toHaveTextContent("");
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("0/1500");

        fireEvent.change(bioInput, { target: { value: "f".repeat(10) } });
        expect(bioInput).toHaveTextContent("f".repeat(10));
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("10/1500");

        fireEvent.change(bioInput, { target: { value: "" } });
        expect(bioInput).toHaveTextContent("");
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("0/1500 Required field.");

        expect(screen.getByText("Next").parentNode).toBeDisabled();

        fireEvent.change(bioInput, { target: { value: "f".repeat(10) } });
        expect(bioInput).toHaveTextContent("f".repeat(10));
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("10/1500");

        expect(screen.getByText("Next").parentNode).toBeEnabled();

        fireEvent.click(screen.getByText("Next"));

        /** CONTACTS **/
        expect(screen.getByText("Next").parentNode).toBeDisabled();
        expect(screen.getAllByLabelText(/Contact #/).length).toBe(1);
        expect(screen.getAllByLabelText(/Contact #/)[0]).toHaveTextContent("");

        await act(async () => {
            await fireEvent.change(screen.getAllByLabelText(/Contact #/)[0], { target: { value: "contact 0" } });
        });

        expect(screen.getAllByLabelText(/Contact #/)[0]).toHaveValue("contact 0");
        expect(screen.getByLabelText("Remove Entry 0")).toBeDisabled();
        expect(screen.getByText("Next").parentNode).toBeEnabled();

        for (let i = 1; i < FinishCompanyRegistrationConstants.contacts.max; i++) {
            fireEvent.click(screen.getByText("Add Entry"));
            expect(screen.getByText("Next").parentNode).toBeDisabled();

            expect(screen.getAllByLabelText(/Contact #/).length).toBe(i + 1);

            await act(async () => {
                await fireEvent.change(screen.getAllByLabelText(/Contact #/)[i], { target: { value: `contact ${i}` } });
            });
            expect((await screen.findByText("Next")).parentNode).toBeEnabled();
        }

        expect(screen.getByText("Add Entry").parentNode).toBeDisabled();

        await act(async () => {
            await fireEvent.click(screen.getByLabelText("Remove Entry 9"));
        });
        expect(screen.getAllByLabelText(/Contact #/).length).toBe(FinishCompanyRegistrationConstants.contacts.max - 1);

        fireEvent.click(screen.getByText("Next"));

        /** REVIEW **/
        expect(screen.getByText("Company Name")).toBeInTheDocument();
        expect(screen.getByText("f".repeat(10))).toBeInTheDocument();
        for (let i = 0; i < FinishCompanyRegistrationConstants.contacts.max - 1; i++) {
            expect(screen.getByText(`contact ${i}`)).toBeInTheDocument();
        }

        await act(async () => {
            await fireEvent.click(screen.getByText("Finish"));
        });

        const formData  = new FormData();

        formData.append("logo", "logo"); // This value is being mocked above on `getCroppedImg`
        for (let i = 0; i < FinishCompanyRegistrationConstants.contacts.max - 1; i++) {
            formData.append("contacts", `contact ${i}`);
        }
        formData.append("bio", "f".repeat(10));

        expect(fetch.mock.calls[0][1].body.get("logo")).toEqual(formData.get("logo"));
        expect(fetch.mock.calls[0][1].body.get("bio")).toEqual(formData.get("bio"));
        expect(fetch.mock.calls[0][1].body.getAll("contacts")).toEqual(formData.getAll("contacts"));

    }, 10000);

    it("Should show file type error", async () => {
        useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

        renderWithTheme(
            <BrowserRouter>
                <FinishCompanyRegistrationWrapper>
                    <FinishCompanyRegistrationWidget />
                </FinishCompanyRegistrationWrapper>
            </BrowserRouter>,
            { theme }
        );

        /** LOGO **/
        const file = new File(["hello"], "hello.png", { type: "image/gif" });
        const logoInput = screen.getByLabelText("Upload");

        global.URL.createObjectURL = () => {};
        global.URL.revokeObjectURL = () => {};

        await act(async () => {
            await userEvent.upload(logoInput, file);
        });

        expect(screen.getByText("File type must be one of the following: image/jpeg, image/png.")).toBeInTheDocument();
        expect(logoInput.files[0]).toStrictEqual(file);
        expect(logoInput.files).toHaveLength(1);

        expect(screen.getByText("Next").parentNode).toBeDisabled();

    });

    it("Should show file size error", async () => {
        useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

        renderWithTheme(
            <BrowserRouter>
                <FinishCompanyRegistrationWrapper>
                    <FinishCompanyRegistrationWidget />
                </FinishCompanyRegistrationWrapper>
            </BrowserRouter>,
            { theme }
        );

        /** LOGO **/
        const file = new File(["hello"], "hello.png", { type: "image/png" });
        // Simulate file size without actually taking 10+ MB for this test...
        Object.defineProperty(file, "size", { value: 11e6 });
        const logoInput = screen.getByLabelText("Upload");

        global.URL.createObjectURL = () => {};
        global.URL.revokeObjectURL = () => {};

        await act(async () => {
            await userEvent.upload(logoInput, file);
        });

        expect(screen.getByText("File size must be under 10MB.")).toBeInTheDocument();
        expect(logoInput.files[0]).toStrictEqual(file);
        expect(logoInput.files).toHaveLength(1);
        expect(screen.getByText("Next").parentNode).toBeDisabled();

    });

    it("Should show bio errors", async () => {

        useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));
        getCroppedImg.mockImplementation(() => Promise.resolve("logo"));

        const { findDescriptionOf } = renderWithTheme(
            <BrowserRouter>
                <FinishCompanyRegistrationWrapper>
                    <FinishCompanyRegistrationWidget />
                </FinishCompanyRegistrationWrapper>
            </BrowserRouter>,
            { theme }
        );

        /** LOGO **/
        const file = new File(["hello"], "hello.png", { type: "image/png" });
        const logoInput = screen.getByLabelText("Upload");

        global.URL.createObjectURL = () => {};
        global.URL.revokeObjectURL = () => {};

        await act(async () => {
            await userEvent.upload(logoInput, file);
        });

        fireEvent.click(screen.getByText("Next"));

        /** BIO **/
        const bioInput = screen.getByLabelText("Company Bio");

        expect(bioInput).toHaveTextContent("");
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("0/1500");

        fireEvent.change(bioInput, { target: { value: "f".repeat(10) } });
        expect(bioInput).toHaveTextContent("f".repeat(10));
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("10/1500");

        fireEvent.change(bioInput, { target: { value: "" } });
        expect(bioInput).toHaveTextContent("");
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("0/1500 Required field.");

        expect(screen.getByText("Next").parentNode).toBeDisabled();

        fireEvent.change(bioInput, { target: { value: "f".repeat(1501) } });
        expect(bioInput).toHaveTextContent("f".repeat(1501));
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("1501/1500 Must not exceed 1500 characters.");

        expect(screen.getByText("Next").parentNode).toBeDisabled();

    });

    it("Should show contacts errors", async () => {

        useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));
        getCroppedImg.mockImplementation(() => Promise.resolve("logo"));

        const { findDescriptionOf } = renderWithTheme(
            <BrowserRouter>
                <FinishCompanyRegistrationWrapper>
                    <FinishCompanyRegistrationWidget />
                </FinishCompanyRegistrationWrapper>
            </BrowserRouter>,
            { theme }
        );

        /** LOGO **/
        const file = new File(["hello"], "hello.png", { type: "image/png" });
        const logoInput = screen.getByLabelText("Upload");

        global.URL.createObjectURL = () => {};
        global.URL.revokeObjectURL = () => {};

        await act(async () => {
            await userEvent.upload(logoInput, file);
        });

        fireEvent.click(screen.getByText("Next"));

        /** BIO **/
        const bioInput = screen.getByLabelText("Company Bio");

        expect(bioInput).toHaveTextContent("");
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("0/1500");

        fireEvent.change(bioInput, { target: { value: "f".repeat(10) } });
        expect(bioInput).toHaveTextContent("f".repeat(10));
        expect(await findDescriptionOf(bioInput)).toHaveTextContent("10/1500");

        fireEvent.click(screen.getByText("Next"));

        /** CONTACTS **/
        expect(screen.getByText("Next").parentNode).toBeDisabled();

        await act(async () => {
            await fireEvent.change(screen.getAllByLabelText(/Contact #/)[0], { target: { value: "contact 0" } });
        });

        expect(screen.getAllByLabelText(/Contact #/)[0]).toHaveValue("contact 0");
        expect(screen.getByLabelText("Remove Entry 0")).toBeDisabled();

        await act(async () => {
            await fireEvent.change(screen.getByLabelText("Contact #0"), { target: { value: "" } });
        });

        expect(screen.getByLabelText("Contact #0")).toHaveValue("");
        expect(screen.getByLabelText("Remove Entry 0")).toBeDisabled();

        expect(await screen.findByText("Cannot be empty.")).toBeInTheDocument();

    });
});
