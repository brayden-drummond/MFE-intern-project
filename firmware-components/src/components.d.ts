/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AddNewFirmwareComponent {
    }
    interface FirmwareFilterComponent {
    }
    interface FirmwareTableComponent {
    }
    interface MyComponent {
    }
}
declare global {
    interface HTMLAddNewFirmwareComponentElement extends Components.AddNewFirmwareComponent, HTMLStencilElement {
    }
    var HTMLAddNewFirmwareComponentElement: {
        prototype: HTMLAddNewFirmwareComponentElement;
        new (): HTMLAddNewFirmwareComponentElement;
    };
    interface HTMLFirmwareFilterComponentElement extends Components.FirmwareFilterComponent, HTMLStencilElement {
    }
    var HTMLFirmwareFilterComponentElement: {
        prototype: HTMLFirmwareFilterComponentElement;
        new (): HTMLFirmwareFilterComponentElement;
    };
    interface HTMLFirmwareTableComponentElement extends Components.FirmwareTableComponent, HTMLStencilElement {
    }
    var HTMLFirmwareTableComponentElement: {
        prototype: HTMLFirmwareTableComponentElement;
        new (): HTMLFirmwareTableComponentElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "add-new-firmware-component": HTMLAddNewFirmwareComponentElement;
        "firmware-filter-component": HTMLFirmwareFilterComponentElement;
        "firmware-table-component": HTMLFirmwareTableComponentElement;
        "my-component": HTMLMyComponentElement;
    }
}
declare namespace LocalJSX {
    interface AddNewFirmwareComponent {
    }
    interface FirmwareFilterComponent {
    }
    interface FirmwareTableComponent {
    }
    interface MyComponent {
    }
    interface IntrinsicElements {
        "add-new-firmware-component": AddNewFirmwareComponent;
        "firmware-filter-component": FirmwareFilterComponent;
        "firmware-table-component": FirmwareTableComponent;
        "my-component": MyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "add-new-firmware-component": LocalJSX.AddNewFirmwareComponent & JSXBase.HTMLAttributes<HTMLAddNewFirmwareComponentElement>;
            "firmware-filter-component": LocalJSX.FirmwareFilterComponent & JSXBase.HTMLAttributes<HTMLFirmwareFilterComponentElement>;
            "firmware-table-component": LocalJSX.FirmwareTableComponent & JSXBase.HTMLAttributes<HTMLFirmwareTableComponentElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
        }
    }
}
