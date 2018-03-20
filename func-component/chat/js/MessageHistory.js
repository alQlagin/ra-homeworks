'use strict';
function MessageHistory({list}) {
    return <ul>{list.map(message => {
        switch (message.type) {
            case 'message': return <Message from={message.from} message={message}></Message>;
            case 'response': return <Response from={message.from} message={message}></Response>;
            case 'typing': return <Typing from={message.from} message={message}></Typing>;
        }
    })}</ul>
}