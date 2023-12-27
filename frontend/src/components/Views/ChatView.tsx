import { CreateMessageMutation, MessageSeenSubscriptionSubscription, MessageUpdatedSubscriptionSubscription, NewMessageSubscriptionSubscription } from '@/generated/output/graphql';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { Message } from '@/interfaces/allProps';

interface ChatViewProps {
    seenMessages: MessageSeenSubscriptionSubscription | undefined
    updatedMessages: MessageUpdatedSubscriptionSubscription | undefined
    newMessages: NewMessageSubscriptionSubscription | undefined
    messageField: React.JSX.Element
    submitButton: React.JSX.Element
    resetButton: React.JSX.Element
    responseErrors: React.JSX.Element
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
    data: CreateMessageMutation | null | undefined
    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const ChatView: React.FC<ChatViewProps> = ({ seenMessages, updatedMessages, newMessages, messageField, submitButton, resetButton, responseErrors, onSubmit, data, messages }) => {
    const theme = useTheme();

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