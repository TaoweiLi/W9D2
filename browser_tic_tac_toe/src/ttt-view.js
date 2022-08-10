class View {
  constructor(game, el) {
    this.game = game
    this.el = el
    this.board = this.setupBoard()
    // invoke bind events
    this.handleClick = this.handleClick.bind(this)
    this.bindEvents()
  }

  // const boardInfo = JSON.parse(localStorage.getItem('boardStuff')) || [];

  setupBoard() {
    let grid = document.createElement('ul')
    grid.classList.add('grid')
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let li = document.createElement('li')
        let pos = [i, j]
        li.dataset.pos = JSON.stringify(pos)
        grid.append(li);
      }
    }
    this.el.append(grid)
  }
  
  bindEvents() {
    this.el.addEventListener("click", this.handleClick)
  }

  handleClick(e) {
    e.preventDefault();
    let square = e.target;
    if (square.nodeName === 'LI'){
      this.makeMove(square)
    }
  }
  
  makeMove(square) {
    let mark = this.game.currentPlayer
    if(!square.classList.length){
      square.classList.add(mark)
      square.innerText = mark
    } else{
      alert("That is not a valid move!")
    }
    
    let position = JSON.parse(square.dataset.pos)
    this.game.playMove(position) 
    if(this.game.isOver()){
      this.game.swapTurn()
      this.handleGameOver()
    }
  }
  
  
  handleGameOver(){
    if (this.game.winner){
      // could make an element with innerText and apend it to something
      alert(`Player ${this.game.currentPlayer} wins!!!!!`)
    } else {
      alert("It's a Tie!!!")
    }
  }


}










module.exports = View;
