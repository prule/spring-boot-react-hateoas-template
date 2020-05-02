import LinkRelation from "../common/domain/LinkRelation";

export default class LinkRelations {


  static update = new LinkRelation('update');

  static personSearch = new LinkRelation('person-search');
  static personFind = new LinkRelation('person-find');

  static petCreate = new LinkRelation('pet-create');
  static petFind = new LinkRelation('pet-find');
  static petSearch = new LinkRelation('pet-search');


  static me = new LinkRelation('user-me');
  static login = new LinkRelation('login');

}