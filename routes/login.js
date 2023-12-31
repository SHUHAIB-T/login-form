const express = require("express");
const session = require("express-session");
const router = express.Router();

const users = [
  {
    id: "user1",
    name: "SHUHAIB T U",
    email: "shuhaibtu79@gmail.com",
    password: "123456",
    profile:
      "https://media.licdn.com/dms/image/D5603AQEuyc8t5uJJEQ/profile-displayphoto-shrink_800_800/0/1690872740771?e=1697068800&v=beta&t=n56v-_KcH20gx27OZAsaihvcLrIGz08S1_MqLsAMWeo",
    blogs: [
      {
        title: "Healthy Snacking",
        img: "https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg?cs=srgb&dl=pexels-lisa-fotios-1161682.jpg&fm=jpg",
        content:
          "Discover easy-to-make, nutritious snacks that satisfy cravings without compromising your health. From crunchy carrot sticks to creamy yogurt parfaits, these simple treats keep you energized and focused throughout the day.",
      },
      {
        title: "Mindful Breathing",
        img: "https://havingtime.com/wp-content/uploads/2020/04/How-to-Breathe-During-Meditation.jpeg",
        content:
          "Learn the art of deep breathing to reduce stress and improve mental clarity. Inhale slowly through your nose, feeling your lungs expand, then exhale through your mouth, releasing tension and promoting a sense of calm.",
      },
      {
        title: "Exploring Space",
        img: "https://media.istockphoto.com/id/1131418344/photo/space-shuttle-in-the-rays-of-sun.jpg?s=612x612&w=0&k=20&c=sWDbIkxaV4-0Ou8cgUJa6a06bcF78hkJ5GvL8WZmJr4=",
        content:
          "Embark on a journey through our universe, as we unravel the mysteries of planets, stars, and galaxies. From the fiery surface of the sun to the icy rings of Saturn, space holds endless wonders waiting to be explored.",
      },
      {
        title: "DIY Home Garden",
        img: "https://media.architecturaldigest.com/photos/626aa4cad5fdbb37ac3ced0d/16:9/w_2560%2Cc_limit/16%2520Backyard%2520Vegetable%2520Garden%2520Ideas.jpg",
        content:
          "Transform your living space with a DIY garden! Gather a few pots, some soil, and your favorite seeds or seedlings. With a little water, sunlight, and care, you'll watch your mini garden bloom and bring life to your home.",
      },
      {
        title: "Art of Recycling",
        img: "https://t3.ftcdn.net/jpg/02/80/67/88/360_F_280678868_KEmif80ULYsFxnpq0S3R5D8YTVIkG4eQ.jpg",
        content:
          " Give new life to old items through creative recycling. Turn glass jars into charming candle holders or transform cardboard boxes into stylish storage solutions. Embrace your inner artist while helping the environment.",
      },
    ],
  },
  {
    id: "user2",
    name: "IZAM MUHAMMAD ",
    email: "hisham@gmail.com",
    password: "654321",
    profile:
      "https://media.licdn.com/dms/image/D5603AQF3TtGCvpJljA/profile-displayphoto-shrink_800_800/0/1674743064936?e=1697068800&v=beta&t=v_2_pL1Q9acd6snGOYHDnzrUL3qBmcWrGwWnl4pYOJ0",
    blogs: [
      {
        title: "World Cuisine at Home",
        img: "https://fouraroundtheworld.com/wp-content/uploads/2020/04/Traditional-recipes-from-around-the-world-to-make-at-home-1.jpg",
        content:
          " Embark on a culinary adventure by trying your hand at dishes from around the world. Whip up a savory Italian pasta, a spicy Thai curry, or a classic American burger in your own kitchen. Let your taste buds explore!",
      },
      {
        title: "Daily Nature Connection",
        img: "https://img.freepik.com/free-photo/nature-landscape-with-hand-holding-frame_23-2149389964.jpg?w=360",
        content:
          " Step outside and immerse yourself in the beauty of nature. Take a leisurely walk, feel the grass beneath your feet, and listen to the soothing sounds of birdsong. Reconnect with the Earth and find serenity in its embrace.",
      },
      {
        title: "The Power of Kindness",
        img: "https://www.happiness.com/community/uploads/monthly_2019_01/benefits-of-kindness-help-others.jpg.9080028578993eea58ef74b347affa03.jpg",
        content:
          " Spread positivity through small acts of kindness. Hold the door open, offer a genuine compliment, or lend a helping hand to someone in need. These simple gestures create ripples of joy and make the world a better place.",
      },
      {
        title: "Thrifty Fashion Finds",
        img: "https://wherecalgary.ca/wp-content/uploads/2023/05/Thrift-Store-1875x1250.jpg",
        content:
          " Unearth stylish treasures at thrift stores and second-hand shops. From vintage dresses to unique accessories, you can curate a fashionable wardrobe without breaking the bank. Sustainable fashion never looked so good!",
      },
      {
        title: "Embracing Change",
        img: "https://media.licdn.com/dms/image/C4E12AQGfj7sy8AQ83g/article-cover_image-shrink_600_2000/0/1554735341601?e=2147483647&v=beta&t=jLiy51IXM7IRVySaFH6MUygvvzBH7upPmTB7yuaZSrE",
        content:
          "Life is a journey of constant change. Embrace new experiences, challenges, and opportunities with an open heart and a positive mindset. Each twist and turn adds depth to your story and helps you grow into your best self.",
      },
    ],
  },
];
/* GET home page. */
router.get("/", (req, res) => {
  if (req.session.user?.loggedin) {
    let userData = users.find((x) => x.id === req.session.user.id);
    res.render("home", { userData });
  } else {
    res.redirect("/login");
  }
});
router.get("/login", function (req, res) {
  if (req.session.user?.loggedin) {
    res.redirect("/");
  } else {
    res.render("login", { err: req.session.err });
    delete req.session.err;
  }
});

router.post("/login", function (req, res) {
  let { Email, Password } = req.body;
  let user = users.find((x) => x.email === Email && x.password === Password);
  if (user) {
    req.session.user = {
      id: user.id,
      loggedin: true,
    };
    res.redirect("/");
  } else {
    req.session.err = "Invalid Email or Password!";
    res.redirect("/login");
  }
});

router.get("/logout", (req, res) => {
  delete req.session.user;
  res.redirect("/login");
});

module.exports = router;