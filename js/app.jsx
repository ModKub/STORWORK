import React from 'react';
import ReactDOM from 'react-dom';
require('isomorphic-fetch');

document.addEventListener('DOMContentLoaded', function() {

    class Products extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                productData: [],
                product_id: 0,
                value: 0
            }
        }
        getProducts() {
            fetch('http://188.116.11.87/graphql', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({"query": "{product {id name slug description keywords is_published author attributes{id} average }}"})
            }).then(function(response) {
                return response.json();
            }).then(responseObject => {
                let data = responseObject.data.product;
                this.setState({productData: data});
            });
        }
        setRate() {
            let mutation = `mutation {
                            rating(product_id: ${this.state.product_id}, value: ${this.state.value}, name: "user", phone: "089", email: "aaa@o2.pl", content: "ocen") {
                                id
                                value
                                }
                            }`;
            fetch('http://188.116.11.87/graphql', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({"query": mutation})
            }).then(function(response) {
                return response.json();
            }).then(responseObject => {
                console.log(responseObject);
            });
            this.getProducts();
        }
        handleChange = (e) => {
            let inputField = e.target.value;
            this.setState({value: inputField});
        }
        handleClick = (e, i) => {
            e.preventDefault();
            let product_id = i;
            this.setState({product_id: product_id});
            this.setRate();
        }
        componentDidMount() {
            this.getProducts();
        }
        render() {
            let list = this.state.productData.map((e, i) => {
                return <li key={e.id}>tytył: {e.name}
                    <br></br>
                    opis: {e.description}
                    <br></br>
                    ocena: {e.average}
                    <br></br>
                    czy opublikowano: {JSON.stringify(e.is_published)}
                    <br></br>
                    author: {JSON.stringify(e.author)}
                    <br></br>
                    wystaw ocene 1-10:<form><input type="number" min="1" max="10" onChange={this.handleChange}></input> <button onClick={(a)=>{this.handleClick(a, e.id)}}>Submit</button></form>
                </li>
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
