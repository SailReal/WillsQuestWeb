import {processUpdate} from "./Index";

export const registerWebSocketHandlers = (url: string) => {

    // FIXME #10 websockets have a timeout, we need to send a ping-pong-msg from time to time
    const websocket = new WebSocket(url);

    websocket.onopen = (event: Event): void => {
        console.log("Connected to Websocket");
    };

    websocket.onclose = (): void => {
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = (error: ErrorEvent): void => {
        console.log('Error in Websocket Occured: ' + error);
    };

    websocket.onmessage = (message: MessageEvent): void => {
        if (typeof message.data === "string") {
            const json = JSON.parse(message.data);
            processUpdate(json);
        }
    };
};
