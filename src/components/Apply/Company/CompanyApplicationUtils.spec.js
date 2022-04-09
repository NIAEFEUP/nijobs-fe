import { getHumanError } from "./CompanyApplicationUtils";
describe("CompanyApplicationUtils", () => {

    it("should return a readable error", () => {
        expect(getHumanError("email-already-exists")).toBe("The provided email is already associated to our platform.");
        expect(getHumanError("company-application-duplicate-email")).toBe("There is already an application associated with that email.");
        expect(getHumanError("random-error")).toBe("An error occurred, please try again.");
    });
});
