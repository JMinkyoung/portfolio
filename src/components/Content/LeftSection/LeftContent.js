import IntroduceWrapper from "./IntroduceWrapper.js";
import ProjectWrapper from "./ProjectWrapper.js";
import SkillWrapper from "./SkillWrapper.js";

export default function LeftContent($wrapper) {
  this.$target = document.createElement('div');
  this.$target.className="LeftContent";
  $wrapper.appendChild(this.$target);

  this.render = () => {
    const introduceWrapper = new IntroduceWrapper(this.$target);
    const skillWrapper = new SkillWrapper(this.$target);
    const projectWrapper = new ProjectWrapper(this.$target);
  };

  this.render();
}