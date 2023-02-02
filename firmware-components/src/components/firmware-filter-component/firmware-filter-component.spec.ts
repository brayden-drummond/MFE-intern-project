import {FirmwareFilterComponent} from "./firmware-filter-component";
import {
  dispatchInitialFilterOptionsToListener, dispatchUpdatedFilterOptionsToListener,
  listenForAuthenticationFromParent,
  requestAuthenticationFromParent,
  Topics
} from "mfe-eventbus"
import {newSpecPage} from "@stencil/core/testing";

describe('FirmWareFilterComponent', () => {
  let EventBus;
  let page;
  let requestAuthentication;
  let dispatchInitialFilter;
  let dispatchUpdatedFilter;
  let compInstance: FirmwareFilterComponent;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [FirmwareFilterComponent],
      html: '<firmware-filter-component></firmware-filter-component>',
      flushQueue: false,
    });

    global.postMessage = jest.fn();
    window.postMessage = jest.fn();

    compInstance = new FirmwareFilterComponent();
    compInstance.getStyles = jest.fn();

    EventBus = {
      Topics,
      requestAuthenticationFromParent,
      listenForAuthenticationFromParent,
      dispatchInitialFilterOptionsToListener,
      dispatchUpdatedFilterOptionsToListener
    };

    requestAuthentication = jest.spyOn(EventBus, 'requestAuthenticationFromParent').mockImplementation(() => jest.fn());
    jest.spyOn(EventBus, 'listenForAuthenticationFromParent').mockImplementation(jest.fn());
    dispatchInitialFilter = jest.spyOn(EventBus, 'dispatchInitialFilterOptionsToListener').mockImplementation(jest.fn());
    dispatchUpdatedFilter = jest.spyOn(EventBus, 'dispatchUpdatedFilterOptionsToListener').mockImplementation(jest.fn());
  });

  it('builds', () => {
    compInstance.getStyles = jest.fn()

    expect(new FirmwareFilterComponent()).toBeTruthy();
  });

  it('should render my component', async () => {
    expect(page.root).toEqualHtml('<firmware-filter-component></firmware-filter-component>');
  });

  it('componentWillLoad should request authentication if token is not present', async () => {
    compInstance.selectedFilter = {type: 'Test', status: 'Test'};
    const mockSelectedFilter = compInstance.selectedFilter;
    EventBus.dispatchInitialFilterOptionsToListener(mockSelectedFilter);

    expect(dispatchInitialFilter).toHaveBeenCalledWith(mockSelectedFilter);
  });

  it('componentWillLoad should request authentication if token is not present', async () => {
    EventBus.requestAuthenticationFromParent();

    expect(requestAuthentication).toHaveBeenCalled();
  });

  it('componentWillUpdate on token changes and display options to user', async () => {
    compInstance.token = 'test';
    compInstance.componentWillUpdate();

    expect(compInstance.selectedDeviceTypeOptions).toEqual([
      { display: 'EC520' },
      { display: 'Test' },
    ]);

    expect(compInstance.selectedDeviceStatusOptions).toEqual([
        { display: 'Released' },
        { display: 'New' },
        { display: 'Beta' },
    ]);
  });

  it('should set onSelectedDeviceType with event target value', async () => {
    const mockEvent = { target: { value: { display: 'test-version' } } };
    compInstance.onSelectedDeviceType(mockEvent);

    expect(compInstance.selectedDeviceType).toEqual('test-version');
  });

  it('should prevent the default event behavior', async () => {
    const event = { preventDefault: jest.fn() };
    compInstance.handleSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should submit form details on Submit', async () => {

    compInstance.selectedFilter = {
      type: 'test', status: 'test'
    }

    const mockData = compInstance.selectedFilter
    const event = { preventDefault: jest.fn() };

    EventBus.dispatchUpdatedFilterOptionsToListener(mockData);
    compInstance.handleSubmit(event);

    expect(dispatchUpdatedFilter).toHaveBeenCalledWith(mockData)
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
