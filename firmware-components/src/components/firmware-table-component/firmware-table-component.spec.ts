import { newSpecPage } from '@stencil/core/testing';
import {FirmwareTableComponent} from "./firmware-table-component";

describe('FirmWareTableComponent', () => {
  let component;

  beforeEach( async () => {
    component = await newSpecPage({
      components: [FirmwareTableComponent],
      html: `<firmware-table-component></firmware-table-component>`,
      flushQueue: false
    })
    await component.waitForChanges();
  })

  it('builds', () => {
    expect(new FirmwareTableComponent()).toBeTruthy()
  })
  it('should render my component', async () => {
    component = await newSpecPage({
      components: [FirmwareTableComponent],
      html: `<firmware-table-component></firmware-table-component>`,
      flushQueue: false
    })
    expect(component.root).toEqualHtml(
      '<firmware-table-component><mock:shadow-root></mock:shadow-root></firmware-table-component>')
  })
  it('should fetch data on token change', async () => {
    component = await newSpecPage({
      components: [FirmwareTableComponent],
      // template: () => `(<firmware-table-component></firmware-table-component>)`,
      html: `<firmware-table-component></firmware-table-component>`,
      flushQueue: false
    })
    await component.waitForChanges();
    Object.defineProperty(window, 'EventBus.requestAuthenticationFromHost', { value: () => Promise.resolve() });

    jest.spyOn(component.eventBus, 'authenticationListener()').mockReturnValue( { data: { token: "MyToken" }} as MessageEvent)
    jest.spyOn(component.eventBus, 'filteredOptionsListener()').mockReturnValue( { data: { selectedFilter: "MySelectedFilter" }} as MessageEvent)

    await component.waitForChanges();
    const spy = jest.spyOn(global, "fetch").mockResolvedValue(Promise.resolve( {ok: false} as Response));
    // console.log(component.root)
    component.root.token = ''
    expect(component.root.token).toEqual('');
    component.root.token = 'newToken'
    expect(spy).toHaveBeenCalled();
    expect(component.root.token).toEqual("newToken");
  })
})
