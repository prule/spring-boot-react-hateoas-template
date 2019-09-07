import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import Person from "./Person";
import Str from "../../common/Str";
import Routes from "../../Routes";
import ErrorMessage from "../../common/ErrorMessage";
import {fn, navigate} from "../../common/PageUtil";
import {onApiError} from "../../Api";
import {useStateValue} from "../../State";

export default function PersonsPage(props) {
  const [{index, alert}, dispatch] = useStateValue();

  const [validation, setValidation] = useState(null);
  const [persons, setPersons] = useState(null);

  useEffect(() => {

    let params = {};
    Person.search(index, params)
      .then(setPersons)
      .catch(onApiError);

  }, [index]);

  function onSelectPerson(person) {
    navigate(props.history, Routes.person.person(person));
  }


  return (
    <div>
      <h2>Owners</h2>

      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th className="col-md-9">Name</th>
          <th className="col-md-2 text-center">Date Of Birth</th>
          <th className="col-md-1"></th>
        </tr>
        </thead>
        <tbody>

        {persons && persons.list.map((person) => {
          return (
            <tr key={person.key} onClick={fn(onSelectPerson, person)} className="clickable">
              <td>{person.name.fullName()}</td>
              <td className="text-center">{Str.formatDate(person.dateOfBirth)}</td>
              <td className="text-center"> ]</td>
            </tr>
          );
        })}
        </tbody>
      </Table>

    </div>
  )

}

