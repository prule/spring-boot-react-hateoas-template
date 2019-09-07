import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import InputDatePicker from "../../components/InputDatePicker";

import Routes from "../../Routes";
import Pet from "../pet/Pet";
import Person from "./Person";

import "react-datepicker/dist/react-datepicker.css";
import {onApiError} from "../../Api";
import {navigate} from "../../common/PageUtil";
import {useStateValue} from "../../State";

export default function PersonPetPage(props) {
  const [{index, alert}, dispatch] = useStateValue();

  const personKey = props.match.params.personKey;
  const petKey = props.match.params.petKey;

  const [validation, setValidation] = useState(null);
  const [person, setPerson] = useState(null);
  const [pet, setPet] = useState(null);

  useEffect(() => {

    Person.find(index, personKey)
      .then((person) => {
        setPerson(person);
        return person;
      })
      .then((person) => {
        if (petKey === 'new') {
          let newPet = new Pet();
          newPet.owner = person;
          this.setPet(newPet);
        } else {
          Pet.find(index, petKey)
            .then(setPet)
            .catch(onApiError);
        }
      })
      .catch(onApiError);

  },[personKey,petKey]);

  function onCancel() {
    navigate(props.history, Routes.person.person(person));
  }

  function onSave() {
    // this.clear();

    pet.save()
      .then(setPet)
      .then(() => navigate(props.history, Routes.person.person(person)))
      .catch(onApiError);
  }

  return (
    <div>
      <h2>Pet</h2>

      {pet &&
      <Form horizontal>
        <FormGroup controlId="petName" validationState={validation('name')}>
          <Col componentClass={FormLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Name" value={pet.name.name} name="pet.name.name" onChange={this.onChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="petDateOfBirth" validationState={validation('dateOfBirth')}>
          <Col componentClass={FormLabel} sm={2}>
            Date of Birth
          </Col>
          <Col sm={10}>
            <InputDatePicker className="form-control" value={pet.dateOfBirth} name="pet.dateOfBirth" onChange={this.onChange}/>
          </Col>
        </FormGroup>

        <Row>
          <Col sm={10} smPush={2}>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={onSave}>Save</Button>
              <Button onClick={onCancel}>Cancel</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Form>
      }

    </div>
  )

}

