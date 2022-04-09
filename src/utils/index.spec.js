import React, { useContext } from "react";
import { createMemoryHistory } from "history";
import { Switch, Link, Router } from "react-router-dom";
import { smoothScrollToRef, capitalize, Wrap, Route, ProtectedRoute } from ".";
import { render, renderWithStore, screen, act, fireEvent } from "../test-utils";
import useSession from "../hooks/useSession";

jest.mock("../hooks/useSession");

describe("utils", () => {
    describe("smooth scroll to ref", () => {
        it("should smooth scroll to ref", () => {
            const scrollIntoViewMock = jest.fn();
            const ref = {
                current: {
                    scrollIntoView: scrollIntoViewMock,
                },
            };

            smoothScrollToRef(ref);
            expect(scrollIntoViewMock).toHaveBeenCalledWith({
                behavior: "smooth",
                block: "start",
            });
        });

        it("should not scroll if ref is not set", () => {
            const scrollIntoViewMock = jest.fn();
            const ref = {};

            smoothScrollToRef(ref);
            expect(scrollIntoViewMock).toHaveBeenCalledTimes(0);
        });
    });

    describe("capitalize", () => {
        it("should capitalize string", () => {
            expect(capitalize("string")).toBe("String");
            expect(capitalize("STRING")).toBe("STRING");
            expect(capitalize("s")).toBe("S");
        });
        it("should throw error if trying to capitalize non-string", () => {
            expect(() => capitalize([1])).toThrowError("Trying to capitalize non string object:");
        });
    });

    describe("Wrap", () => {
        // eslint-disable-next-line react/prop-types
        const WrapperComponent = ({ children }) =>
            <div data-testid="test">
                {children}
            </div>;
        it("Should wrap with component", () => {

            render(
                <Wrap on={true} Wrapper={WrapperComponent}>
                    <p>Hello</p>
                </Wrap>
            );

            expect(screen.getByTestId("test")).toBeInTheDocument();
            expect(screen.getByText("Hello")).toBeInTheDocument();
        });
        it("Should NOT wrap with component", () => {
            render(
                <Wrap on={false} Wrapper={WrapperComponent}>
                    <p>Hello</p>
                </Wrap>
            );

            expect(screen.queryByTestId("test")).not.toBeInTheDocument();
            expect(screen.getByText("Hello")).toBeInTheDocument();
        });
    });

    describe("Routes", () => {

        const HomePageControllerContext = React.createContext();
        const HomePageController = () => ({
            controllerOptions: {
                initialValue: {
                    text: "You are home",
                },
            },
        });

        const Home = () => {
            const { text } = useContext(HomePageControllerContext);

            return (
                <div>
                    {text}
                </div>
            );
        };

        const AboutPageControllerContext = React.createContext();
        const AboutPageController = () => ({
            controllerOptions: {
                initialValue: {
                    text: "You are on the about page",
                },
            },
        });

        const About = () => {
            const { text } = useContext(AboutPageControllerContext);

            return (
                <div>
                    {text}
                </div>
            );
        };

        const AdminPage = () => <div>Only admins can see this page</div>;
        const CompanyOwnerPage = () => <div>Only companies can see this page</div>;
        const NoMatch = () => <div>No match</div>;

        const TestApp = () => (
            <div>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/admin">Admin Page</Link>
                <Link to="/company">Company Page</Link>

                <Switch>
                    <Route
                        exact
                        path="/"
                        key="/"
                        context={HomePageControllerContext}
                        controller={HomePageController}
                    >
                        <Home />
                    </Route>
                    <Route
                        path="/about"
                        key="/about"
                        context={AboutPageControllerContext}
                        controller={AboutPageController}
                    >
                        <About />
                    </Route>
                    <ProtectedRoute
                        path="/admin"
                        key="/admin"
                        unauthorizedRedirectPath="/"
                        unauthorizedRedirectMessage="You are not allowed to access this page."
                        authorize={(user) => (user.isAdmin)}
                    >
                        <AdminPage />
                    </ProtectedRoute>
                    <ProtectedRoute
                        path="/company"
                        key="/company"
                        unauthorizedRedirectPath="/"
                        unauthorizedRedirectMessage="You are not allowed to access this page."
                        authorize={(user) => !!(user?.company)}
                    >
                        <CompanyOwnerPage />
                    </ProtectedRoute>
                    <Route key="/no-match">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        );

        it("should render the TestApp component", () => {

            const history = createMemoryHistory();
            renderWithStore(
                <Router history={history}>
                    <TestApp />
                </Router>,
            );

            expect(screen.getByText("You are home")).toBeInTheDocument();
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("About")).toBeInTheDocument();
            expect(screen.getByText("Admin Page")).toBeInTheDocument();
            expect(screen.getByText("Company Page")).toBeInTheDocument();
        });

        it("should allow to navigate between the non protected routes", async () => {

            const history = createMemoryHistory();
            renderWithStore(
                <Router history={history}>
                    <TestApp />
                </Router>,
            );

            await act(async () => {
                await fireEvent.click(screen.queryByText("About"));
            });
            expect(screen.getByText("You are on the about page")).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(screen.queryByText("Home"));
            });
            expect(screen.getByText("You are home")).toBeInTheDocument();
        });

        it("should redirect to the home page when the user is not allowed to enter a protected route", async () => {

            useSession.mockImplementation(() => ({ isLoggedIn: false }));

            const history = createMemoryHistory();
            renderWithStore(
                <Router history={history}>
                    <TestApp />
                </Router>,
            );

            await act(async () => {
                await fireEvent.click(screen.queryByText("About"));
            });
            expect(screen.getByText("You are on the about page")).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(screen.queryByText("Admin Page"));
            });
            expect(screen.getByText("You are home")).toBeInTheDocument();
        });

        it("should allow a user who has permission to enter a protected route", async () => {

            useSession.mockImplementation(() => ({
                isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
            }));

            const history = createMemoryHistory();
            renderWithStore(
                <Router history={history}>
                    <TestApp />
                </Router>,
            );

            await act(async () => {
                await fireEvent.click(screen.queryByText("About"));
            });
            expect(screen.getByText("You are on the about page")).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(screen.queryByText("Company Page"));
            });
            expect(screen.getByText("Only companies can see this page")).toBeInTheDocument();
        });

        it("should enter the no match page when the provided route does not exist", () => {

            const history = createMemoryHistory();
            history.push("/some/bad/route");
            renderWithStore(
                <Router history={history}>
                    <TestApp />
                </Router>,
            );

            expect(screen.getByText("No match")).toBeInTheDocument();
        });
    });
});
