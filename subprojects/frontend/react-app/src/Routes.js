export default class Routes {

  static main = {

    home() {
      return '/';
    },

    login() {
      return "/login";
    }

  };

  static person = {

    persons() {
      return '/app/persons'
    },

    person(person) {
      return `/app/persons/${person.key}`;
    },

    pet(person, pet) {
      return Routes.person.person(person) + (pet ? `/pets/${pet.key}` : `/pets/new`);
    }

  };

}