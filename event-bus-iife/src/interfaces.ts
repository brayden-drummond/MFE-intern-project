import { Topics } from "./topics";

export interface Topic {
    topic: Topics
}

export interface AuthenticateEventData {
    token: string
}

export interface AuthenticateChildEventData {
    token: string
}

export interface FilterOptionsEventData {
    selectedFilter: any
}

export interface NewFirmwareEventData {
    newFirmware: any
}

export type AuthenticateTopic = Topic & AuthenticateEventData;
export type AuthenticateChildTopic = Topic & AuthenticateChildEventData;
export type FilterOptionsTopic = Topic & FilterOptionsEventData;
export type NewFirmwareTopic = Topic & NewFirmwareEventData