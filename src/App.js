import React, {Component} from 'react'
import * as ContactsAPI from './utils/ContactsAPI'
import { Route } from 'react-router-dom'
import ListContacts from './ListContact'
import CreateContact from './CreateContact'


class App extends Component {
  state = { 

    screen : '',

    contacts : []
  }

  componentDidMount(){
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  deleteContact = (contact) => {
    this.setState(state => ({
      contacts: state.contacts.filter((person) => person.id !== contact.id )
      }))

    ContactsAPI.remove(contact)
  }


  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat({contact})
      }))
    })
  }

  changePage = () => {
    this.setState({currentPage: "home"})
  }

  render(){
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListContacts
            contacts={this.state.contacts}
            deleteContact={this.deleteContact}
            onNavigate={() => {
              this.setState({screen: 'create'})
            }}/>
          )} />
        <Route exact path="/create" 
        render={({history}) => (
          <CreateContact 
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
          )}
        />
      </div>

    )
  }
}

export default App;