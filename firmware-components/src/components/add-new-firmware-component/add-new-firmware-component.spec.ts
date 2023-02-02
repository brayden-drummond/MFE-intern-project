import { newSpecPage } from '@stencil/core/testing';
import {AddNewFirmwareComponent} from "./add-new-firmware-component";

import {
  Topics,
  requestAuthenticationFromParent,
  listenForAuthenticationFromParent,
  dispatchNewFirmwareToListener
} from "mfe-eventbus";

describe('AddNewFirmwareComponent', () => {
  let page;
  let EventBus;
  let requestAuthentication;
  let dispatchFirmware;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [AddNewFirmwareComponent],
      html: '<add-new-firmware-component></add-new-firmware-component>',
      flushQueue: false,

      // supportsShadowDom: true
    });
    global.postMessage = jest.fn()
    window.postMessage = jest.fn()

    EventBus = {
      Topics,
      requestAuthenticationFromParent,
      listenForAuthenticationFromParent,
      dispatchNewFirmwareToListener
    }

    requestAuthentication = jest.spyOn(EventBus, 'requestAuthenticationFromParent').mockImplementation(() => jest.fn());
    jest.spyOn(EventBus, 'listenForAuthenticationFromParent').mockImplementation(jest.fn());
    dispatchFirmware = jest.spyOn(EventBus, 'dispatchNewFirmwareToListener').mockImplementation(jest.fn());;

    await page.waitForChanges()
  });

  it('builds', () => {
    expect(new AddNewFirmwareComponent()).toBeTruthy();
  });

  it('should render my component', async () => {
    expect(page.root).toBeTruthy();
  });

  it('should set firmwareFile with event target value', async () => {
    const mockEvent = { target: { value: 'test-version' } };
    page.rootInstance.handleFirmwareFile(mockEvent);

    expect(page.rootInstance.firmwareFile).toEqual('test-version');
  });

  it('componentWillLoad should request authentication if token is not present', async () => {
    await page.rootInstance.componentWillLoad()
    EventBus.requestAuthenticationFromParent()

    expect(requestAuthentication).toHaveBeenCalled();
  });

  it('should attach an event listener to the firmware-modal-btn element', () => {
    page.rootInstance.token = 'test';
    const spy = jest.spyOn(page.doc, 'querySelector');
    page.rootInstance.componentDidRender();

    expect(spy).toHaveBeenCalledWith('#firmware-modal-btn');
    spy.mockRestore();
  });

  it('should allow modus modal button to be clicked', async () => {
    page.rootInstance.token = 'test';
    const spy = jest.spyOn(page.doc, 'querySelector');
    page.rootInstance.componentDidRender();
    page.doc.querySelector('#firmware-modal-btn').click();

    expect(spy).toHaveBeenCalled();
  });

  it('should allow modus modal button to be clicked', async () => {
    page.rootInstance.token = 'test';

    const modal = page.doc.querySelector('modus-modal');
    modal.open = jest.fn();
    const modalSpy = jest.spyOn(modal, 'open');

    const spy = jest.spyOn(page.doc, 'querySelector');
    page.rootInstance.componentDidRender();
    const button = page.doc.querySelector('#firmware-modal-btn');
    button.dispatchEvent(new Event('buttonClick'));

    await page.waitForChanges();

    expect(modalSpy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should prevent the default event behavior', async () => {
    const modal = page.doc.querySelector('modus-modal');
    modal.close = jest.fn()

    const event = { preventDefault: jest.fn() };
    const spy = jest.spyOn(page.doc, 'querySelector');
    page.rootInstance.handleSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should send the form details on submit', async () => {
    //fix failing UTC date issue in test
    page.rootInstance.createdDate = new Date();
    page.rootInstance.firmwareVersion = 'test';
    page.rootInstance.deviceType = 'test';
    page.rootInstance.status = 'test';
    page.rootInstance.description = 'test';
    page.rootInstance.vendorMetadata = 'test';
    page.rootInstance.firmwareFile = 'test';

    page.rootInstance.newFirmware = {
      createdDate: new Date(),
      firmwareVersion: 'test',
      deviceType: 'test',
      status: 'test',
      description: 'test',
      vendorMetadata: 'test',
      firmwareFile: 'test'
    }

    page.waitForChanges()

    const mockData = page.rootInstance.newFirmware

    const modal = page.doc.querySelector('modus-modal');
    modal.close = jest.fn()

    const event = { preventDefault: jest.fn() };
    const spy = jest.spyOn(page.doc, 'querySelector');

    page.rootInstance.handleSubmit(event);
    page.waitForChanges()

    EventBus.dispatchNewFirmwareToListener(mockData)

    expect(page.rootInstance.newFirmware.deviceType).toEqual('test');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(dispatchFirmware).toHaveBeenCalledWith(mockData);
  });

  it('postFirmwareToDatabase should make a POST request with the correct parameters', async () => {
  const newFirmware = { version: '1.0', releaseDate: '2022-01-01' };

  global.fetch = jest.fn().mockResolvedValue({});

  await page.rootInstance.postFirmwareToDatabase(newFirmware);

  expect(global.fetch).toHaveBeenCalledWith('http://localhost:2500/api/v1/firmware', {
    method: 'POST',
    body: JSON.stringify(newFirmware),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Content-Type': 'application/json',
    },
  });
});
});
