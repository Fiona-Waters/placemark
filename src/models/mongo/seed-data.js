export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "$2a$10$Mq4HinyfoIfo07SOJPTt1O6GgncmZEAMqiEmx2NWfo7c4/n6VAtXa",
        permission: "ADMIN"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "$2a$10$p/XFNYgO46BqvYvYJtRRC.GhtQ3.beidqoDvs/56aRfLfH7sv2ZSu",
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "$2a$10$3Gqh1GZiU05ytA.9SPMQ7OuSQq0/1AbFYRGQFrm4Que3p4zg3PZHa"
      },
      lisa: {
        firstName: "Lisa",
        lastName: "Simpson",
        email: "lisa@simpson.com",
        password: "$2a$10$h22ON5uIXuU7X34d2wqdy.iAM/spCaWpXnhWd3w6MVAzrIpxF66Om"
      },
      maggie: {
        firstName: "Maggie",
        lastName: "Simpson",
        email: "maggie@simpson.com",
        password: "$2a$10$gnASaKAxQ2c8bxB1qsIsk.fC23GNNK4CutKG9r5uoDxYosJpJ7Dyq"
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
        img: "https://res.cloudinary.com/dbtrpapl8/image/upload/v1648157486/eufpbeabgkfdsugpxk0d.jpg",
        imgid: "eufpbeabgkfdsugpxk0d",
        userid: "->users.homer"
      },
      craftThree: {
        title: "Spinning",
        img: "https://res.cloudinary.com/dbtrpapl8/image/upload/v1648157574/fttphzsoflkvtba2rxzh.jpg",
        imgid: "fttphzsoflkvtba2rxzh",
        userid: "->users.homer"
      },
      craftFour: {
        title: "Painting",
        userid: "->users.marge"
      },
      craftFive: {
        title: "Sewing",
        userid: "->users.marge"
      },
      craftSix: {
        title: "Embroidery",
        userid: "->users.lisa"
      },
      craftSeven: {
        title: "Ceramics",
        userid: "->users.lisa"
      },
      craftEight: {
        title: "Paper Crafts",
        userid: "->users.maggie"
      },
      craftNine: {
        title: "Woodworking",
        userid: "->users.marge"
      },
      craftTen: {
        title: "Jewellery Making",
        userid: "->users.bart"
      }
    },
    spots: {
      _model: "Spot",
      spotOne : {
        placeName: "Winnies Craft Cafe",
        lat: 53.31,
        lng: -6.20,
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
        category: "Knit Night",
        craftid: "->crafts.craftThree"
      },
      spotSeven: {
        placeName: "Lighthouse Yarns",
        lat: 54.75,
        lng: -5.71,
        description: "Lovely place for wool lovers",
        category: "Shop",
        craftid: "->crafts.craftTwo"
      },
      spotEight: {
        placeName: "Donegal Yarns",
        lat: 54.77,
        lng: -8.61,
        description: "A really excellent company",
        category: "Other",
        craftid: "->crafts.craftThree"

      },
      spotNine: {
        placeName: "Arts & Crafts",
        lat: 52.67,
        lng: -6.60,
        description: "Staff here were very helpful and they had exactly what I needed",
        category: "Shop",
        craftid: "->crafts.craftFour"

      },
      spotTen: {
        placeName: "The Sewing Shop",
        lat: 53.64,
        lng: -7.69,
        description: "Great value and products!",
        category: "Shop",
        craftid: "->crafts.craftFive"
      },
      spotEleven: {
        placeName: "Needles 'n' Pins",
        lat: 52.50,
        lng: -7.05,
        description: "Lovely selection",
        category: "Shop",
        craftid: "->crafts.craftSix"
      },
      spotTwelve: {
        placeName: "Sew Irish",
        lat: 53.10,
        lng: -9.47,
        description: "Superb service and great selection",
        category: "Shop",
        craftid: "->crafts.craftSix"
      },
      spotThirteen: {
        placeName: "Vivien O'Malley Ceramics",
        lat: 52.20,
        lng: -7.25,
        description: "Weekly pottery classes",
        category: "Class",
        craftid: "->crafts.craftSeven"
      },
      spotFourteen: {
        placeName: "Ballyhoura Ceramics",
        lat: 52.57,
        lng: -8.52,
        description: "More pottery classes",
        category: "Class",
        craftid: "->crafts.craftSeven"
      },
      spotFifteen: {
        placeName: "Vibes and Scribes Crafts",
        lat: 51.95,
        lng: -8.46,
        description: "Large shop with lots of supplies for different crafts",
        category: "Shop",
        craftid: "->crafts.craftEight"
      },
      spotSixteen: {
        placeName: "PaperCraft Show",
        lat: 53.32,
        lng: -6.23,
        description: "So many fabulous stalls and demonstrations",
        category: "Festival",
        craftid: "->crafts.craftEight"
      },
      spotSeventeen: {
        placeName: "Michael Carroll Woodworking",
        lat: 52.44,
        lng: -7.67,
        description: "Bespoke furniture and traditional joinery",
        category: "Other",
        craftid: "->crafts.craftNine"
      },
      spotEighteen: {
        placeName: "Glenn Lucas Woodturning Centre",
        lat: 52.75,
        lng: -6.87,
        description: "Woodturning Courses",
        category: "Class",
        craftid: "->crafts.craftNine"
      },
      spotNineteen: {
        placeName: "Designworks Studio",
        lat: 51.97,
        lng: -8.49,
        description: "Bespoke Jewellery",
        category: "Other",
        craftid: "->crafts.craftTen"
      },
      spotTwenty: {
        placeName: "Bead Happy",
        lat: 52.77,
        lng: -6.87,
        description: "So many fab beads!",
        category: "Shop",
        craftid: "->crafts.craftTen"
      }
    }
  };