import {processUpdate} from "./Index";

export const registerWebSocketHandlers = (url: string) => {

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
            if (message.data == "Ping") {
                websocket.send("Pong");
            } else {
                const json = JSON.parse(message.data);
                processUpdate(json);
            }
        }
    };
};
