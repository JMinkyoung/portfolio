import HeaderWrapper from './components/Header/HeaderWrapper.js'
import ContentWrapper from './components/Content/ContentWrapper.js';

export default function App($app){
  this.state = {};


  const profileHeader = new HeaderWrapper({$app, initialState: this.state});
  const profileContent = new ContentWrapper({$app, initialState: this.state});

}