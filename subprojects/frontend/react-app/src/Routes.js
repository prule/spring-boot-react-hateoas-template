export default class Routes {

  static main = {

    home() {
      return new Path('/');
    },

    login() {
      return new Path("/login");
    }

  };

  static person = {

    persons() {
      return new Path('/app/persons');
    },

    person(person) {
      return new Path(`/app/persons/${person.key}`);
    },

    pet(person, pet) {
      return new Path(`/app/persons/${person.key}` + (pet ? `/pets/${pet.key}` : `/pets/new`));
    }

  };

}


class Path {
  path;

  constructor(path) {
    this.path = path;
  }

  navigate(history, callback) {
    history.push(this.path.toString());
    if (callback) {
      callback();
    }
  }

  toString() {
    return this.path;
  }
}