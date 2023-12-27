import { CreateMessageMutation, MessageSeenSubscriptionDocument, MessageSeenSubscriptionSubscription, MessageUpdatedSubscriptionDocument, MessageUpdatedSubscriptionSubscription, NewMessageSubscriptionDocument, NewMessageSubscriptionSubscription } from '@/generated/output/graphql';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { Message } from '@/interfaces/allProps';
import { RootState } from '@/store/store';
import { useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';

interface ChatViewProps {
    messageField: React.JSX.Element
    submitButton: React.JSX.Element
    resetButton: React.JSX.Element
    responseErrors: React.JSX.Element
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
    data: CreateMessageMutation | null | undefined
    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const ChatView: React.FC<ChatViewProps> = ({ messageField, submitButton, resetButton, responseErrors, onSubmit, data, messages, setMessages }) => {
    const theme = useTheme();
    const channelId = useSelector((state: RootState) => state.myData.channelId);
    console.log(channelId)

    const { data: newMessages, loading: newMessagesLoading, error: newMessagesError } = useSubscription(NewMessageSubscriptionDocument, {
        variables: { channelId: channelId }
    });
    const { data: updatedMessages, loading: updatedMessagesLoading, error: updatedMessagesError } = useSubscription(MessageUpdatedSubscriptionDocument, {
        variables: { channelId: channelId }
    });
    const { data: seenMessages, loading: seenMessagesLoading, error: seenMessagesError } = useSubscription(MessageSeenSubscriptionDocument, {
        variables: { channelId: channelId }
    });

    console.log(newMessages)
    useEffect(() => {
        if (!newMessagesLoading && newMessages) {
            console.log("here")
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

    return (
        <Box
            component={"form"}
            bgcolor={`${theme.palette.background.default}`}
            display={"flex"}
            flexDirection={"column"}
            onSubmit={onSubmit}
            borderRadius={10}
            flexGrow={1}
            height={"98%"}
            mr={2}
            ml={2}
        >
            <Stack display={"flex"} direction={"column"} justifyContent={"space-between"} flexGrow={1}>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"} p={0} bgcolor={theme.palette.primary.dark} borderRadius={'16px 16px 0 0'}>
                    <Stack display={"flex"} direction={"row"} p={2} gap={1} justifyContent={"flex-end"} alignItems={"center"}>
                        <IconButton>
                            <AccountCircleSharpIcon style={{
                                color: theme.palette.primary.contrastText
                            }} />
                        </IconButton>
                        <Typography color={theme.palette.primary.contrastText}>
                            {data?.createMessage.data?.sender.firstName || "Paurush Batish"}
                        </Typography>
                    </Stack>
                </Box>
                <Box bgcolor={theme.palette.background.paper}>
                    <Stack display={"flex"} direction={"row"} p={2} gap={2}>
                        <Box width={"100%"} display={"flex"} alignItems={"center"}>
                            {messageField}
                        </Box>
                        <Box display={"flex"} alignItems={"center"} >
                            {submitButton}
                        </Box>
                    </Stack>

                </Box>



            </Stack>


        </Box>
    );
}

export default ChatView