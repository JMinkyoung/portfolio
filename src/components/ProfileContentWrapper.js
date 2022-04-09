import ContentWrapper from "./ContentWrapper.js";

export default function ProfileContentWrapper({$app, initialState}) {
  this.state = initialState;

  this.$target = document.createElement('div');
  this.$target.className = 'ProfileContentWrapper';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    const skillContent = new ContentWrapper({$wrapper: this.$target, title: "Skill"});
  }

  this.render();
}