import React from "react";
import PropTypes from "prop-types";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const OfferDescription = ({ content }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: content,
        editable: false,
    });

    return (
        <EditorContent editor={editor} />
    );
};

OfferDescription.propTypes = {
    content: PropTypes.string,
};

export default OfferDescription;
