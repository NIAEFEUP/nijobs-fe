import { Box, FormControl, FormHelperText, makeStyles, Typography } from "@material-ui/core";
import { FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered, FormatUnderlined } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, {  useEffect } from "react";
import { CreateOfferConstants } from "../Offers/New/CreateOfferUtils";
import { PropTypes } from "prop-types";

const useStyles = makeStyles((theme) => ({
    editorToolbar: {
        marginBottom: theme.spacing(1),
        display: "flex",
        flexWrap: "wrap",
    },
    headingBtn: {
        height: theme.spacing(4.5),
    },
}));


const EditorToolbar = ({ editor, disabled }) => {

    const [formats, setFormats] = React.useState(() => []);
    const classes = useStyles();

    useEffect(() => {
        if (!editor) return;

        const toggleButtonsState = () => {
            const state = [];
            if (editor.isActive("bold")) state.push("bold");
            if (editor.isActive("italic")) state.push("italic");
            if (editor.isActive("underline")) state.push("underline");
            if (editor.isActive("bulletList")) state.push("bulletList");
            if (editor.isActive("orderedList")) state.push("orderedList");
            if (editor.isActive("heading", { level: 1 })) state.push("heading1");
            setFormats(state);
        };

        editor.on("transaction", toggleButtonsState);

        // eslint-disable-next-line consistent-return
        return () => {
            editor.off("transaction", toggleButtonsState);
        };
    }, [editor]);

    return (

        <div className={classes.editorToolbar}>
            <Box mr={2} mb={1} display="inline">
                <ToggleButtonGroup size="small" value={formats} aria-label="text formatting">
                    <ToggleButton
                        value="bold"
                        aria-label="bold"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={disabled}
                    >
                        <FormatBold fontSize="small" />
                    </ToggleButton>
                    <ToggleButton
                        value="italic"
                        aria-label="italic"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={disabled}
                    >
                        <FormatItalic fontSize="small" />
                    </ToggleButton>
                    <ToggleButton
                        value="underline"
                        aria-label="underline"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={disabled}
                    >
                        <FormatUnderlined fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box mr={2} mb={1} display="inline">
                <ToggleButtonGroup size="small" value={formats} aria-label="text lists">
                    <ToggleButton
                        value="bulletList"
                        aria-label="bulletList"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        disabled={disabled}
                    >
                        <FormatListBulleted fontSize="small" />
                    </ToggleButton>
                    <ToggleButton
                        value="orderedList"
                        aria-label="orderedList"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        disabled={disabled}
                    >
                        <FormatListNumbered fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box display="inline">
                <ToggleButtonGroup size="small" value={formats} aria-label="text lists">
                    <ToggleButton
                        className={classes.headingBtn}
                        value="heading1"
                        aria-label="heading1"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        disabled={disabled}
                    >
                        <Typography>section</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </div>
    );
};

EditorToolbar.propTypes =  {
    editor: PropTypes.object,
    disabled: PropTypes.bool,
};

const TextEditor = ({ content, onChangeDescription, onChangeDescriptionText, error, helperText: additionalHelperText, disabled }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({
                placeholder: "Write a description for this offer. You can specify goals, project and daily work details, etc. *",
            }),
            Heading.configure({
                levels: [1],
            }),
        ],
        content,
        editable: true,
        editorProps: {
            attributes: {
                class: "editor", // Cannot use makeStyles with this since it won't update the class name on re-render :(
            },
        },
    });

    useEffect(() => {
        if (!editor) return;
        const updateFn = ({ editor }) => {
            onChangeDescription(editor.getHTML());
            onChangeDescriptionText(editor.view.state.doc.textContent);
        };
        editor.on("update", updateFn);

        // eslint-disable-next-line consistent-return
        return () => {
            editor.off("update", updateFn);
        };

    }, [editor, onChangeDescription, onChangeDescriptionText]);

    useEffect(() => {
        if (!editor) return;
        editor.setEditable(!disabled);
    }, [disabled, editor]);

    const helperText =
    `${editor?.view.state.doc.textContent.length}/${CreateOfferConstants.description.maxLength} ${additionalHelperText}`;

    return (
        <>
            {!!editor &&
            <FormControl margin="dense" fullWidth>
                <EditorToolbar editor={editor} disabled={disabled} />
                <EditorContent editor={editor} />
                <FormHelperText error={error}>
                    {helperText}
                </FormHelperText>
            </FormControl>
            }
        </>
    );
};

TextEditor.propTypes = {
    content: PropTypes.any.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeDescriptionText: PropTypes.func.isRequired,
    error: PropTypes.any,
    helperText: PropTypes.any,
    disabled: PropTypes.bool,
};

export default TextEditor;
