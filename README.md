# Project Setup & Usage

## Technologies used

### `node.js`, no frameworks

### `zod` for schema validation

## How to Install

```
npm install
npm run dev
```

## How to Test

The server will be available at:

```
http://localhost:3000/execute
```

- **Request method**: `POST`
- **Payload example**:

```json
{
  "type": "CONDITION",
  "payload": "new Date().getTime() < 23",
  "trueAction": {
    "type": "SMS",
    "payload": {
      "phone": "+37487876876876"
    },
    "nextAction": {
      "type": "EMAIL",
      "payload": {
        "sender": "sender@example.com",
        "receiver": "receiver@example.com"
      }
    }
  },
  "falseAction": {
    "type": "LOOP",
    "payload": {
      "iterationCount": 10
    },
    "nextAction": {
      "type": "CONDITION",
      "payload": "7 < 8",
      "trueAction": {
        "type": "EMAIL",
        "payload": {
          "sender": "sender@example.com",
          "receiver": "receiver@example.com"
        }
      }
    }
  }
}
```

You can test this using **Postman**:

1. Set the request body to **raw**.
2. Select **JSON** type.
3. Paste the payload above.

## Notes

- The requirements mention that we need the ability to run a sequence like: **SMS → EMAIL → SMS**.
- To achieve this, I added the `nextAction` property to both **EMAIL** and **SMS** types, allowing actions to chain.
- Alternatively, we can implement:
    - **Sequence action**: Executes an array of actions sequentially.
    - **Parallel action**: Executes multiple actions in parallel.

## Final Thoughts

Thank you very much for this assignment. I really enjoyed working on it!  
Looking forward to your feedback.
