export default function EducationWrapper($container){
  this.state = {
    "동국대학교  (2016.02 ~ 2022.02)" : "컴퓨터 정보통신공학부/ 컴퓨터 공학 전공"
  }

  this.$target = document.createElement('div');
  this.$target.className = 'RightContent';
  this.$target.innerHTML = `<div class="RightContentTitle">Education<span style="color: #9b9b9b; font-size: 20px; margin-left: 8px;">${Object.keys(this.state).length}</span></div>`;
  $container.appendChild(this.$target);

  this.$education = document.createElement('div');
  this.$education.className = 'EduWrapper';
  this.$education.innerHTML = `
  <img style="box-shadow: 1px 1px 2px #0c0c0c; width: 50px; height: 50px; border-radius: 3px;"src="./src/img/education.jpg" />
  <div style="display: flex; flex-direction: column; margin-left: 10px;">
    <span style="color: #ebebeb;">동국대학교  (2022.02 졸업)</span>
    <span style="color: #969696; font-size: 13px;">컴퓨터 정보통신공학부<br/>컴퓨터 공학 전공</span>
  </div>
  `;

  this.$target.appendChild(this.$education);



  this.render = () => {

  }

  this.render();
}