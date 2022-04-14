export default function IntroduceWrapper($container) {
  this.$target = document.createElement('div');
  this.$target.className = "LeftContentWrapper";

  this.$target.innerHTML = `
  <div class ="LeftContentHeader">Introduce </div>
  <div class ="LeftContentBody">
    <div class="LeftContentBodyInner" id="introduce">
    저는 2022년 2월 동국대학교 컴퓨터 공학과를 졸업한, 개발자로서의 새로운 도약을 위해 준비하고 있는 <b style="color:whitesmoke">신입 프론트엔드 개발자</b> 좌민경입니다.<br/><br/>
    개발자가 되고 싶다는 꿈을 가지고 원하던 컴퓨터 공학과에 입학하였지만 생각했던 것보다 개발자라는 직업의 분야가 다양했고 수업을 들어도 스스로 ‘나의 길이다’ 싶었던 분야를 찾지 못해서 방황을 하던 중, ‘이대로 졸업하면 안 되겠다 새로운 환경에서 여러 경험이라도 해보자’ 싶은 마음에 휴학을 하고 2019년 일본으로 10개월 정도 워킹 홀리데이를 떠났습니다.<br/><br/> 
    그렇게 일본에서 생활을 하던 중 웹 디자이너 겸 퍼블리셔가 있는 회사에서 알바를 하게 되었고 내가 만들어낸 것이 유저에게 바로 보이고, 그에 대한 반응을 바로 확인할 수 있다는 점에 매력을 느끼게 되어 퍼블리셔보단 전공을 더 살릴 수 있는 <b style="color:whitesmoke">프론트엔드 개발자</b>가 돼야겠다는 다짐을 하게 되었습니다.<br/><br/>
    어떻게 해야 유저가 <b style="color:whitesmoke">편하게</b> 이용할 수 있을까, 어떻게 해야 <b style="color:whitesmoke">보기 좋게</b> 구현할 수 있을까, 어떻게 해야 <b style="color:whitesmoke">효율적</b>으로 구현할 수 있을까를 가장 중요시 여기며 유저와 코드를 통해 소통하고 이것들을 가능하게 하는 기술들에 관심 갖기를 좋아합니다.
    </div>
  </div>
  `;
  $container.appendChild(this.$target);



}