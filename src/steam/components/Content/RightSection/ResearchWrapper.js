export default function ResearchWrapper($container) {
  this.state = {
    "국민청원 사이트 웹 크롤링 및 형태소 분석을 통한 시각화": "한국정보기술학회 종합학술발표논문집,(),353-356.",
    "XGBoost 기반 당뇨병 예측 알고리즘 연구 : 국민건강영양조사 2016~2018 을 이용하여": "한국통신학회 학술대회논문집,(),965-966.",
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.$target = document.createElement('div');
  this.$target.className = 'RightContent';
  this.$target.innerHTML = `<div class="RightContentTitle">Research Publication<span style="color: #9b9b9b; font-size: 20px; margin-left: 8px;">${Object.keys(this.state).length}</span></div>`;
  $container.appendChild(this.$target);

  this.render = () => {
    for(let key in this.state){
      this.$research = document.createElement('div');
      this.$research.className = 'ResearchItem';
      this.$research.innerHTML = `
      <span style="margin-top:10px; color: whitesmoke;">${key}</span><br/>
      <span style="color: grey">${this.state[key]}</span>`;
    
      this.$target.appendChild(this.$research);
    }

  }

  this.render();
}