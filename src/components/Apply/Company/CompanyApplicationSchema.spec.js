import CompanyApplicationSchema from "./CompanyApplicationSchema";

describe("Company Application Schema", () => {
    it("should define company name rules", async () => {
        try {
            await CompanyApplicationSchema.validateAt("companyName", {});
        } catch (err) {
            expect(err.message).toBe("Required field.");
        }
        try {
            await CompanyApplicationSchema.validateAt("companyName", {
                companyName: "a",
            });
        } catch (err) {
            expect(err.message).toBe("Must have at least 2 characters.");
        }
        try {
            await CompanyApplicationSchema.validateAt("companyName", {
                companyName: "a".repeat(51),
            });
        } catch (err) {
            expect(err.message).toBe("Must not exceed 50 characters.");
        }

        const validResult = await CompanyApplicationSchema.validateAt("companyName", {
            companyName: "valid",
        });
        expect(validResult).toBe("valid");
    });

    it("should define email rules", async () => {
        try {
            await CompanyApplicationSchema.validateAt("email", {});
        } catch (err) {
            expect(err.message).toBe("Required field.");
        }
        try {
            await CompanyApplicationSchema.validateAt("email", {
                email: "a",
            });
        } catch (err) {
            expect(err.message).toBe("Must be a valid email.");
        }

        const validResult = await CompanyApplicationSchema.validateAt("email", {
            email: "valid@validate.com",
        });
        expect(validResult).toBe("valid@validate.com");
    });

    it("should define password rules", async () => {
        try {
            await CompanyApplicationSchema.validateAt("password", {});
        } catch (err) {
            expect(err.message).toBe("Required field.");
        }
        try {
            await CompanyApplicationSchema.validateAt("password", {
                password: "a",
            });
        } catch (err) {
            expect(err.message).toBe("Must have at least 8 characters.");
        }
        try {
            await CompanyApplicationSchema.validateAt("password", {
                password: "password",
            });
        } catch (err) {
            expect(err.message).toBe("Must contain at least a number.");
        }

        const validResult = await CompanyApplicationSchema.validateAt("password", {
            password: "password123",
        });
        expect(validResult).toBe("password123");
    });

    it("should define password confirmation rules", async () => {
        try {
            await CompanyApplicationSchema.validateAt("confirmPassword", {
                password: "password123",
                confirmPassword: "a",
            });
        } catch (err) {
            expect(err.message).toBe("Passwords must match.");
        }

        const validResult = await CompanyApplicationSchema.validateAt("confirmPassword", {
            password: "password123",
            confirmPassword: "password123",
        });
        expect(validResult).toBe("password123");
    });

    it("should define motivation rules", async () => {
        try {
            await CompanyApplicationSchema.validateAt("motivation", {});
        } catch (err) {
            expect(err.message).toBe("Required field.");
        }
        try {
            await CompanyApplicationSchema.validateAt("motivation", {
                motivation: "a",
            });
        } catch (err) {
            expect(err.message).toBe("Must have at least 10 characters.");
        }
        try {
            await CompanyApplicationSchema.validateAt("motivation", {
                motivation: "a".repeat(1501),
            });
        } catch (err) {
            expect(err.message).toBe("Must not exceed 1500 characters.");
        }

        const validResult = await CompanyApplicationSchema.validateAt("motivation", {
            motivation: "valid motivation",
        });
        expect(validResult).toBe("valid motivation");
    });
});
