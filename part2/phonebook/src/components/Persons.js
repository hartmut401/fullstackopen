const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      )}
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <>
      {person.name} {person.number} 
      <button onClick={deletePerson}>delete</button><br />
    </>
  )
}

export default Persons