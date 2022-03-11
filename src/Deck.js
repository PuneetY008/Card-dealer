import React, { Component } from 'react';
import axios  from 'axios';
import Card from './Card';
import './Deck.css';


const Base_url = 'https://deckofcardsapi.com/api/deck/';

class Deck extends Component{
    constructor(props){
        super(props);
        this.state = {
            deck: null,
            fetched: []
        }
        this.handleGetCard = this.handleGetCard.bind(this);
    }

    async componentDidMount(){
        const API_URL = `${Base_url}new/shuffle`;
        let deck = await axios.get(API_URL);
        this.setState({deck: deck.data});
    }

    async handleGetCard(){
        const card_url = `${Base_url}${this.state.deck.deck_id}/draw/`;
        try{
            let card = await axios.get(card_url);
            let cardData = card.data;
            //console.log(cardData);
            if(cardData.success === false){
                throw new Error('No cards left');
            }
            this.setState(st=>({
                fetched: [...st.fetched,{id: cardData.cards[0].code, img: cardData.cards[0].image, name: `${cardData.cards[0].value} of ${cardData.cards[0].suit}`}]
            }));
        } catch(e){
            alert(`${e}`);
        } 
    }

    render(){
        let cards = this.state.fetched.map(c=>(
            <Card image={c.img} key={c.id} name={c.name} />
        ));
        return(
            <div>
                <h1>Card Dealer</h1>
                <button onClick={this.handleGetCard}>Get Card!</button>
                <div className='deck-cardarea'>
                    {cards}
                </div>
            </div>
        );
    }
}

export default Deck;