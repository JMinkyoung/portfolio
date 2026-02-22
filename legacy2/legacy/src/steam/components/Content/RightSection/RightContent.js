import ContactWrapper from "./ContactWrapper.js";
import EducationWrapper from "./EducationWrapper.js";
import ResearchWrapper from "./ResearchWrapper.js";

export default function RightContent($wrapper) {
  this.$target = document.createElement('div');
  this.$target.className = 'RightContentWrapper';
  $wrapper.appendChild(this.$target);

  this.$status = document.createElement('div');
  this.$status.className = 'StatusWrapper';
  this.$status.innerHTML = '<div class="StatusName">구직 중</div><div class="JobType">Frontend Engineer</div>'
  this.$target.appendChild(this.$status);
  
  this.render = () => {
    const contactWrapper = new ContactWrapper(this.$target);
    const researchWrapper = new ResearchWrapper(this.$target);
    const educationWrapper = new EducationWrapper(this.$target);
  };

  this.render();
}