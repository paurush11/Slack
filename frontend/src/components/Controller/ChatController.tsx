import { CreateMessageDocument, GetMyMessagesInChannelDocument, MeQuery, MessageSeenSubscriptionDocument, MessageUpdatedSubscriptionDocument, NewMessageSubscriptionDocument, ResolverError } from '@/generated/output/graphql';
import { RootState } from '@/store/store';
import { emptyResolverError } from '@/utils/common';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import router from 'next/router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import ChatView from '../Views/ChatView';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Message } from '@/interfaces/allProps';
import { setLastMessageIndex } from '@/store/meSlice';
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
    const user = useSelector((state: RootState) => state.myData.data);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const { data: GetMyMessagesInChannelData, loading: GetMyMessagesInChannelLoading, error: GetMyMessagesInChannelError } = useQuery(GetMyMessagesInChannelDocument, {
        variables: {
            channelId: channelId,
            friendId: messageReceiver
        }
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLastMessageIndex(messages.length - 1));

    }, [messages])
    const lastMessageIndex = useSelector((state: RootState) => state.myData.lastMessageIndex)
    console.log(lastMessageIndex)

    useEffect(() => {
        if (GetMyMessagesInChannelData && !GetMyMessagesInChannelLoading) {
            // Fetching and sorting messages
            // ...
            const sortedMessages = [...GetMyMessagesInChannelData.getMyMessagesInChannel]
                .map(msg => ({ ...msg, createdAt: new Date(msg.createdAt).getTime() }))
                .sort((msgA, msgB) => msgA.createdAt - msgB.createdAt).map(msg => ({ ...msg, createdAt: new Date(msg.createdAt).toDateString() }));
            setMessages(sortedMessages);
        }
    }, [GetMyMessagesInChannelData, GetMyMessagesInChannelLoading]);

    useLayoutEffect(() => {
        if (!GetMyMessagesInChannelLoading && lastMessageIndex >= 0) {
            // Scroll to the last message
            // ...
            if (messages.length > 0 && lastMessageIndex >= 0 && messages[lastMessageIndex]) {
                lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [GetMyMessagesInChannelLoading, lastMessageIndex]);



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
                reset(defaultValues);
                return;
            } else if (response.data?.createMessage.resolverError) {
                const val = response.data?.createMessage.resolverError;
                var valueErrors: [ResolverError] = emptyResolverError;
                val.map((e) => valueErrors.push(e));
                setResponseError(valueErrors);
            }
        }
    };

    const { data: newMessages, loading: newMessagesLoading, error: newMessagesError } = useSubscription(NewMessageSubscriptionDocument, {
        variables: { channelId: channelId }
    });
    const { data: updatedMessages, loading: updatedMessagesLoading, error: updatedMessagesError } = useSubscription(MessageUpdatedSubscriptionDocument, {
        variables: { channelId: channelId }
    });
    const { data: seenMessages, loading: seenMessagesLoading, error: seenMessagesError } = useSubscription(MessageSeenSubscriptionDocument, {
        variables: { channelId: channelId }
    });

    useEffect(() => {
        if (!newMessagesLoading && newMessages) {
            setMessages(prevMessages => [...prevMessages, newMessages.newMessage]);
        }
    }, [newMessages])
    useEffect(() => {
        if (updatedMessages) {
            setMessages(prevMessages => prevMessages.map(msg =>
                msg._id === (updatedMessages.messageUpdated as Message)._id ? (updatedMessages.messageUpdated as Message) : msg
            ));
        }
    }, [updatedMessages])
    useEffect(() => {
        if (!seenMessagesError && seenMessages) {
            setMessages(prevMessages => prevMessages.map(msg =>
                msg._id === seenMessages.messageSeen._id ? { ...msg, receiverSeen: false } : msg
            ));
        }
    }, [seenMessages])



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

    const chatField = (
        user && messages ? (

            <Stack spacing={2} overflow={"scroll"} p={2} display={"flex"} flexDirection={"column"} >
                {messages.map((msg, index) => (
                    <Box
                        ref={index === messages.length - 1 ? lastMessageRef : null}

                        display={"flex"}

                        flexDirection={msg.senderId === (user as MeQuery).Me?.user?._id ? "row-reverse" : "row"}

                        alignItems={"start"}
                    >
                        <Box
                            width={"80%"}
                            bgcolor={msg.senderId !== (user as MeQuery).Me?.user?._id ? theme.palette.primary.dark : theme.palette.primary.light}
                            color={theme.palette.primary.contrastText}
                            p={2}
                            borderRadius={msg.senderId === (user as MeQuery).Me?.user?._id ? '16px 16px 0px 16px' : '16px 16px 16px 0px'}
                        >
                            <Typography>
                                {msg.TextMessage}
                            </Typography>

                        </Box>

                    </Box>
                ))}

            </Stack>

        ) : <Box></Box>
    )
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
            chatField={chatField}
            messageField={messageField}
            submitButton={submitButton}
            resetButton={resetButton}
            responseErrors={responseErrors}
            onSubmit={handleSubmit((data) => onSubmit(data))}
            messages={messages}
            setMessages={setMessages}
        />);
}