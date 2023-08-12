const express = require("express");
const session = require("express-session");
const router = express.Router();

const users = [
  {
    id: "user1",
    name: "SHUHAIB T U",
    email: "shuhaibtu79@gmail.com",
    password: "123456",
    profile: "https://media.licdn.com/dms/image/D5603AQEuyc8t5uJJEQ/profile-displayphoto-shrink_800_800/0/1690872740771?e=1697068800&v=beta&t=n56v-_KcH20gx27OZAsaihvcLrIGz08S1_MqLsAMWeo",
    blogs:[
      {
        title:"Healthy Snacking" ,
        content: "Discover easy-to-make, nutritious snacks that satisfy cravings without compromising your health. From crunchy carrot sticks to creamy yogurt parfaits, these simple treats keep you energized and focused throughout the day."
      },
      {
        title: "Mindful Breathing",
        content: "Learn the art of deep breathing to reduce stress and improve mental clarity. Inhale slowly through your nose, feeling your lungs expand, then exhale through your mouth, releasing tension and promoting a sense of calm."
      },
      {
        title:"Exploring Space",
        content: "Embark on a journey through our universe, as we unravel the mysteries of planets, stars, and galaxies. From the fiery surface of the sun to the icy rings of Saturn, space holds endless wonders waiting to be explored."
      },
      {
        title:"DIY Home Garden",
        content: "Transform your living space with a DIY garden! Gather a few pots, some soil, and your favorite seeds or seedlings. With a little water, sunlight, and care, you'll watch your mini garden bloom and bring life to your home."
      },
      {
        title: "Art of Recycling",
        content: " Give new life to old items through creative recycling. Turn glass jars into charming candle holders or transform cardboard boxes into stylish storage solutions. Embrace your inner artist while helping the environment."
      }
    ]
  },
  {
    id: "user2",
    name: "Hisham",
    email: "hisham@gmail.com",
    password: "12345",
    profile: "https://media.licdn.com/dms/image/D5603AQF3TtGCvpJljA/profile-displayphoto-shrink_800_800/0/1674743064936?e=1697068800&v=beta&t=v_2_pL1Q9acd6snGOYHDnzrUL3qBmcWrGwWnl4pYOJ0",
    blogs:[
      {
        title: "World Cuisine at Home",
        content: " Embark on a culinary adventure by trying your hand at dishes from around the world. Whip up a savory Italian pasta, a spicy Thai curry, or a classic American burger in your own kitchen. Let your taste buds explore!"
      },
      {
        title: "Daily Nature Connection",
        content: " Step outside and immerse yourself in the beauty of nature. Take a leisurely walk, feel the grass beneath your feet, and listen to the soothing sounds of birdsong. Reconnect with the Earth and find serenity in its embrace."
      },
      {
        title: "The Power of Kindness",
        content: " Spread positivity through small acts of kindness. Hold the door open, offer a genuine compliment, or lend a helping hand to someone in need. These simple gestures create ripples of joy and make the world a better place."
      },
      {
        title: "Thrifty Fashion Finds",
        content: " Unearth stylish treasures at thrift stores and second-hand shops. From vintage dresses to unique accessories, you can curate a fashionable wardrobe without breaking the bank. Sustainable fashion never looked so good!"
      },
      {
        title: "Embracing Change",
        content: "Life is a journey of constant change. Embrace new experiences, challenges, and opportunities with an open heart and a positive mindset. Each twist and turn adds depth to your story and helps you grow into your best self."
      }
    ]
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
  let user = users.find(
    (x) => x.email === Email && users.find((x) => x.password === Password)
  );
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
