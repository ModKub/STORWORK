import React from 'react';
import ReactDOM from 'react-dom';
require('isomorphic-fetch');

document.addEventListener('DOMContentLoaded', function() {

    class Products extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                productData: [],
                rating: []
            }
        }
        getProducts() {

            fetch('http://188.116.11.87/graphql', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({"query": "{product {id name slug description keywords is_published author attributes{id} }}"})
            }).then(function(response) {
                return response.json();
            }).then(responseObject => {
                console.log('GOT', responseObject.data.product[0]);

                let data = responseObject.data.product;
                this.setState({productData: data});
            });

        }

        componentDidMount() {
            this.getProducts();

        }
        render() {
            console.log(this.state.rating);
            let list = this.state.productData.map((e,i) => {
                return <li key={e.id}>tytył: {e.name} <br></br> opis: {e.description} <br></br> czy opublikowano: {JSON.stringify(e.is_published)} <br></br> author: {JSON.stringify(e.author)}</li>
            })

            return <ul>
                {list}
            </ul>
        }
    }

    class App extends React.Component {
        render() {
            return <Products/>
        }
    }

    ReactDOM.render(
        <App/>, document.getElementById('app'));
});
