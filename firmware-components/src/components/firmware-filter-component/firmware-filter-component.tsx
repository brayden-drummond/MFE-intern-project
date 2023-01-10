import {Component, h, State} from '@stencil/core';
// import EventBus from '../../eventbus/index.js'

@Component({
  tag: 'firmware-filter-component',
  styleUrl: 'firmware-filter-component.css',
  shadow: false,
})
export class FirmwareFilterComponent {
  @State() token: string = '';
  @State() selectedDeviceTypeOptions: any[];
  @State() selectedDeviceStatusOptions: any[];
  @State() selectedDeviceType: string = 'EC520';
  @State() selectedDeviceStatus: string = 'Released';
  @State() selectedFilter: {type: string, status: string;} = {type: 'EC520', status: 'Released'};
  @State() eventBus = null;

  componentWillLoad() {
    if (window.EventBus) {
      this.eventBus = window.EventBus;
    } else {
      console.log('Please use an event bus')
    }

    this.eventBus.dispatchInitialFilterOptionsToListener(this.selectedFilter)

    if (!this.token) {
      this.eventBus.requestAuthenticationFromParent()
    }

    this.eventBus.listenForAuthenticationFromParent(async (event:MessageEvent) => {
      this.token = event.data.token
    }, [this.eventBus.Topics.MFE_FIRMWARE_CHILD_AUTH_REQUEST]);
  }

  componentWillUpdate() {
    if (this.token) {
      this.selectedDeviceTypeOptions = [
        { display: 'EC520' },
        { display: 'Test' },
      ]
      this.selectedDeviceStatusOptions = [
        { display: 'Released' },
        { display: 'New' },
        { display: 'Beta' },
      ]
    }
  }

  onSelectedDeviceType(event) {
    this.selectedDeviceType = event.target.value.display
  }

  onSelectedDeviceStatus(event) {
    this.selectedDeviceStatus = event.target.value.display
  }

  handleSubmit(event) {
    event.preventDefault()
    this.selectedFilter = {...this.selectedFilter, type: this.selectedDeviceType, status: this.selectedDeviceStatus}
    this.eventBus.dispatchUpdatedFilterOptionsToListener(this.selectedFilter)
  }

  componentDidLoad() {
    const deviceType = document.getElementById('device-type-options').shadowRoot.querySelector('div')
    deviceType.style.display = 'flex'
    deviceType.style.flexDirection = 'row'
    deviceType.style.alignItems  = 'center'
    deviceType.style.paddingRight = '6px'
    const deviceTypeSelectField = deviceType.querySelectorAll('div')[1]
    deviceTypeSelectField.style.width = '90px'

    const deviceStatus = document.getElementById('device-status-options').shadowRoot.querySelector('div')
    deviceStatus.style.display = 'flex'
    deviceStatus.style.flexDirection = 'row'
    deviceStatus.style.alignItems  = 'center'
    const deviceStatusSelectField = deviceStatus.querySelectorAll('div')[1]
    deviceStatusSelectField.style.width = '90px'
  }

  render() {
    return <div class='firmware-filter-container'>
      <div class='firmware-filter-select'>
        <modus-select
          id="device-type-options"
          label="Device Type"
          options-display-prop="display"
          options={this.selectedDeviceTypeOptions}
          onValueChange={(event) => this.onSelectedDeviceType(event)}
        >
        </modus-select>
        <modus-select
          id="device-status-options"
          label="Status"
          options-display-prop="display"
          options={this.selectedDeviceStatusOptions}
          onValueChange={(event) => this.onSelectedDeviceStatus(event)}
        >
        </modus-select>
      </div>
      <modus-button onClick={(event) => this.handleSubmit(event)}>Apply Filter</modus-button>
    </div>
  }
}
