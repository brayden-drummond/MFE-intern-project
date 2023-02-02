import {Component, h,} from '@stencil/core';
import {Topics, requestAuthenticationFromHost} from "mfe-eventbus/index"

@Component({
  tag: 'test-component',
  styleUrl: 'test-component.css',
  shadow: false,
})

export class TestComponent {

  componentWillLoad() {
    console.log(Topics.MFE_FIRMWARE_CHILD_AUTH_REQUEST)
    console.log(requestAuthenticationFromHost)
  }

  componentDidLoad() {
  }

  render() {

    return <div class="test-container">
      <p>Hi</p>

    </div>
  }
}
