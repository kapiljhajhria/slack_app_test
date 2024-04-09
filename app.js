import express from 'express';
import pkg from '@slack/bolt';
const { App , ExpressReceiver} = pkg;
import 'dotenv/config';

// Initialize your Express application

// Initialize your Slack app

const receiver = new ExpressReceiver({
        signingSecret: process.env.SLACK_SIGNING_SECRET,
    endpoints: '/slack/events', // Custom endpoint where your Slack events will be sent
});

// Initialize your Slack app with the custom receiver
const slackApp = new App({
    token: process.env.SLACK_BOT_TOKEN ,
    receiver // Using the custom receiver
});
// Define other routes for your Express server if necessary

// Now you can use receiver.router to define routes that your Express app should handle
// This replaces the app.use('/slack/events', ...) line
receiver.router.post('/slack/events', (req, res) => {
    // Your Slack event handling logic here
});

// Define other routes for your Express server if necessary

slackApp.command('/book', async ({ ack, body, client }) => {
    // Acknowledge the command request
    await ack();

    const rooms = [
        { label: 'Conference Room 1', value: 'room_1' },
        { label: 'Conference Room 2', value: 'room_2' },
        // Add more rooms as needed
    ];

    const options = rooms.map(room => ({
        text: {
            type: 'plain_text',
            text: room.label,
            emoji: true
        },
        value: room.value
    }));

    const modal = {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Book a Conference Room',
            emoji: true
        },
        submit: {
            type: 'plain_text',
            text: 'Book',
            emoji: true
        },
        close: {
            type: 'plain_text',
            text: 'Cancel',
            emoji: true
        },
        blocks: [
            {
                type: 'input',
                block_id: 'room_selection',
                element: {
                    type: 'static_select',
                    placeholder: {
                        type: 'plain_text',
                        text: 'Select a room',
                        emoji: true
                    },
                    options: options,
                    action_id: 'room_selected'
                },
                label: {
                    type: 'plain_text',
                    text: 'Room',
                    emoji: true
                }
            }
            // Add more blocks as needed
        ]
    };

    await client.views.open({
        trigger_id: body.trigger_id,
        view: modal
    });
});

slackApp.message('hello', async ({ message, say }) => {
    // Respond to the message
    await say(`Hey there <@${message.user}>!`);
});
// Listen to the port

const app = receiver.app;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port${port}`);
    console.log('⚡️ Slack bot is running!');
});
