import { yupResolver } from "@hookform/resolvers/yup";
import {
    CardContent,
    CardHeader,
    DialogContent,
    FormHelperText,
    Grid,
    TextField,
} from "@material-ui/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import React, { useCallback, useContext, useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useMobile } from "../../../utils/media-queries";
import CreateOfferSchema from "./CreateOfferSchema";
import useCreateOfferStyles from "./createOfferStyles";
import { CreateOfferConstants } from "./CreateOfferUtils";

import "./editor.css";
import { FormatBold, FormatItalic, FormatUnderlined } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

export const CreateOfferControllerContext = React.createContext();

export const CreateOfferController = () => {

    // eslint-disable-next-line no-unused-vars
    const { handleSubmit, formState: { errors }, control, register, getValues } = useForm({
        mode: "all",
        resolver: yupResolver(CreateOfferSchema),
        reValidateMode: "onChange",
        defaultValues: {
            title: "",
            publishDate: "",
            publishEndDate: "",
            jobMinDuration: 1,
            jobMaxDuration: 2,
            jobStartDate: "",
            description: "",
            descriptionText: "",
            contacts: [{ value: "" }],
            isPaid: false,
            vacancies: undefined,
            jobType: "",
            fields: [{ value: "" }],
            technologies: [{ value: "" }],
            location: "",
            requirements: [{ value: "" }],
        },
    });

    const fields = useWatch({ control });

    // eslint-disable-next-line no-unused-vars
    const { fields: requirements, appendRequirement, removeRequirement } = useFieldArray({
        control,
        name: "requirements",
    });

    // eslint-disable-next-line no-unused-vars
    const { fields: contacts, appendContact, removeContact } = useFieldArray({
        control,
        name: "contacts",
    });

    const submit = useCallback(
        // eslint-disable-next-line no-unused-vars
        (data) => {

            // TODO


            // setLoading(true);
            // const { bio, contacts } = data;
            // getCroppedImg(
            //     logoUploadOptions.logoPreview,
            //     logoUploadOptions.croppedAreaPixels,
            //     0
            // ).then((croppedImage) => completeRegistration({ logo: croppedImage, bio, contacts: contacts.map(({ value }) => value) }))
            //     .then(() => {
            //         setSucceeded(true);
            //         setLoading(false);
            //     })
            //     .catch((err) => {
            //         setSubmissionErrors(err);
            //         setLoading(false);
            //     });
        },
        [],
    );

    return {
        controllerOptions: {
            initialValue: {
                submit: handleSubmit(submit),
                control,
                contacts,
                requirements,
                fields,
                errors,
            },
        },
    };
};

// TODO MOVE THIS COMPONENT TO UTILS

const EditorToolbar = ({ editor }) => {

    const [formats, setFormats] = React.useState(() => []);

    useEffect(() => {
        if (!editor) return;

        const toggleButtonsState = () => {
            const state = [];
            if (editor.isActive("bold")) state.push("bold");
            if (editor.isActive("italic")) state.push("italic");
            if (editor.isActive("underline")) state.push("underline");
            setFormats(state);
        };

        editor.on("transaction", toggleButtonsState);

        // eslint-disable-next-line consistent-return
        return () => {
            editor.off("transaction", toggleButtonsState);
        };
    }, [editor]);

    return (
        <ToggleButtonGroup size="small" value={formats} aria-label="text formatting">
            <ToggleButton
                value="bold"
                aria-label="bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <FormatBold fontSize="small" />
            </ToggleButton>
            <ToggleButton
                value="italic"
                aria-label="italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <FormatItalic fontSize="small" />
            </ToggleButton>
            <ToggleButton
                value="underline"
                aria-label="underline"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <FormatUnderlined fontSize="small" />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

const TextEditor = ({ editor, onChangeDescription, onChangeDescriptionText, helperText, error }) => {
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

    return (
        <>
            {!!editor &&
            <>
                <EditorToolbar editor={editor} />
                <EditorContent editor={editor} />
                <FormHelperText error={error}>
                    {helperText}
                </FormHelperText>
            </>
            }
        </>
    );
};

const CreateOfferForm = () => {

    const {
        submit,
        errors,
        control,
    } = useContext(CreateOfferControllerContext);

    const isMobile = useMobile();

    const Content = isMobile ? DialogContent : CardContent;
    const classes = useCreateOfferStyles(isMobile)();


    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: "<p>Hello World! 🌎️</p><h1>title</h1>",
        editable: true,
        editorProps: {
            attributes: {
                class: "editor", // Cannot use makeStyles with this since it won't update the class name on re-render :(
            },
        },
    });
    const descriptionHelperText =
    `${editor?.view.state.doc.textContent.length}/${CreateOfferConstants.description.maxLength} ${errors.descriptionText?.message || ""}`;

    return (
        <div className={classes.formCard}>
            <CardHeader title={!useMobile() && "New Offer" } />
            <Content className={classes.formContent}>
                <Grid container>
                    <Grid item xs={12}>
                        <form
                            onSubmit={submit}
                            aria-label="Create Offer Form"
                        >
                            <Controller
                                name="title"
                                render={(
                                    { field: { onChange, onBlur, ref, name, value } },
                                ) => (
                                    <TextField
                                        name={name}
                                        value={value}
                                        label="Offer Title"
                                        id="title"
                                        error={!!errors.title}
                                        inputRef={ref}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        helperText={
                                            `${value?.length}/${CreateOfferConstants.title.maxLength} ${errors.title?.message || ""}`
                                        }
                                        variant="outlined"
                                        FormHelperTextProps={{
                                            style: {
                                                marginLeft: 0,
                                            },
                                        }}
                                        fullWidth
                                    />)}
                                control={control}
                            />
                            <Controller
                                name="descriptionText"
                                render={(
                                    { field: { onChange: onChangeDescriptionText } },
                                ) => (
                                    <Controller
                                        name="description"
                                        render={(
                                            { field: { onChange: onChangeDescription } },
                                        ) => (
                                            <TextEditor
                                                onChangeDescription={onChangeDescription}
                                                onChangeDescriptionText={onChangeDescriptionText}
                                                editor={editor}
                                                error={!!errors?.descriptionText}
                                                helperText={descriptionHelperText}
                                            />
                                        )}
                                        control={control}
                                    />
                                )}
                                control={control}
                            />

                        </form>
                    </Grid>
                </Grid>
            </Content>
        </div>
    );
};

export default CreateOfferForm;
