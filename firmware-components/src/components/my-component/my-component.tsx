import {Component, h} from '@stencil/core';
// import {
//   dispatchInitialFilterOptionsToListener,
//   dispatchUpdatedFilterOptionsToListener
// } from "../../../../event-bus/index";

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  // @State() selectedDeviceType: string = 'EC520'
  // @State() selectedDeviceStatus: string = 'Released'
  // @State() selectedFilter: {type: string, status: string;} = {type: 'EC520', status: 'Released'}
  //
  componentWillLoad() {
  }
  //
  // onSelectedDeviceType(event) {
  //   this.selectedDeviceType = event.target.value
  //   console.log(this.selectedDeviceType)
  // }
  //
  // onSelectedDeviceStatus(event) {
  //   this.selectedDeviceStatus = event.target.value
  //   console.log(this.selectedDeviceStatus)
  // }
  //
  // handleSubmit(event) {
  //   event.preventDefault()
  //   this.selectedFilter = {...this.selectedFilter, type: this.selectedDeviceType, status: this.selectedDeviceStatus}
  //   console.log(this.selectedFilter)
  //   dispatchUpdatedFilterOptionsToListener(this.selectedFilter)
  // }

  render() {
    return <div>
      {/*<modus-select label="Test" options={['hello']} value={this.options}></modus-select>*/}
      {/*<form>*/}
      {/*  <label>Device Type: </label>*/}
      {/*  <select onInput={(event) => this.onSelectedDeviceType(event)}>*/}
      {/*    <option value="EC520">EC520</option>*/}
      {/*    <option value="Test">Test</option>*/}
      {/*  </select>*/}
      {/*  <label>Status: </label>*/}
      {/*  <select onInput={(event) => this.onSelectedDeviceStatus(event)}>*/}
      {/*    <option value="Released">Released</option>*/}
      {/*    <option value="New">New</option>*/}
      {/*    <option value="Beta">Beta</option>*/}
      {/*  </select>*/}
      {/*  <modus-button onClick={(event) => this.handleSubmit(event)}>Apply Filter</modus-button>*/}
      {/*</form>*/}
      {/*/!*selectedFilter={this.selectedFilter}*!/*/}
      {/*<firmware-table-component></firmware-table-component>*/}
      {/*/!*<modus-dropdown toggle-element-id="toggleElement">*!/*/}
      {/*/!*  <modus-button id="toggleElement" slot="dropdownToggle">Dropdown</modus-button>*!/*/}
      {/*/!*  <modus-list slot="dropdownList">*!/*/}
      {/*/!*    <modus-list-item size="condensed">Item 1</modus-list-item>*!/*/}
      {/*/!*    <modus-list-item size="condensed">Item 2</modus-list-item>*!/*/}
      {/*/!*    <modus-list-item size="condensed">Item 3</modus-list-item>*!/*/}
      {/*/!*  </modus-list>*!/*/}
      {/*/!*</modus-dropdown>*!/*/}
      <p>Hi</p>
    </div>
  }
}
