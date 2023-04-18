import { useEffect, useState } from 'react';
import Contacts from '../Contacts';
import Form from '../Form';
import SectionTitle from '../SectionTitle';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';

const KEY_DATA = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(KEY_DATA));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

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
      let newContactsArr = [...prevContacts, newContact];

      const contactsJson = JSON.stringify(newContactsArr);
      localStorage.setItem(KEY_DATA, contactsJson);

      return newContactsArr;
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

      const contactsJson = JSON.stringify(newContacts);
      localStorage.setItem(KEY_DATA, contactsJson);

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
