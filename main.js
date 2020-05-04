class Card {
    //Each card will have a suit, rank and value. value is number of card and rank is what card is called.
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}

class Deck {
    //each deck will have an array of Cards and an array of shuffled Cards
    constructor(length) {
        this.cards = [];
        this.shuffleDeck = [];
    }
    //the deck will have a creation method to add all the cards to the cards array
    createDeck() {
      for (let i = 0; i < 4; i++) {
          for (let j = 2; j <= 14; j++) {
              let newCard;
              if (i == 0) {
                  newCard = new Card("hearts", j, j);
              }
              if (i == 1) {
                  newCard = new Card("diamonds", j, j);
              }
              if (i == 2) {
                  newCard = new Card("clubs", j, j);
              }
              if (i == 3) {
                  newCard = new Card("spades", j, j);
              }
              this.cards.push(newCard);
          }
      }
      for (let i = 0; i < this.cards.length; i++) {
          if (this.cards[i].value == 11) {
            this.cards[i].rank = 'Jack'
          }
          if (this.cards[i].value == 12) {
            this.cards[i].rank = 'Queen'
          }
          if (this.cards[i].value == 13) {
            this.cards[i].rank = 'King'
          }
          if (this.cards[i].value == 14) {
            this.cards[i].rank = 'Ace'
          }
      }
    }
    //the deck will also have a shuffle method to add the cards from the cards array to the shuffled deck array in a random order
    shuffle() {
      while (this.cards.length > 0) {
          let randomIndex = Math.floor(Math.random() * this.cards.length);
          let randomCard = this.cards[randomIndex];
          let lastCard = this.cards[this.cards.length - 1];
          this.cards[this.cards.length - 1] = randomCard;
          this.cards[randomIndex] = lastCard;
          this.shuffleDeck.push(this.cards.pop());
      }
    }
    //and finally the deck will have a split method to separate the shuffled deck into two new decks
    splitDeck(deck1, deck2) {
      for (let i = 0; i < this.shuffleDeck.length; i++) {
          if (i < 26) {
              deck1.push(this.shuffleDeck[i])
          } else {
              deck2.push(this.shuffleDeck[i])
          }
      }
    }
}

//we'll declare a deck of cards, create it and shuffle it.
let deckOfCards = new Deck();

deckOfCards.createDeck()

deckOfCards.shuffle()

//then we'll declare two new decks and split the full deck into these two new decks
let player1Deck = new Deck();
let player2Deck = new Deck();

deckOfCards.splitDeck(player1Deck.cards, player2Deck.cards)

//this function compares two instances of the card class and shows which card would win in the game.
function compareCards(card1, card2) {
    if (card1.rank == 2 && card2.rank == 'Ace') {
        return "player 1 wins"
    } else if (card2.rank == 2 && card1.rank == 'Ace') {
        return "player 2 wins"
    } else if (card1.value > card2.value) {
        return "player 1 wins"
    } else if (card1.value < card2.value) {
        return "player 2 wins"
    } else {
      return "war"
    }
}

//this function uses the compareCards function to give the cards played to whoever wins
let winnerSpoils = []
function winnerTakesAll() {
  let player1Card = player1Deck.cards.shift()
  let player2Card = player2Deck.cards.shift()
  winnerSpoils.push(player1Card, player2Card)
  //we add the top card of each deck to the pile that the winner will get
  //if player 1 wins then we add the winner pile to the bottom of his deck
  if (compareCards(player1Card, player2Card) == "player 1 wins") {
    console.log(`PLayer 1 has a ${player1Card.rank} of ${player1Card.suit}`)
    console.log(`PLayer 2 has a ${player2Card.rank} of ${player2Card.suit}`)
    console.log(compareCards(player1Card, player2Card))
    player1Deck.cards = player1Deck.cards.concat(winnerSpoils)
    winnerSpoils = []
    //if player 2 wins we add the winner pile to his deck
  } else if (compareCards(player1Card, player2Card) == "player 2 wins") {
    console.log(`PLayer 1 has a ${player1Card.rank} of ${player1Card.suit}`)
    console.log(`PLayer 2 has a ${player2Card.rank} of ${player2Card.suit}`)
    console.log(compareCards(player1Card, player2Card))
    player2Deck.cards = player2Deck.cards.concat(winnerSpoils)
    winnerSpoils = []
    //if there is a war then we add more cards to the winner pile and call this whole function again
  } else {
    console.log(`PLayer 1 has a ${player1Card.rank} of ${player1Card.suit}`)
    console.log(`PLayer 2 has a ${player2Card.rank} of ${player2Card.suit}`)
    console.log(compareCards(player1Card, player2Card))
    console.log('Each player draw three cards and play the fourth')
    //if a player can put three cards in the winner pile and still have one left over then this will work
    if (player1Deck.cards.length > 3) {
      let extra1Card = player1Deck.cards.shift()
      let extra2Card = player1Deck.cards.shift()
      let extra3Card = player1Deck.cards.shift()
      winnerSpoils.push(extra1Card, extra2Card, extra3Card)
      //if a player has a small deck then he only puts in all of his cards except one to the winner pile
    } else if (player1Deck.cards.length > 1) {
      while (player1Deck.cards.length > 1) {
        winnerSpoils.push(player1Deck.cards.shift())
      }
      //if a player only has one card left in his deck then nothing happens and he'll use that card when the function is called again
      //if a player has no cards left in his deck then he adds the card he just played back to his deck and removes it from the winner pile
    } else if (player1Deck.cards.length == 0){
        player1Deck.cards.unshift(player1Card)
        let placeCard = winnerSpoils.pop()
        winnerSpoils.pop()
        winnerSpoils.push(placeCard)
    }
    if (player2Deck.cards.length > 3) {
      let extra4Card = player2Deck.cards.shift()
      let extra5Card = player2Deck.cards.shift()
      let extra6Card = player2Deck.cards.shift()
      winnerSpoils.push(extra4Card, extra5Card, extra6Card)
    } else if (player2Deck.cards.length > 1) {
        while (player2Deck.cards.length > 1) {
        winnerSpoils.push(player2Deck.cards.shift())
      }
    } else if (player2Deck.cards.length == 0){
        player2Deck.cards.unshift(player2Card)
        winnerSpoils.pop()
    }
    winnerTakesAll()
  }
}

//this function controles the flow of the game
//each game is separated by rounds and i is the counter for those rounds
//each round is made by the user clicking on the document
//the game ends when one player has an empty deck
let i = 1
document.addEventListener('click', function playGame() {
    //let i = 1
    //let len = player1Deck.cards.length
    //while (len != 0)
    console.log(`Round ${i}`)
    i++
    winnerTakesAll()
    console.log(`PLayer 1 has ${player1Deck.cards.length} cards`)
    console.log(`PLayer 2 has ${player2Deck.cards.length} cards`)
    /*if (player1Deck.cards.length > player2Deck.cards.length) {
        len = player2Deck.cards.length
    } else {
        len = player1Deck.cards.length
    }
    */
    if (player1Deck.cards.length == 0)  {
      console.log('Player 2 Wins It All!')
    } else if (player2Deck.cards.length == 0) {
      console.log('PLayer 1 Wins It All!')
    }
})







