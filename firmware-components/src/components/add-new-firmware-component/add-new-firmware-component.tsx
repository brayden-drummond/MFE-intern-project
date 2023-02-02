import {Component, h, State, Watch} from '@stencil/core';
import {
  Topics,
  requestAuthenticationFromParent,
  listenForAuthenticationFromParent, dispatchNewFirmwareToListener
} from "mfe-eventbus"

@Component({
  tag: 'add-new-firmware-component',
  styleUrl: 'add-new-firmware-component.css',
})

export class AddNewFirmwareComponent {

  @State() token: string = ''
  @State() firmwareVersion: string;
  @State() deviceType: string;
  @State() status: string;
  @State() description: string;
  @State() vendorMetadata: string;
  @State() firmwareFile: string;
  //make newFirmware an interface?
  @State() newFirmware: {createdDate: string, firmwareVersion: string, deviceType: string, status: string, description: string, vendorMetadata: string, firmwareFile: string}
  deviceTypeOptions = [
    { display: 'EC520' },
    { display: 'Test' }
  ]

  statusOptions = [
    { display: 'New'}
  ]

  @Watch('token')
  async componentWillLoad() {

    if (!this.token) {
      requestAuthenticationFromParent()
    }

    listenForAuthenticationFromParent(async (event:MessageEvent) => {
      this.token = event.data.token
    }, [Topics.MFE_FIRMWARE_CHILD_AUTH_REQUEST]);
  }

  componentDidRender() {
    if (this.token) {
      document.querySelector('#firmware-modal-btn').addEventListener('buttonClick', () => {
        document.querySelector('modus-modal').open();
      })
    }
  }

  handleFirmwareVersion(event: any) {
    this.firmwareVersion = event.target.value
  }

  handleDeviceType(event: any) {
    this.deviceType = event.target.value.display
  }

  handleStatus(event: any) {
    this.status = event.target.value.display
  }

  handleDescription(event: any) {
    this.description = event.target.value
  }

  handleVendorMetadata(event: any) {
    this.vendorMetadata = event.target.value
  }

  handleFirmwareFile(event: any) {
    this.firmwareFile = event.target.value
  }

  handleSubmit(event) {
    event.preventDefault()
    this.newFirmware = {...this.newFirmware,
      createdDate: new Date().toJSON(),
      firmwareVersion: this.firmwareVersion,
      deviceType: this.deviceType,
      status: this.status,
      description: this.description,
      vendorMetadata: this.vendorMetadata,
      firmwareFile: this.firmwareFile}
    dispatchNewFirmwareToListener(this.newFirmware)
    this.postFirmwareToDatabase(this.newFirmware)
    document.querySelector('modus-modal').close()
  }

  async postFirmwareToDatabase(newFirmware) {
    await fetch('http://localhost:2500/api/v1/firmware', {
      method: 'POST',
      body: JSON.stringify(newFirmware),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'application/json',
      },
    });
  }

   render() {
    return <div>
      <modus-button id="firmware-modal-btn">Add</modus-button>
      <modus-modal
        id="my-modal"
        header-text="Upload Firmware"
        primary-button-text="Submit"
        onPrimaryButtonClick={(event) => this.handleSubmit(event)}>
        <form class="upload-firmware-form-container">
          <label>Firmware Version
            <modus-text-input type="text" value={this.firmwareVersion} onInput={(event: Event) => this.handleFirmwareVersion(event)}/>
          </label>
          <label>DeviceType
            <modus-select
              options-display-prop="display"
              options={this.deviceTypeOptions}
              required={true}
              onValueChange={(event) => this.handleDeviceType(event)}
            >
            </modus-select>
          </label>
          <label>Status
            <modus-select
              options-display-prop="display"
              options={this.statusOptions}
              required={true}
              onValueChange={(event) => this.handleStatus(event)}
            >
            </modus-select>
          </label>
          <label>Description
            <modus-text-input type="text" value={this.description} onInput={(event: Event) => this.handleDescription(event)}/>
          </label>
          <label>Vendor Metadata
            <modus-text-input type="text" value={this.vendorMetadata} onInput={(event: Event) => this.handleVendorMetadata(event)}/>
          </label>
          <label>Firmware File
            <input type="file" required={true}/>
            <modus-text-input type="text" value={this.firmwareFile} onInput={(event: Event) => this.handleFirmwareFile(event)}/>
          </label>
        </form>
      </modus-modal>
    </div>
  }
}
