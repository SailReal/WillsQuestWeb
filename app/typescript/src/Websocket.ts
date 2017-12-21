export const registerWebSocketHandlers = (url: string) => {

    const websocket = new WebSocket(url);

    websocket.onopen = (event: Event): void => {
        console.log("Connected to Websocket");
        websocket.send("test");
    }

    websocket.onclose = (): void => {
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = (error: ErrorEvent): void => {
        console.log('Error in Websocket Occured: ' + error);
    };

    websocket.onmessage = (message: MessageEvent): void => {
        if (typeof message.data === "string") {
            //const json = JSON.parse(message.data); // FIXME get app state as json from controller and send to client
            console.log(message.data);
        }
    };
}