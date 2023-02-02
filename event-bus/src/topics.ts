
export enum Topics {
        AUTHENTICATE = 'MFE_FIRMWARE_AUTH',
        MFE_FIRMWARE_TABLE_AUTH_REQUEST = 'MFE_FIRMWARE_TABLE_AUTH_REQUEST',
        MFE_FIRMWARE_REQUEST_AUTH_FROM_HOST = 'MFE_FIRMWARE_REQUEST_AUTH_FROM_HOST',

        //This is for dispatching authentication from parent to child components
        AUTHENTICATE_CHILD = 'AUTHENTICATE_CHILD',
        MFE_FIRMWARE_CHILD_AUTH_REQUEST = 'MFE_FIRMWARE_CHILD_AUTH_REQUEST',
        MFE_FIRMWARE_REQUEST_AUTH_FROM_PARENT = 'MFE_FIRMWARE_REQUEST_AUTH_FROM_PARENT',

        //This is for the firmware filter component
        FILTER_OPTIONS = 'FILTER_OPTIONS',
        MFE_FIRMWARE_REQUEST_DEFAULT_FILTER_OPTIONS = 'MFE_FIRMWARE_REQUEST_DEFAULT_FILTER_OPTIONS',
        MFE_FIRMWARE_TABLE_FILTER_REQUEST = 'MFE_FIRMWARE_TABLE_FILTER_REQUEST',

        //This is for the upload new firmware component
        MFE_NEW_FIRMWARE_REQUEST = 'MFE_NEW_FIRMWARE_REQUEST',
        NEW_FIRMWARE = 'NEW_FIRMWARE'
    }

    export default Topics;