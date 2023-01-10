import {Component, h, State, Watch} from '@stencil/core';
import {ModusDataTableDisplayOptions} from "@trimble-oss/modus-web-components";
interface FirmwareResponse {
  createdDate: string,
  firmwareId: string,
  status: string,
  firmwareFileId: string,
  isUploadComplete: string,
  firmwareVersion: string,
  deviceType: string,
  type: string,
  description: string,
}

@Component({
  tag: 'firmware-table-component',
  styleUrl: 'firmware-table-component.css',
  shadow: true,
})

export class FirmwareTableComponent {
  columnData: string[] = [
    'Firmware Version',
    'Device Type',
    'Status',
    'Created Date'
  ]

  rowData: any[]

  //Get Bearer token from WorksOS
  @State() token: string = ''
  @State() tableData: FirmwareResponse[] = [];
  @State() errorMessage: string;
  @State() selectedFilter: {type: string, status: string}
  @State() tableDisplay: ModusDataTableDisplayOptions = {borderless: false, cellBorderless: true, rowStripe: true}
  @State() newFirmware: {createdDate: string, firmwareVersion: string, deviceType: string, status: string, description: string, vendorMetadata: string, firmwareFile: string}
  @State() eventBus = null;

  @Watch('selectedFilter')
  @Watch('token')
  async componentWillLoad() {
    if (window.EventBus) {
      this.eventBus = window.EventBus;
    } else {
      console.log("No EventBus defined!")
    }

    if (!this.token) {
      this.eventBus.requestAuthenticationFromHost()
    }

    if (!this.selectedFilter) {
      this.eventBus.requestDefaultFilterOptions()
    }

    this.eventBus.authenticationListener(async (event: MessageEvent) => {
      this.token = event.data.token
    }, [this.eventBus.Topics.MFE_FIRMWARE_TABLE_AUTH_REQUEST]);

    this.eventBus.filterOptionsListener(async (event: MessageEvent) => {
      this.selectedFilter = event.data.selectedFilter
    }, [this.eventBus.Topics.MFE_FIRMWARE_TABLE_FILTER_REQUEST])

    this.eventBus.newFirmwareListener(async (event: MessageEvent) => {
      this.newFirmware = event.data.newFirmware
    }, [this.eventBus.Topics.MFE_NEW_FIRMWARE_REQUEST])

    if (this.token && this.selectedFilter) {
      const response = await fetch(`https://cloud.stage.api.trimblecloud.com/WorksOS/firmware/1.0/firmware?deviceType=${this.selectedFilter.type}&status=${this.selectedFilter.status}`, {headers: {'Authorization': this.token}})
      if (!response.ok) {
        this.errorMessage = "Please enter a valid auth token"
      } else {
        const data = await response.json()
        this.tableData = [...data as FirmwareResponse[]]
        this.errorMessage = ''
        this.eventBus.dispatchAuthenticationTokenToChild(this.token)
      }
    }
  }

  componentWillRender() {
      this.rowData = this.tableData.map((element: FirmwareResponse) => {
        return [element.firmwareVersion, element.deviceType, element.status, element.createdDate]
      });
      if (this.newFirmware) {
        this.addNewFirmwareToTable()
    }
  }

  addNewFirmwareToTable() {
      this.rowData = [...this.rowData, [this.newFirmware.firmwareVersion,
        this.newFirmware.deviceType,
        this.newFirmware.status,
        this.newFirmware.createdDate]
      ]
  }

  render() {
    return (
      <div>
        {this.errorMessage ? <p class="error-message">{this.errorMessage}</p> : ''}
        <modus-data-table id='test' columns={this.columnData} data={this.rowData} displayOptions={this.tableDisplay}/>
      </div>
    );
  }
}
