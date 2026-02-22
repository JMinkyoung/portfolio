export default function ProfileCenter($wrapper) {
  this.$target = document.createElement('div');
  this.$target.className = 'ProfileCenter';
  $wrapper.appendChild(this.$target);


  this.render = () => {
    this.$target.innerHTML='<div class="ProfileName"><span>좌민경</span><div class="triangle"></div></div><div class="ProfileDes">안녕하세요 ! <br/>저는 새로운 것을 두려워하지 않는<br/>신입 프론트엔드 개발자 좌민경입니다.</div>';

  };

  this.render();
}