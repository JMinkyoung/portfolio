export default function Background($app) {
  this.$target = document.createElement('div');
  this.$target.className="BackgroundWrapper";
  this.$target.style.cssText = 'width: 100%; height:100%; position:fixed; z-index: 0; item-align: center';

  this.$text = document.createElement('span');
  this.$text.className="BackgroundText underline";
  this.$text.style.cssText = 'font-size: 100px; font-weight:bolder';
  this.$text.innerHTML="Frontend Engineer<br/>좌민경 입니다.";

  this.$target.appendChild(this.$text);
  $app.appendChild(this.$target);

  // setInterval(()=>{
  //   this.$text.style.backgroundSize="100% 100%";
  // },2000);
}