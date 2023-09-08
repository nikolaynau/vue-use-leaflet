import Theme from 'vitepress/theme';
import Demo from './components/demo/Demo.vue';
import './styles/global.css';

export default {
  ...Theme,
  enhanceApp({ app, router, siteData }) {
    app.component('Demo', Demo);
  }
};
