import express from 'express';
const app = express();

app.get('/menu', (req, res) => {
    return res.status(200).json({
            "options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "*this is plain_text text*"
                    },
                    "value": "value-0"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "*this is plain_text text*"
                    },
                    "value": "value-1"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "*this is plain_text text*"
                    },
                    "value": "value-2"
                }
            ]
        }
    );
});

app.listen(3000, () => {
        console.log('Server is running on port 3000');
    }
);
