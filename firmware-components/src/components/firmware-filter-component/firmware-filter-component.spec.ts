import { newSpecPage } from '@stencil/core/testing';
import {FirmwareFilterComponent} from "./firmware-filter-component";

describe('FirmWareFilterComponent', () => {
  let component

  it('builds', () => {
    expect(new FirmwareFilterComponent()).toBeTruthy()
  })
  it('should render my component', async () => {
    component = await newSpecPage({
      components: [FirmwareFilterComponent],
      html: `<firmware-filter-component></firmware-filter-component>`,
      flushQueue: false
    })
    expect(component.root).toEqualHtml(
      '<firmware-filter-component></firmware-filter-component>')
  })
})
