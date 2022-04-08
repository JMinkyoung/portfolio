import ProfileBadge from "./ProfileBadge.js";

export default function ProfileRight($wrapper) {
  this.$target = document.createElement('div');
  this.$target.className = 'ProfileRight';
  $wrapper.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = '<div class="Level">Level<span class="LevelNum">26</span></div>';
    const profileBadge = new ProfileBadge(this.$target);
  }

  this.render();
}