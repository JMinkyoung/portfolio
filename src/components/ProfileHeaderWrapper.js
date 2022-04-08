import ProfileCenter from "./ProfileCenter.js";
import ProfileImage from "./ProfileImage.js";
import ProfileRight from "./ProfileRight.js";

export default function ProfileHeaderWrapper({$app, initialState}) {
  this.state = initialState;

  this.$target = document.createElement('div');
  this.$target.className = 'ProfileHeaderWrapper';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    const profileImage = new ProfileImage(this.$target);
    const profileCenter = new ProfileCenter(this.$target);
    const profileRight = new ProfileRight(this.$target);
  }

  this.render();
}