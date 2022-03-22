export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret",
        permission: "ADMIN"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret",
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    crafts: {
      _model: "Craft",
      craftOne: {
        title: "Knitting",
        userid: "->users.bart"
      },
      craftTwo: {
        title: "Crochet",
        userid: "->users.homer"
      },
      craftThree: {
        title: "Spinning",
        userid: "->users.homer"
      },
      craftFour: {
        title: "Painting",
        userid: "->users.marge"
      },
      craftFive: {
        title: "Sewing",
        userid: "->users.marge"
      }
    },
    spots: {
      _model: "Spot",
      spotOne : {
        placeName: "Winnies Craft Cafe",
        lat: 22.23,
        lng: -7.12,
        description: "A very lovely shop and cafe",
        category: "Shop",
        craftid: "->crafts.craftOne"
      },
      spotTwo : {
        placeName: "The Knitting Room",
        lat: 53.36,
        lng: -6.27,
        description: "Great service and great range of colours",
        category: "Shop",
        craftid: "->crafts.craftOne"
      },
      spotThree: {
        placeName: "The National Gallery",
        lat: 53.34,
        lng: -6.25,
        description: "Really interesting and beautiful exhibitions",
        category: "Exhibition",
        craftid: "->crafts.craftFour"
      },
      spotFour: {
        placeName: "Cahills Tramore",
        lat: 52.16,
        lng: -7.15,
        description: "Massive range of craft supplies.",
        category: "Shop",
        craftid: "->crafts.craftTwo"
      },
      spotFive: {
        placeName: "Singer Sewing Centre",
        lat: 52.25,
        lng: -7.11,
        description: "A place to buy sewing machines and other supplies",
        category: "Shop",
        craftid: "->crafts.craftFive"
      },
      spotSix: {
        placeName: "Bantry Yarns",
        lat: 51.67,
        lng: -9.45,
        description: "A cosy little yarn shop",
        category: "Shop",
        craftid: "->crafts.craftThree"
      },
    }
  };