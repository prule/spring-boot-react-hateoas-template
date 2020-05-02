// @flow


class Path {
  path: string;

  constructor(path) {
    this.path = path;
  }

  navigate(history, callback) {
    history.push(this.path.toString());
    if (callback) {
      callback();
    }
  }

  toString(): string {
    return this.path;
  }
}

export default class Routes {

  static main = {

    home(): Path {
      return new Path('/app/home');
    },

    login(): Path {
      return new Path("/login");
    }

  };

  static person = {

    persons(): Path {
      return new Path('/app/persons');
    },

    person(person): Path {
      return new Path(`/app/persons/${person.key}`);
    },

    pet(person, pet): Path {
      return new Path(`/app/persons/${person.key}` + (pet ? `/pets/${pet.key}` : `/pets/new`));
    }

  };

}