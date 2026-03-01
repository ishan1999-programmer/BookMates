require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const Post = require("../models/post.model");

const MONGO_URI = process.env.MONGO_URI;

const NUM_USERS = 50;
const POSTS_PER_USER = 20;

const indianFirstNames = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Rohan",
  "Arjun",
  "Kabir",
  "Ishaan",
  "Rahul",
  "Karan",
  "Vikram",
  "Priya",
  "Ananya",
  "Diya",
  "Meera",
  "Aisha",
  "Sneha",
  "Neha",
  "Pooja",
  "Sanya",
  "Aryan",
];

const indianLastNames = [
  "Sharma",
  "Verma",
  "Patel",
  "Singh",
  "Gupta",
  "Reddy",
  "Iyer",
  "Mehta",
  "Kapoor",
  "Malhotra",
  "Nair",
  "Joshi",
  "Chopra",
  "Bansal",
  "Agarwal",
];


const booksDataset = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genres: ["Fiction", "Philosophy"],
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genres: ["Fantasy"],
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genres: ["Thriller"],
  },
  {
    title: "The Immortals of Meluha",
    author: "Amish Tripathi",
    genres: ["Mythology", "Fantasy"],
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genres: ["Non-Fiction", "History"],
  },
  { title: "Atomic Habits", author: "James Clear", genres: ["Self-Help"] },
  {
    title: "The God of Small Things",
    author: "Arundhati Roy",
    genres: ["Literary Fiction"],
  },
  { title: "The White Tiger", author: "Aravind Adiga", genres: ["Fiction"] },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genres: ["Classic"] },
  { title: "1984", author: "George Orwell", genres: ["Dystopian", "Sci-Fi"] },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genres: ["Fantasy"] },
  { title: "The Kite Runner", author: "Khaled Hosseini", genres: ["Drama"] },
  { title: "Five Point Someone", author: "Chetan Bhagat", genres: ["Fiction"] },
  {
    title: "Train to Pakistan",
    author: "Khushwant Singh",
    genres: ["Historical Fiction"],
  },
];

const bioTemplates = [
  "Avid reader 📚 | Fiction lover | Coffee & books",
  "Currently reading 3 books at once 😅",
  "My weekend plan = Books & chai ☕",
  "Fantasy world > Real world",
  "Thriller addict 🔥",
  "Bookworm since childhood",
  "Reading makes everything better",
  "Always lost in a book somewhere",
  "Non-fiction enthusiast",
  "Trying to read 50 books this year",
  "Indian literature lover 🇮🇳",
];

const reviewTemplates = [
  "Absolutely loved the storytelling and character depth in this book.",
  "A gripping read from start to finish. Highly recommended.",
  "The pacing was excellent and the ending was very satisfying.",
  "One of the best books I've read this year.",
  "Beautifully written and emotionally powerful.",
  "A bit slow in parts but overall a solid and meaningful read.",
  "Couldn't put this book down once I started.",
  "An unforgettable reading experience.",
];



function generateRating() {
  const weights = [1, 2, 3, 4, 5];
  const probability = [0.05, 0.1, 0.2, 0.35, 0.3];
  const rand = Math.random();
  let sum = 0;

  for (let i = 0; i < weights.length; i++) {
    sum += probability[i];
    if (rand <= sum) return weights[i];
  }
  return 4;
}



async function seedDatabase() {
  try {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Seeding not allowed in production");
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Promise.all([User.deleteMany({}), Post.deleteMany({})]);

    console.log("🧹 Old data cleared");

    const hashedPassword = await bcrypt.hash("password123", 10);


    const usersData = [];

    for (let i = 0; i < NUM_USERS; i++) {
      const firstName =
        indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
      const lastName =
        indianLastNames[Math.floor(Math.random() * indianLastNames.length)];

      usersData.push({
        email: `user${i + 1}@test.com`,
        password: hashedPassword,
        fullname: `${firstName} ${lastName}`,
        username: `${firstName.toLowerCase()}_${i + 1}`,
        bio: bioTemplates[Math.floor(Math.random() * bioTemplates.length)],
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
        favGenres: [],
        followers: [],
        followings: [],
        followersCount: 0,
        followingsCount: 0,
        booksRead: [],
        booksReadCount: 0,
        isPrivate: false,
      });
    }

    const users = await User.insertMany(usersData);
    console.log("👤 50 Indian users created");

 

    const postsData = [];

    for (let user of users) {
      for (let i = 0; i < POSTS_PER_USER; i++) {
        const randomBook =
          booksDataset[Math.floor(Math.random() * booksDataset.length)];

        postsData.push({
          user: user._id,
          bookTitle: randomBook.title,
          bookAuthor: randomBook.author,
          bookGenres: randomBook.genres,
          bookRating: generateRating(),
          bookImage: `https://source.unsplash.com/400x600/?book`,
          bookReview:
            reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)],
          likesCount: 0,
          commentsCount: 0,
        });
      }
    }

    await Post.insertMany(postsData);
    console.log("📚 1000 book posts created");

    console.log("🎉 Seeding completed successfully!");
    console.log("Login with:");
    console.log("Email: user1@test.com");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seedDatabase();
