import VueKityminder from './components/VueKityminder';

export default {
  install: app => {
    app.component(VueKityminder.name, VueKityminder);
  }
}
