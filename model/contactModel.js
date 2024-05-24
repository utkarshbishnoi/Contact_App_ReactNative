  export default class Contact {
    constructor(
      id = null,
      name = '',
      mobile = '',
      landline = '',
      photo = null,
      favorite = false,
    ) {
      this.id = id;
      this.name = name;
      this.mobile = mobile;
      this.landline = landline;
      this.photo = photo;
      this.favorite = favorite;
    }
  }
