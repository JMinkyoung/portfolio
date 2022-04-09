export default function ContentWrapper({$wrapper, title}){
  this.$target = document.createElement('div');
  this.$target.className = 'ContentWrapper';
  $wrapper.appendChild(this.$target);

  this.$title = document.createElement('div');
  this.$title.className = 'ContentTitle';
  this.$title.innerHTML = `<span>${title}</span>`

  this.render = () => {
    this.$target.appendChild(this.$title);
  }

  this.render();
}