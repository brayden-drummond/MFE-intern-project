// import {Component, h,} from '@stencil/core';
//
// import EventBus from '../../eventbus/index.js'
//
// const script = () => {
//   const script = document.createElement('script')
//   script.src = 'https://afd-cmhts7g4u3p5y-a4c0bnhteze5bda5.z01.azurefd.net/output/app.js';
//   script.type = 'module';
//   document.head.append(script);
//   return script
// }
//
// // <script type="module">
// //   import EventBus from 'https://afd-cmhts7g4u3p5y-a4c0bnhteze5bda5.z01.azurefd.net/output/app.js';
// // </script>
//
// <script type="module">EventBus.</script>
//
// @Component({
//   tag: 'test-component',
//   styleUrl: 'test-component.css',
//   shadow: false,
// })
// export class TestComponent {
//
//   componentWillLoad() {
//     console.log(EventBus.authenticationListener)
//     EventBus.newFirmwareListener()
// // EventBus.dispatch
// // <script type="module" src="https://afd-cmhts7g4u3p5y-a4c0bnhteze5bda5.z01.azurefd.net/output/app.js">EventBus<my-component></my-component></script>
//
//   }
//
//   componentDidLoad() {
//   }
//
//   render() {
//
//     return <div class="test-container">
//
//     </div>
//   }
// }
