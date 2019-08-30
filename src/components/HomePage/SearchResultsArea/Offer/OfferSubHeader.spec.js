import React from "react";
import OfferSubHeader from "./OfferSubHeader";

import OfferCardStyle from "./OfferCard.module.css";

describe("OfferSubHeader", () => {
    it("should display correct details", () => {
        const company = "company";
        const location = "location";
        const date = "date";

        const wrapper = shallow(
            <OfferSubHeader
                company={company}
                location={location}
                date={date}
            />
        );

        expect(wrapper.find(`div.${OfferCardStyle.jobInfo}`).exists()).toBe(true);
        expect(wrapper.find(`span.${OfferCardStyle.subheaderLabel}`).first().prop("children")).toBe(company);
        expect(wrapper.find(`span.${OfferCardStyle.subheaderLabel}`).at(1).prop("children")).toBe(location);
        expect(wrapper.find("span.date-label").first().prop("children")).toBe(date);
    });
});
