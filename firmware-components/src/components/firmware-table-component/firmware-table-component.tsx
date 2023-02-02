import {Component, h, State, Watch} from '@stencil/core';
import {ModusDataTableDisplayOptions} from "@trimble-oss/modus-web-components";
import {
  Topics,
  requestAuthenticationFromHost,
  requestDefaultFilterOptions,
  authenticationListener,
  filterOptionsListener,
  newFirmwareListener,
  dispatchAuthenticationTokenToChild
} from "mfe-eventbus"

export interface FirmwareResponse {
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

  setAttributes() {
    if (!this.token) {
      requestAuthenticationFromHost()
    }

    if (!this.selectedFilter) {
      requestDefaultFilterOptions()
    }
  }

  setAuthentication() {
    authenticationListener(async (event: MessageEvent) => {
      this.token = event.data.token
    }, [Topics.MFE_FIRMWARE_TABLE_AUTH_REQUEST]);

    filterOptionsListener(async (event: MessageEvent) => {
      this.selectedFilter = event.data.selectedFilter
    }, [Topics.MFE_FIRMWARE_TABLE_FILTER_REQUEST])

    newFirmwareListener(async (event: MessageEvent) => {
      this.newFirmware = event.data.newFirmware
    }, [Topics.MFE_NEW_FIRMWARE_REQUEST])

  }
  @Watch('selectedFilter')
  @Watch('token')
  async componentWillLoad() {
    this.setAttributes();
    this.setAuthentication();

    if (this.token && this.selectedFilter) {
      const response = await fetch(`https://cloud.stage.api.trimblecloud.com/WorksOS/firmware/1.0/firmware?deviceType=${this.selectedFilter.type}&status=${this.selectedFilter.status}`, {headers: {'Authorization': this.token}})
      if (!response.ok) {
        this.errorMessage = "Please enter a valid auth token"
      } else {
        const data = await response.json()
        this.tableData = [...data as FirmwareResponse[]]
        this.errorMessage = ''
        dispatchAuthenticationTokenToChild(this.token)
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
