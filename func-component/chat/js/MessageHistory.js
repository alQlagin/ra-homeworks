'use strict';

function MessageHistory({list}) {
    return <ul>{list.map(message => {
        let MessageContainer;
        switch (message.type) {
            case 'message':
                MessageContainer = Message;
                break;
            case 'response':
                MessageContainer = Response;
                break;
            case 'typing':
                MessageContainer = Typing;
                break;
            default:
                return null;
        }

        return <MessageContainer key={message.id} from={message.from} message={message}/>;
    })}</ul>
}