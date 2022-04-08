export default function ProfileContentWrapper({$app, initialState}) {
  this.state = initialState;

  this.$target = document.createElement('div');
  this.$target.className = 'ProfileContentWrapper';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    this.$target.innerHTML = '<h1></h1>';
  }

  this.render();
}