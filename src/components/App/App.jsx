import { useState } from 'react';
import Contacts from '../Contacts';
import Form from '../Form';
import SectionTitle from '../SectionTitle';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    const checkedName = contacts.find(elem => {
      return elem.name === name;
    });

    if (checkedName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => {
      let abs = [...prevContacts, newContact];
      return abs;
    });
  };

  const onFilterSearch = e => {
    setFilter(e.target.value);
  };

  const onItemDelete = id => {
    setContacts(prevContacts => {
      const newContacts = [...prevContacts];
      const index = newContacts.findIndex(elem => elem.id === id);
      newContacts.splice(index, 1);
      return newContacts;
    });
  };

  const filteredSearch = () => {
    const normaliseFilter = filter.toLowerCase();
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(normaliseFilter)
    );
  };

  return (
    <Container>
      <SectionTitle title="Phonebook" />
      <Form onSubmitForm={formSubmitHandler} />
      <Contacts
        title={'Contacts'}
        contacts={filteredSearch()}
        filter={filter}
        onFilter={onFilterSearch}
        onItemDelete={onItemDelete}
      />
    </Container>
  );
};

export default App;
