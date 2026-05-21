# 365 Days

A shared memory app for students, friends, and family. Each week, pod members anonymously submit 1-5 photos and moments from their week. Then everyone tries to guess who submitted what.

Built to capture the little moments and a year worth remembering, one week--one memory--at a time.

## What Is This?

365 Days is a private web app for close friends or family to document their time together. Every week, each person can anonymously submit 1-5 photos and/or short entries. At the end of the week, the pod plays a guessing game: whose week was whose?

Think of it as a weekly time capsule meets Jackbox, where you are the stars. At the end of a year, you have a full record of everyone's year, told through their words and photos.

### The Weekly Cycle

| Day             | What Happens                                              |
| --------------- | --------------------------------------------------------- |
| Monday          | Submissions open                                          |
| Monday-Saturday | Pod members submit anonymous photos + entries             |
| Sunday          | Submissions unlock, guessing begins                       |
| Sunday+         | Submissions are archived to the pod's browseable timeline |

### Pods

Friends or family sign up together and form a pod. Submissions, guesses, the archive--everything--is private to the pod. A user can belong to multiple pods.

### Guessing Game

On reveal day, the pod can play in two modes.

**Async mode** (available now) Each person guesses independently on their own time before the reveal. Scores are tallies automatically when the reveal window closes. Good for when lives get busy.

**Sync mode** (coming soon) Everyone joins a live Jackbox-style session. Entries are shown one at a time, everyone guesses simultaneously, and answers are revealed in real time with live scoring.

### Scoring

- Correct guess -> points awarded (decreasing points over time in **Sync mode**)
- Sole correct guesser -> bonus points awarded
- Leaderboard tracked across weeks, month, and the full year

## Architecture

```
365Days/
├── .devcontainer/
│ └── devcontainer.json # VS Code devcontainer config
├── app/ # Next.js application
│ ├── src/ # Application source
│ ├── public/ # Static assets
│ ├── Dockerfile # Multi-stage build (dev + prod)
│ └── .dockerignore
├── docker/
│ └── postgres/
│ └── init/ # SQL init scripts
├── .pre-commit-config.yaml # Pre-commit hook config
├── docker-compose.dev.yaml # Local development stack
```

### Services

| Service    | Description                  |
| ---------- | ---------------------------- |
| app        | Next.js frontend + API       |
| db         | PostgreSQL database          |
| minio      | S3-compatible object storage |
| minio-init | One-shot bucket initializer  |

### Tech Stack

| Layer         | Technology      |
| ------------- | --------------- |
| Framework     | Next.js 16      |
| Styling       | Tailwind CSS v4 |
| Database      | PostgreSQL 16   |
| Photo storage | MinIO           |
| Containers    | Docker          |

## Roadmap

- [ ] Authentication (sign up, login, invite to pod)
- [ ] Pod creation and management
- [ ] Weekly submission
- [ ] Hidden submissions until reveal day
- [ ] Async guessing game
- [ ] Points and leaderboard
- [ ] Browseable archive
- [ ] Live guessing game
- [ ] Monthly/year-end recap
- [ ] Highlight reel
- [ ] Push notifications for submission and guessing reminders

## A Personal Note

The idea for this project came to me the night before my friends' commencement. I was thinking back on all the time I had spent with them and all the memories we made. It was a very bittersweet moment for me; of course I was overjoyed at their success and accomplishments, but there was also a bit of feeling of loss. I wanted to create a way so that we could relive these memories that I so cherish, both in the moment and in review.

Writing this now, I stand 1 year away from my very own commencement. 52 Weeks. 365 days. 8,760 hours. 525,600 minutes. 31,536,000 seconds. And I want to cherish each and every moment of it, making memories with the people that I've come to love before one last big celebration all together.
