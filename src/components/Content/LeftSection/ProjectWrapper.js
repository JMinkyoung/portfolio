export default function ProjectWrapper($container) {
  this.state = {
    "OCT" : "",
    "Netflix": "",
    "Digging":""
  }
  const width = Math.floor((document.querySelector('.LeftContentBody').clientWidth-parseFloat(window.getComputedStyle(document.querySelector('.LeftContentBody')).paddingLeft)-parseFloat(window.getComputedStyle(document.querySelector('.LeftContentBody')).paddingRight))/2);
  this.$target = document.createElement('div');
  this.$target.className = 'LeftContentWrapper';
  this.$target.style.cssText = `overflow:hidden`;
  this.$target.innerHTML = `
  <div class ="LeftContentHeader">Project </div>
  <div class ="LeftContentBody" style="overflow:hidden"><div class="projectBox"><div class="projectList"></div></div></div>
  `;
  this.$target.childNodes[3].lastChild.style.cssText = `width: ${Math.floor(width*2)}px`;

  this.$target.childNodes[3].lastChild.lastChild.style.cssText = `width: ${width*Object.keys(this.state).length}px`;
  $container.appendChild(this.$target);

  this.render = () => {
    console.log(width);
    for(let key in this.state){
      this.$project = document.createElement('div');
      this.$project.className = "projectContent";
      this.$project.style.cssText = `display: flex; flex-direction: column; justify-content:center; width:${width}px; background-color:red;`
      this.$project.innerHTML =`
      <div>이미지</div>
      <div>설명</div>
      <div>링크</div>
      `
      this.$target.childNodes[3].lastChild.lastChild.appendChild(this.$project);
    }
  }

  this.render();

}