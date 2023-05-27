import * as signalR from "@microsoft/signalr";
import { apiUrl } from "../config";

export const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${apiUrl}/notificationHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
    })
    .build();


export const connection_user = new signalR.HubConnectionBuilder()
    .withUrl(`${apiUrl}/notificationHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
    })
    .build();