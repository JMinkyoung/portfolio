export default function SkillWrapper($container) {
  this.$target = document.createElement('div');
  this.$target.className = 'LeftContentWrapper';
  this.$target.innerHTML = `
  <div class ="LeftContentHeader">Skill </div>
  <div class ="LeftContentBody">
    <div class="LeftContentBodyInner">
      
    </div>

  </div>
  `
  $container.appendChild(this.$target);


}