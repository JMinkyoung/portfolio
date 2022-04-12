import HeaderWrapper from './components/Header/HeaderWrapper.js'
import ContentWrapper from './components/Content/ContentWrapper.js';
import Background from './components/Background.js';

export default function App($app){
  this.state = {};

  const background = new Background($app);
  const profileHeader = new HeaderWrapper({$app, initialState: this.state});
  const profileContent = new ContentWrapper({$app, initialState: this.state});

}