import { newSpecPage } from '@stencil/core/testing';
import { FirmwareTableComponent, FirmwareResponse } from "./firmware-table-component";
import {dispatchAuthenticationTokenToChild} from "mfe-eventbus";

describe('FirmWareTableComponent', () => {
  let compInstance: FirmwareTableComponent;
  let page;

  beforeEach(async () => {
    compInstance = new FirmwareTableComponent()
  });

  it('builds', () => {
    expect(new FirmwareTableComponent()).toBeTruthy();
  });

  it('should render my component', async () => {
    page = await newSpecPage({
      components: [FirmwareTableComponent],
      html: `<firmware-table-component></firmware-table-component>`,
      flushQueue: false
    })
    expect(page.root).toEqualHtml(
      ' <firmware-table-component><mock:shadow-root></mock:shadow-root></firmware-table-component>\n')
  });

  it('should fetch data on token change', async () => {
    compInstance.setAttributes = jest.fn()
    compInstance.setAuthentication = jest.fn()
    compInstance.selectedFilter = {type: 'test', status: 'test'}
    compInstance.token = 'newToken'

    const fakeData: FirmwareResponse = {createdDate: 'string',
      firmwareId: 'string',
      status: 'string',
      firmwareFileId: 'string',
      isUploadComplete: 'string',
      firmwareVersion: 'string',
      deviceType: 'string',
      type: 'string',
      description: 'string'
    };

    const spy = jest.spyOn(global, "fetch").mockResolvedValue(Promise.resolve( {ok: true, json: () => Promise.resolve([{
        value: fakeData
      }])} as Response));

    Object.defineProperty(window, 'postMessage', {
      value: jest.fn()
    });

    const EventBus = {dispatchAuthenticationTokenToChild}
    jest.spyOn(EventBus, 'dispatchAuthenticationTokenToChild').mockImplementation(jest.fn());

    await compInstance.componentWillLoad();

    expect(compInstance.token).toEqual('newToken');
    expect(compInstance.selectedFilter).toEqual({type: 'test', status: 'test'});
    expect(spy).toHaveBeenCalled();
  })
})


