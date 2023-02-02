# Micro-frontends Internship Project

## Aim

This is a starter project for an investigation into micro-frontends.

The aim of this project is to focus on the advantages and disadvantages of applying micro-frontend architecture to CCS' current application. Specifically, investigating whether or not a micro-frontend architecture is a feasible design patter for CCS to implement.

This project will see the development of the FirmWare Manager UI through Web Components and consumed in a JavaScript Framework.
## Application Host
WorksOS and WorksManager have been developed in Angular and React respectively. This project will therefore be hosted in one/ or both of these frameworks which will consume and render the micro-frontends within it.

## Web Components and Stencil
The Firmware Manager UI will be created through web components in Stencil. Web components allow us to create fast and reusable elements which can be consumed in any web application. Stencil is a compiler which allows us to do this.

Importantly, Stencil components are just Web Components, so they work in any major framework or with no framework at all.


## Using the component

Stencil advises three strategies for consuming their web components. These being:
- Script tags.
- Node modules.
- A stencil starter app.

See docs here for more information on getting started: https://github.com/ionic-team/stencil-component-starter/blob/main/readme.md

## Hosting on Azure
CDN

## EventBus
You will need to remember to update the mfe-eventbus npm package to the relevant version when running the pipeline.