export default class Routes {

  static main = {

    home() {
      return '/';
    }

  };

  static person = {

    persons() {
      return '/persons'
    },

    person(person) {
      return `/persons/${person.key}`;
    },

    pet(person, pet) {
      return Routes.person.person(person) + (pet ? `/pets/${pet.key}` : `/pets/new`);
    }

  };

}