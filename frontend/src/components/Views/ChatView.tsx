import { CreateMessageMutation } from '@/generated/output/graphql';
import { Message } from '@/interfaces/allProps';
import { RootState } from '@/store/store';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface ChatViewProps {
    messageField: React.JSX.Element
    submitButton: React.JSX.Element
    resetButton: React.JSX.Element
    chatField: React.JSX.Element
    responseErrors: React.JSX.Element
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const ChatView: React.FC<ChatViewProps> = ({ messageField, submitButton, resetButton, responseErrors, onSubmit, messages, setMessages, chatField }) => {
    const theme = useTheme();
    const receiverName = useSelector((state: RootState) => state.myData.messageReceiverFirstName + " " + state.myData.messageReceiverLastName)
    return (
        <Box
            component={"form"}
            bgcolor={`${theme.palette.background.default}`}
            display={"flex"}
            flexDirection={"column"}
            onSubmit={onSubmit}
            borderRadius={10}
            flexGrow={1}

            mr={2}
            ml={2}
        >
            <Stack display={"flex"} direction={"column"} flexGrow={1}>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"} p={0} bgcolor={theme.palette.primary.dark} borderRadius={'16px 16px 0 0'}>
                    <Stack display={"flex"} direction={"row"} p={2} gap={1} justifyContent={"flex-end"} alignItems={"center"}>
                        <IconButton>
                            <AccountCircleSharpIcon style={{
                                color: theme.palette.primary.contrastText
                            }} />
                        </IconButton>
                        <Typography color={theme.palette.primary.contrastText}>
                            {receiverName}
                        </Typography>
                    </Stack>
                </Box>
                <Box display={"flex"} flexDirection={"column"} height={"70vh"} flexGrow={1}>

                    {chatField}
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