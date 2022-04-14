export default function ProjectWrapper($container) {

  this.array = [
    ["Netflix","Netflix 사이트 Clone", "https://github.com/JMinkyoung/Netflix-Clone","https://netflix-clone-five-kohl.vercel.app/"],
    ["Digging","냉장고에 남은 재료로 뭘 만들 수 있을까?","https://github.com/JMinkyoung/Digging-Fridge","http://diggingfridge.shop"],
    ["OCT","Time Timer를 무료로 웹에서 사용해보자 ⏱", "https://github.com/JMinkyoung/OcularTimer", "https://oculartimer.vercel.app/"],
    ["Drawing","직접 그린 그림과 함께 그날의 생각을 기록할 수 있는 그림일기","https://github.com/JMinkyoung/Drawing-Diary","https://drawing-diary.vercel.app/"],
    ["Netflix","Netflix 사이트 Clone", "https://github.com/JMinkyoung/Netflix-Clone","https://netflix-clone-five-kohl.vercel.app/"],
    ["Digging","냉장고에 남은 재료로 뭘 만들 수 있을까?","https://github.com/JMinkyoung/Digging-Fridge","http://diggingfridge.shop"],
  ];

  const width = Math.floor((document.querySelector('.LeftContentBody').clientWidth-parseFloat(window.getComputedStyle(document.querySelector('.LeftContentBody')).paddingLeft)-parseFloat(window.getComputedStyle(document.querySelector('.LeftContentBody')).paddingRight))/2);
  this.$target = document.createElement('div');
  this.$target.className = 'LeftContentWrapper';
  this.$target.style.cssText = `overflow:hidden`;
  this.$target.innerHTML = `
  <div class ="LeftContentHeader">Project </div>
  <div class ="LeftContentBody" style="overflow:hidden; "><div class="projectBox"><div class="projectList"></div></div></div>
  `;

  let projectBox = this.$target.childNodes[3].lastChild;
  let projectList = this.$target.childNodes[3].lastChild.lastChild;

  projectBox.style.cssText = `width: ${Math.floor(width*2)}px`;
  projectList.style.cssText = `width: ${width*this.array.length}px; -webkit-transform: translate3d(-${width}px, 0px, 0px);`;

  $container.appendChild(this.$target);

  for(let arr of this.array){
    this.$project = document.createElement('div');
    this.$project.className = "projectContent";
    this.$project.style.cssText = `display: flex; flex-direction: column; justify-content:center; width:${width}px; padding-right: 14px;`
    this.$project.innerHTML =`
    <div class="projectImg">
      <img style="width: 100%; height:auto;" src="./src/steam/img/project/${arr[0]}.png" />
    </div>
    <div class="projectDesc">
      <span>${arr[1]}</span>
    </div>
    <div class="projectLink">
      <a href=${arr[2]} target='_blank'>
        <img style="width: 25px; height:25px;" src="./src/steam/img/project/github.png"/>
      </a>
      <a href=${arr[3]} target='_blank'>
        <img style="width: 25px; height:25px;" src="./src/steam/img/project/web.png"/>
      </a>
    </div>
    `
    projectList.appendChild(this.$project);
  }

  let i = 1;
  setInterval(()=>{
    if(i<this.array.length-1){
      projectList.style.transition = "500ms";
      projectList.style.webkitTransform = `translate3d(-${width*i}px, 0px, 0px)`;
      i++; 
    }
    if(i === this.array.length-1){
      setTimeout(()=>{
        projectList.style.transition = "0ms";
        projectList.style.webkitTransform = `translate3d(0px, 0px, 0px)`;
        i=1;
      },500)
    }
  },3000);

}