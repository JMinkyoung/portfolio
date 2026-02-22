import RightContent from "./RightSection/RightContent.js";
import LeftContent from "./LeftSection/LeftContent.js";
export default function ContentWrapper({$app, initialState}) {
  this.state = initialState;

  this.$target = document.createElement('div');
  this.$target.className = 'ContentWrapper';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    const leftContent = new LeftContent(this.$target);
    const rightContent = new RightContent(this.$target);
  }

  this.render();
}