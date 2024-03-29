import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const OfferDescription = ({ content }) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
        ],
        content: content,
        editable: false,
    });

    useEffect(() => {
        if (editor)
            editor.commands.setContent(content);
    }, [content, editor]);

    return (
        <EditorContent editor={editor} />
    );
};

OfferDescription.propTypes = {
    content: PropTypes.string,
};

export default OfferDescription;
