import { newSpecPage } from '@stencil/core/testing';
import {AddNewFirmwareComponent} from "./add-new-firmware-component";

describe('AddNewFirmwareComponent', () => {
  let component
  it('builds', () => {
    expect(new AddNewFirmwareComponent()).toBeTruthy()
  })

  it('should render my component', async () => {
    component = await newSpecPage({
      components: [AddNewFirmwareComponent],
      html: `<add-new-firmware-component></add-new-firmware-component>`,
      flushQueue: false
    })
    expect(component.root).toEqualHtml(
      '<add-new-firmware-component></add-new-firmware-component>')
  })
})
