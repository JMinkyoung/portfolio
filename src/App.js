import ProfileHeaderWrapper from './components/ProfileHeaderWrapper.js';
import ProfileContentWrapper from './components/ProfileContentWrapper.js';

export default function App($app){
  this.state = {};


  const profileHeader = new ProfileHeaderWrapper({$app, initialState: this.state});
  const profileContent = new ProfileContentWrapper({$app, initialState: this.state});

}