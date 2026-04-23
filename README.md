# BookMates — Social Platform for Book Readers

🌐 Live: https://bookmates.xyz  

---

## Overview

BookMates is a full-stack social platform designed for book enthusiasts to track their reading journey, share reviews, and interact with other readers.

The platform enables users to:
- 📚 Share book reviews and ratings  
- 👥 Follow other readers (public/private profiles)  
- ❤️ Like and 💬 comment on posts  
- 🔔 Receive notifications  
- 📖 Track reading progress (Read / Reading / Want to Read)  
- 🔍 Discover books and users  

The system is built with a focus on **scalability, performance, and real-world workflows**.

---

## Key Features

### 👤 Authentication & Authorization
- Email/password authentication  
- Google OAuth login  
- JWT-based session management  
- Account linking (Google + normal signup)  
- Protected routes (frontend + backend)  

---

### 📰 Feed System
- Personalized feed (**self + following users**)  
- Cursor-based pagination using `createdAt + _id`  
- Infinite scrolling with `hasMore` flag  
- Fetches 20 posts per request  

---

### ❤️ Likes & 💬 Comments
- Separate collections for likes and comments  
- Duplicate likes prevented  
- Optimistic UI updates  
- Lazy-loaded and paginated comments  

---

### 🔔 Notifications
- Separate notification collection  
- Triggered on likes, comments, follow requests  
- Read/unread tracking with count  

---

### 👥 Follow System
- Public → direct follow  
- Private → follow request (accept/reject)  
- Followers & followings stored in user  
- Consistency via `$addToSet` and `$pull`  

---

### 🔍 Search
**User Search**
- Debounced input  
- AbortController to cancel stale requests  

**Book Search**
- Google Books API integration  
- Debounced API calls  

---

### 📖 Reading Tracker
- Separate `Read` collection  
- Status: Read / Reading / Want to Read  
- Progress tracking  
- Optimistic updates  

---

### 📝 Post Creation
- Fields: title, author, genres, rating, review, cover image  
- Image upload via AWS S3  
- Loader during upload  

---

### ⚙️ Profile & Settings
- Update avatar, bio, genres, password  
- Toggle public/private profile  
- Account deletion with password verification  

---

## Key Engineering Decisions

### 1. Cursor-Based Pagination
- Used `createdAt + _id` instead of offset  
- Ensures consistent ordering  
- Avoids duplicates/missing data  
- Scales better with large datasets  

---

### 2. Normalized Database Design
Separate collections for:
- likes  
- comments  
- follow requests  
- notifications  
- reading tracking  

Benefits:
- scalability  
- reduced duplication  
- independent querying  

---

### 3. Denormalized Counters
Stored:
- `likesCount`  
- `commentsCount`  
- `followersCount`  

Updated using:$inc

---

### 4. Optimistic UI Updates
Used in:
- likes  
- post creation  
- reading status  

Flow:
1. Update UI instantly  
2. Call API  
3. Rollback on failure  

---

### 5. Lazy Loading
- Comments fetched only when needed  
- Reduces initial load time  
- Minimizes API calls  

---

### 6. Debounced Search + AbortController
- Prevents excessive API calls  
- Cancels outdated requests  
- Avoids race conditions  

---

### 7. Robust Error Handling
- Feature-specific error messages  
- All edge cases handled  
- No generic responses  

---

## Performance Optimizations

- Cursor-based pagination  
- Lazy loading (comments)  
- Debounced search  
- Optimistic updates  
- Skeleton loaders  
- Efficient MongoDB queries  

---

## Authentication Flow

- JWT stored in local storage  
- Sent with each request  
- Verified via backend middleware  

### Google OAuth:
- New user creation  
- Account linking  
- Login restrictions handled  

---

## Deployment

- **Frontend:** Vercel  
- **Backend:** AWS EC2  
- **Media Storage:** AWS S3  
- **Database:** MongoDB Atlas  
- **Domain:** https://bookmates.xyz  

---

## Data Seeding

- 50+ users  
- 1000+ posts  

Used for:
- testing feed scalability  
- simulating real usage  

---

## Future Improvements

- Real-time notifications (WebSockets)  
- Recommendation system
- Real-time chat system   

---

## Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- ShadCN UI  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB (Mongoose)  

### Cloud
- AWS EC2  
- AWS S3  
- Vercel  

---

## 🏁 Conclusion

BookMates is a **production-grade full-stack application** focused on:

- scalability  
- clean architecture  
- real-world workflows  
- performance optimization  

