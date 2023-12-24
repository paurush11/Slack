import AddChannelView from "@/components/Views/AddChannelView";
import { IconSearch } from "../common/IconSearch";
import {
    CreateChannelDocument,
    NotFoundErrorType,
} from "@/generated/output/graphql";
import { emptyNotFoundError, emptyResolverError } from "@/utils/common";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface AddChannelControllerProps { }
const validationSchema = yup
    .object({
        description: yup.string().required("description is required"),
        name: yup.string().required("name is required"),
        iconName: yup.string().required("iconName is required"),
    })
    .required();
export const AddChannelController: React.FC<
    AddChannelControllerProps
> = ({ }) => {
    const defaultValues = {
        description: "",
        name: "",
        iconName: "",
    };

    const theme = useTheme();
    const {
        control,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
    });

    const [responseError, setResponseError] =
        useState<[NotFoundErrorType]>(emptyNotFoundError);
    const [CreateChannel, { data: CreateChannelDocumentData, loading, error }] =
        useMutation(CreateChannelDocument);
    useEffect(() => {
        if (responseError.length > 0) {
            console.log("Errors Updated", responseError);
        }
    }, [responseError]);

    const onSubmit: SubmitHandler<{
        name: string;
        description: string;
        iconName: string;
    }> = async (data) => {
        const response = await CreateChannel({
            variables: {
                name: data.name,
                iconName: data.iconName,
                description: data.description,
            },
        });

        if (response.data?.createChannel.channel?._id) {
            console.log(response.data.createChannel.channel?._id);
            router.push("/Home");
            return;
        } else if (response.data?.createChannel.errors) {
            const val = response.data?.createChannel.errors;
            var valueErrors: [NotFoundErrorType] = emptyNotFoundError;
            val.map((e) => valueErrors.push(e));
            setResponseError(valueErrors);
        }
    };

    const icomNameField = (
        <Controller
            name="iconName"
            control={control}
            rules={{ required: "Field can't be empty" }}
            
            render={({ field }) => (
                <>
                    <IconSearch {...field} />
                    {errors && errors.iconName && (
                        <Box pl={4}>
                            <Typography
                                key={errors.iconName.message}
                                sx={{
                                    color: theme.palette.error.dark,
                                }}
                            >
                                *{errors.iconName.message}
                            </Typography>
                        </Box>
                    )}
                </>
            )}
        />
    );

    const descriptionField = (
        <Controller
            name="description"
            control={control}
            rules={{ required: "Field can't be empty" }}
            render={({ field }) => (
                <>
                    <TextField
                        {...field}
                        color="primary"
                        required
                        id="description"
                        label="Description"
                        placeholder="Enter Your Description"
                        error={!!errors.root}
                        helperText={errors.root?.message || ""}
                    />
                    {errors && errors.description && (
                        <Box pl={4}>
                            <Typography
                                key={errors.description.message}
                                sx={{
                                    color: theme.palette.error.dark,
                                }}
                            >
                                *{errors.description.message}
                            </Typography>
                        </Box>
                    )}
                </>
            )}
        ></Controller>
    );
    const nameField = (
        <Controller
            name="name"
            control={control}
            rules={{ required: "name is required" }}
            render={({ field }) => (
                <>
                    <TextField
                        {...field}
                        required
                        id="name"
                        label="Channel Name"
                        placeholder="Enter your channel name"
                        error={!!errors.root}
                        helperText={errors.root?.message || ""}
                    />
                    {errors && errors.name && (
                        <Box pl={4}>
                            <Typography
                                key={errors.name.message}
                                sx={{
                                    color: theme.palette.error.dark,
                                }}
                            >
                                *{errors.name.message}
                            </Typography>
                        </Box>
                    )}
                </>
            )}
        ></Controller>
    );

    const submitButton = (
        <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary["300"],
                "&:hover": {
                    backgroundColor: theme.palette.primary["400"],
                },
            }}
        >
            Submit
        </Button>
    );
    const resetButton = (
        <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
                setResponseError(emptyNotFoundError);
                reset(defaultValues);
            }}
            sx={{
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary["300"],
                "&:hover": {
                    backgroundColor: theme.palette.primary["400"],
                },
            }}
        >
            Reset
        </Button>
    );
    const responseErrors = (
        <Box p={4}>
            {error && (
                <Typography
                    key={error.name}
                    sx={{
                        color: theme.palette.error.dark,
                    }}
                >
                    *{error.message}
                </Typography>
            )}
            {responseError &&
                responseError.map((e) => (
                    <>
                        <Typography
                            key={e.item}
                            sx={{
                                color: theme.palette.error.dark,
                            }}
                        >
                            {e.item !== emptyNotFoundError[0].item && "[item]:" && e.item}
                        </Typography>
                        <Typography
                            key={e.message}
                            sx={{
                                color: theme.palette.error.dark,
                            }}
                        >
                            {e.message !== emptyNotFoundError[0].message &&
                                "[message]:" &&
                                e.message}
                        </Typography>
                    </>
                ))}
        </Box>
    );

    return (
        <AddChannelView
            iconNameField={icomNameField}
            nameField={nameField}
            descriptionField={descriptionField}
            resetField={resetButton}
            submitField={submitButton}
            responseErrors={responseErrors}
            onSubmit={handleSubmit((data) => onSubmit(data))}
        />
    );
};
