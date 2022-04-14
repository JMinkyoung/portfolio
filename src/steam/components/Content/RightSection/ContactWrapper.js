export default function ContactWrapper($container) {
  this.state = {
    "email": ["mailto:whk5817@gmail.com", "Email\nwhk5817@gmail.com"],
    "phone": ["","Phone\n"],
    "github": ["https://github.com/JMinkyoung", "Github\nhttps://github.com/JMinkyoung"],
    "velog": ["https://velog.io/@jminkyoung","Velog\nhttps://velog.io/@jminkyoung"]
  }
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.$target = document.createElement('div');
  this.$target.className = 'RightContent';
  this.$target.innerHTML = `<div class="RightContentTitle">Contact<span style="color: #9b9b9b; font-size: 20px; margin-left: 8px;">${Object.keys(this.state).length}</span></div>`;
  $container.appendChild(this.$target);

  this.$wrapper = document.createElement('div');
  this.$wrapper.className='ContactIconWrapper';
  this.$target.appendChild(this.$wrapper);

  this.render = () => {
    for(let key in this.state){
      this.$contact = document.createElement('div');
      this.$contact.className = 'ContactItem';
      this.$contact.setAttribute('data-tooltip-text', this.state[key][1])
      this.$contact.innerHTML = `
      <a href=${this.state[key][0]} target="_blank">
        <img src="./src/steam/img/${key}.png" />
      </a>`;
    
      this.$wrapper.appendChild(this.$contact);
    }
  }

  this.render();

}