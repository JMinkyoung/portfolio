export default function SkillWrapper($container) {
  this.state = {
    "JS" : [90,"JavaScript"],
    "React": [80, "React"],
    "HTML" : [80, "HTML5"],
    "CSS" : [60, "CSS3"],
    "TS" : [50, "TypeScript"],
    "Node": [40, "Node.js"]
  }
  this.$target = document.createElement('div');
  this.$target.className = 'LeftContentWrapper';
  this.$target.innerHTML = `
  <div class ="LeftContentHeader">Skill </div>
  `;
  this.$body = document.createElement('div');
  this.$body.className = 'LeftContentBody';
  this.$body.style.cssText = 'display: flex; flex-wrap: wrap; justify-content:center;'
  $container.appendChild(this.$target);
  this.$target.appendChild(this.$body);

  this.render = () => {
    for(let key in this.state){
      this.$skill = document.createElement('div');
      this.$skill.className = 'SkillWrapper';
      this.$skill.innerHTML = `
      <div style="padding: 3px"><img src="./src/steam/img/${key}.png" /></div>
      <div class="SkillContent">
        <span>${this.state[key][1]}<span style="float:right">${this.state[key][0]}%</span></span>
        <div class="skillProgress">
          <div class="skillBar" style="width:${this.state[key][0]}%"></div>
        </div>
      </div>
      `;
      this.$body.appendChild(this.$skill);
    }

  }

  this.render();

}