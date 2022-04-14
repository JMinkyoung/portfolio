import Background from "./components/Background.js";
export default function App($app){
  this.state = {};

  this.render = () => {
    const background = new Background($app);
  }

  this.render();

}