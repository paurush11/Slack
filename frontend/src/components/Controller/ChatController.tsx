import { CreateMessageDocument, MessageSeenSubscriptionDocument, MessageUpdatedSubscriptionDocument, NewMessageSubscriptionDocument, ResolverError } from '@/generated/output/graphql';
import { RootState } from '@/store/store';
import { emptyResolverError } from '@/utils/common';
import { useMutation, useSubscription } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, IconButton, TextField, Typography, useTheme } from '@mui/material';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import * as yup from "yup";
import ChatView from '../Views/ChatView';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Message } from '@/interfaces/allProps';
interface ChatControllerProps {

}

const validationSchema = yup
    .object({
        message: yup
            .string()
            .required("Field can't be empty"),
    })
    .required();


export const ChatController: React.FC<ChatControllerProps> = ({ }) => {
    const defaultValues = {
        message: "",
    };
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
        useState<[ResolverError]>(emptyResolverError);
    const theme = useTheme();
    const messageReceiver = useSelector((state: RootState) => state.myData.messageReceiverId)
    const channelId = useSelector((state: RootState) => state.myData.channelId);

    const [messages, setMessages] = useState<Message[]>([]);


    const [newMessage, { data, loading, error }] = useMutation(CreateMessageDocument)
    const onSubmit: SubmitHandler<{
        message: string;
    }> = async (data) => {

        if (channelId !== "" && messageReceiver !== "") {
            const response = await newMessage({
                variables: {
                    message: data.message,
                    channelId: channelId,
                    receiverId: messageReceiver
                },
            });
            if (response.data?.createMessage.data?._id) {
               
                return;
            } else if (response.data?.createMessage.resolverError) {
                const val = response.data?.createMessage.resolverError;
                var valueErrors: [ResolverError] = emptyResolverError;
                val.map((e) => valueErrors.push(e));
                setResponseError(valueErrors);
            }
        }
    };
    const messageField = (
        <Controller
            name="message"
            control={control}
            rules={{ required: "Field can't be empty" }}
            render={({ field }) => (
                <>
                    <TextField
                        fullWidth
                        aria-label="empty textarea"
                        {...field}
                        color="info"
                        required
                        multiline
                        maxRows={4}
                        id="message"
                        placeholder="Enter Your message"
                        error={!!errors.root}
                        helperText={errors.root?.message || ""}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 2, // Adjust border radius
                                padding: '8px', // Adjust padding
                                overflowY: 'auto', // Makes the text field scrollable when content exceeds the height
                            },
                        }}
                    />
                    {errors && errors.message && (
                        <Box pl={4}>
                            <Typography
                                key={errors.message.message}
                                sx={{
                                    color: theme.palette.error.dark,
                                }}
                            >
                                *{errors.message.message}
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
            sx={{
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary["600"],
                "&:hover": {
                    backgroundColor: theme.palette.primary["400"],
                },
                padding: 0
            }}
        >
            <IconButton>
                <ArrowUpwardIcon style={{
                    color: theme.palette.primary.contrastText,
                }} />
            </IconButton>
        </Button>
    );
    const resetButton = (
        <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
                setResponseError(emptyResolverError);
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
        <Box pt={4} key={"1212"}>
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
                            key={e.code}
                            sx={{
                                color: theme.palette.error.dark,
                            }}
                        >
                            {e.code !== emptyResolverError[0].code && "[code]:" && e.code}
                        </Typography>
                        <Typography
                            key={e.message}
                            sx={{
                                color: theme.palette.error.dark,
                            }}
                        >
                            {e.message !== emptyResolverError[0].message &&
                                "[message]:" &&
                                e.message}
                        </Typography>
                        <Typography
                            key={e.detail}
                            sx={{
                                color: theme.palette.error.dark,
                            }}
                        >
                            {e.detail !== emptyResolverError[0].detail &&
                                "[detail]:" &&
                                e.detail}
                        </Typography>
                        <Typography
                            key={e.name}
                            sx={{
                                color: theme.palette.error.dark,
                            }}
                        >
                            {e.name !== emptyResolverError[0].name && "[name]:" && e.name}
                        </Typography>
                    </>
                ))}
        </Box>
    );

    return (
        <ChatView

            messageField={messageField}
            submitButton={submitButton}
            resetButton={resetButton}
            responseErrors={responseErrors}
            onSubmit={handleSubmit((data) => onSubmit(data))}
            data={data}
            messages={messages}
            setMessages={setMessages}
        />);
}