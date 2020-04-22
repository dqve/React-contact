import React, {Component} from 'react'


class ListContacts extends Component{
	render(){
		console.log('props', this.props)
		let contacts = this.props.contacts
		return(
			<ol className="contact-list">
			contacts.map(person => 
			<li>{person.name}</li>
				)
			</ol>
		)
	}
}

export default ListContacts;