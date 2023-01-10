import {Topic, AuthenticateTopic, FilterOptionsTopic, NewFirmwareTopic, AuthenticateChildTopic} from './interfaces'
import { Topics } from "./topics";

//lines 5 - 17 will be consumed in the React shell when this is built as a module
export const requestAuthenticationFromHost = () => {
    const message: Topic = {topic: Topics.MFE_FIRMWARE_REQUEST_AUTH_FROM_HOST};
    postMessage(message);
}

export const listenForAuthenticationRequest = () => {
    window.addEventListener("message", event => {
        if (event.data.topic === Topics.MFE_FIRMWARE_REQUEST_AUTH_FROM_HOST) {
            console.log('Event Bus is working!')
        }
    })
}

export const dispatchAuthenticationTokenToListener = (token: string) => {
    if (token) {
        window.postMessage({topic: Topics.MFE_FIRMWARE_TABLE_AUTH_REQUEST, token: token})
    }
}

export const authenticationListener = (callback: (event: MessageEvent<AuthenticateTopic>) => void, additionalTopics?: Topics[]) => {

    const topics: Topics[] = additionalTopics ? [Topics.AUTHENTICATE, ...additionalTopics] : [Topics.AUTHENTICATE];

    window.addEventListener("message", (event: MessageEvent<AuthenticateTopic>) => {
        if (!!topics.find(t => t === event.data.topic)) {
            callback(event)
        }
    })
}

//dispatch authentication to child and listen for authentication from parent
export const requestAuthenticationFromParent = () => {
    const message: Topic = {topic: Topics.MFE_FIRMWARE_REQUEST_AUTH_FROM_PARENT};
    postMessage(message);
}

export const dispatchAuthenticationTokenToChild = (token: string) => {
    if (token) {
        window.postMessage({topic: Topics.MFE_FIRMWARE_CHILD_AUTH_REQUEST, token: token})
    }
}

export const listenForAuthenticationFromParent = (callback: (event: MessageEvent<AuthenticateChildTopic>) => void, additionalTopics?: Topics[]) => {

    const topics: Topics[] = additionalTopics ? [Topics.AUTHENTICATE_CHILD, ...additionalTopics] : [Topics.AUTHENTICATE_CHILD];

    window.addEventListener("message", (event: MessageEvent<AuthenticateChildTopic>) => {
        if (!!topics.find(t => t === event.data.topic)) {
            callback(event)
        }
    })
}

//This is for dispatching events from the firmware filter component to the firmware table component
export const requestDefaultFilterOptions = () => {
    const message: Topic = {topic: Topics.MFE_FIRMWARE_REQUEST_DEFAULT_FILTER_OPTIONS};
    postMessage(message);
}

export const dispatchInitialFilterOptionsToListener = (selectedFilter: {type: string, status: string;}) => {
    window.addEventListener("message", event => {
        if (event.data.topic === Topics.MFE_FIRMWARE_REQUEST_DEFAULT_FILTER_OPTIONS && selectedFilter) {
            window.postMessage({topic: Topics.MFE_FIRMWARE_TABLE_FILTER_REQUEST, selectedFilter: selectedFilter})
        }
    })
}

export const dispatchUpdatedFilterOptionsToListener = (selectedFilter: {type: string, status: string}) => {
    if (selectedFilter) {
        window.postMessage({topic: Topics.MFE_FIRMWARE_TABLE_FILTER_REQUEST, selectedFilter: selectedFilter})
    }
}

export const filterOptionsListener = (callback: (event: MessageEvent<FilterOptionsTopic>) => void, additionalTopics?: Topics[]) => {

    const topics: Topics[] = additionalTopics ? [Topics.FILTER_OPTIONS, ...additionalTopics] : [Topics.FILTER_OPTIONS];

    window.addEventListener("message", (event: MessageEvent<FilterOptionsTopic>) => {
        if (!!topics.find(t => t === event.data.topic)) {
            callback(event)
        }
    })
}

//This is for dispatching events from the upload new firmware component to the firmware table component
export const dispatchNewFirmwareToListener = (newFirmware: {firmwareVersion: string, deviceType: string, status: string, description: string, vendorMetadata: string, firmwareFile: string}) => {
    if (newFirmware) {
        window.postMessage({topic: Topics.MFE_NEW_FIRMWARE_REQUEST, newFirmware: newFirmware})
    }
}

export const newFirmwareListener = (callback: (event: MessageEvent<NewFirmwareTopic>) => void, additionalTopics?: Topics[]) => {

    const topics: Topics[] = additionalTopics ? [Topics.NEW_FIRMWARE, ...additionalTopics] : [Topics.NEW_FIRMWARE];

    window.addEventListener("message", (event: MessageEvent<NewFirmwareTopic>) => {
        if (!!topics.find(t => t === event.data.topic)) {
            callback(event)
        }
    })
}