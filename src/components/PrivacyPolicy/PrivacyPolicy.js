import React, { useEffect } from "react";
import {
    DialogContent,
    CardContent,
    makeStyles,
} from "@material-ui/core";
import { useMobile } from "../../utils/media-queries";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import PrivacyPolicyMarkdown from "./PrivacyPolicy.md";

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: "white",
        padding: theme.spacing(4),
    },
}));


const PrivacyPolicyComponent = () => {
    const classes = useStyles();
    const isMobile = useMobile();
    const ContentComponent = isMobile ? DialogContent : CardContent;
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
        ],
        content: "",
        editable: false,
    });

    useEffect(() => {
        if (editor) {
            fetch(PrivacyPolicyMarkdown).then((res) => res.text()).then((text) => editor.commands.setContent(text));
        }
    }, [editor]);

    return (
        <div className={classes.content}>
            <ContentComponent>
                <EditorContent editor={editor} />
            </ContentComponent>
        </div>
    );
};
export default PrivacyPolicyComponent;
