import { HumanValidationReasons } from "../../../utils";
import Constants from "../../../utils/Constants";
import { getHumanError } from "./AuthUtils";
describe("AuthUtils", () => {
    it("should return a readable error", () => {
        expect(getHumanError("must-be-a-valid-email")).toBe(HumanValidationReasons.EMAIL);
        expect(getHumanError("invalid-token")).toBe("The token provided is invalid or has expired.");
        expect(getHumanError("random-error")).toBe(Constants.UNEXPECTED_ERROR_MESSAGE);
    });
});
