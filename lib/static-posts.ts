export interface StaticPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  readTimeMinutes: number;
  featuredImageUrl: string;
  featuredImageAlt: string;
  metaTitle: string;
  metaDescription: string;
  commentCount: number;
  categories: { name: string; slug: string }[];
  authors: { name: string; slug: string; bio?: string }[];
}

export const staticPosts: StaticPost[] = [
  {
    id: "1",
    slug: "beginner-opening-guide",
    title: "The Ultimate Chess Opening Guide for Beginners",
    excerpt: "Learn the core opening principles that FIDE rated mentors recommend to build logic and secure control of the board from your very first moves.",
    contentHtml: `
      <p>Every grandmaster was once a beginner, and every great game begins with a single step. For beginner chess players, the opening phase can feel overwhelming due to the sheer number of options. However, successful openings do not rely on memorizing endless move paths. Instead, they rely on understanding key strategic principles.</p>
      
      <h2>1. Control the Center of the Board</h2>
      <p>The squares e4, d4, e5, and d5 form the center of the board. Controlling these squares allows your pieces to move freely while restricting your opponent's activity. Standard opening moves like 1.e4 or 1.d4 are excellent because they immediately stake a claim in the center.</p>
      
      <h2>2. Rapidly Develop Your Pieces</h2>
      <p>In the opening, you must bring your minor pieces (Knights and Bishops) into active play as quickly as possible. Avoid moving the same piece multiple times. Instead, aim to develop a new piece with each move to build positional strength.</p>
      
      <h2>3. Prioritize King Safety</h2>
      <p>Getting your King to safety is paramount. Castling is the most efficient way to protect your King while simultaneously bringing your Rook into the game. Try to castle within the first 10 moves of the game.</p>
      
      <h2>4. Avoid Bringing the Queen Out Too Early</h2>
      <p>Because the Queen is your most powerful piece, bringing her out early makes her a target. Your opponent can develop their pieces while making threats against your Queen, forcing you to waste time moving her to safety.</p>
    `,
    publishedAt: "2026-07-01T12:00:00Z",
    readTimeMinutes: 5,
    featuredImageUrl: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800",
    featuredImageAlt: "Chess pieces on board",
    metaTitle: "Chess Opening Guide for Beginners | KPR Chess Academy",
    metaDescription: "Master the fundamental opening guidelines for beginners to control the board and win more games.",
    commentCount: 0,
    categories: [{ name: "Beginner", slug: "beginner" }],
    authors: [{ name: "TV Kumar", slug: "tv-kumar", bio: "Founder and Chief Mentor at KPR Chess Academy, FIDE Rated Chess Expert." }]
  },
  {
    id: "2",
    slug: "mastering-positional-play",
    title: "Mastering Positional Play & Pawn Structures",
    excerpt: "Understand pawn structures, open files, and piece activity to formulate long-term positional advantages in your intermediate games.",
    contentHtml: `
      <p>Once you understand the basic rules and tactical patterns, the next step toward chess mastery is positional understanding. Unlike tactics, which involve short-term winning combinations, positional play is about long-term strategy and improving the placement of your pieces.</p>
      
      <h2>1. The Importance of Pawn Structures</h2>
      <p>Pawns are the skeleton of the chess position. They determine where the open files are and which squares are weak. Learn to avoid doubling your pawns, creating isolated pawns, or creating backward pawns, as these weaknesses can be targeted in the endgame.</p>
      
      <h2>2. Control Open Files with Your Rooks</h2>
      <p>Rooks need open lines to be effective. Placing your Rooks on open or semi-open files allows them to penetrate the opponent's position and control critical horizontal ranks.</p>
      
      <h2>3. Identify Weak Squares and Outposts</h2>
      <p>A weak square is a square that can no longer be defended by a pawn. If you can place a Knight on a weak square in your opponent's territory (known as an outpost), it becomes a powerful piece that is extremely difficult to dislodge.</p>
    `,
    publishedAt: "2026-07-10T12:00:00Z",
    readTimeMinutes: 6,
    featuredImageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800",
    featuredImageAlt: "Chess game strategy",
    metaTitle: "Mastering Positional Chess | KPR Chess Academy",
    metaDescription: "Learn to build positional plans and understand pawn structures like an intermediate chess player.",
    commentCount: 0,
    categories: [{ name: "Intermediate", slug: "intermediate" }],
    authors: [{ name: "Alexander Kumar", slug: "alexander-kumar", bio: "Senior FIDE Trainer at KPR Chess Academy." }]
  },
  {
    id: "3",
    slug: "calculate-tactics-like-a-pro",
    title: "How to Calculate Chess Tactics Like a Pro",
    excerpt: "A structured calculation methodology designed to eliminate blunders, speed up visualization, and help you find winning combinations.",
    contentHtml: `
      <p>Tactics win games. No matter how strategic your position is, a single tactical oversight can lose the game instantly. Improving your calculation ability requires a systematic approach to analyzing options.</p>
      
      <h2>1. Look for Checks, Captures, and Threats</h2>
      <p>When calculating, always look at the most forcing moves first: Checks, Captures, and Direct Threats (often called CCT). Forcing moves limit your opponent's choices, making them easier to calculate accurately.</p>
      
      <h2>2. Candidate Moves</h2>
      <p>Before diving into a long variation, identify 2-3 'candidate moves' that look promising. Calculate each candidate move systematically rather than jumping randomly between different ideas.</p>
      
      <h2>3. Tactical Pattern Recognition</h2>
      <p>The secret to fast calculation is pattern recognition. By solving daily puzzles involving forks, pins, skewers, and discoveries, your brain learns to spot these opportunities automatically during real games.</p>
    `,
    publishedAt: "2026-07-15T12:00:00Z",
    readTimeMinutes: 4,
    featuredImageUrl: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=800",
    featuredImageAlt: "Chess analysis",
    metaTitle: "Calculating Chess Tactics Like a Pro | KPR Chess Academy",
    metaDescription: "Step-by-step methods to calculate variations and recognize tactical patterns in competitive chess.",
    commentCount: 0,
    categories: [{ name: "Advanced", slug: "advanced" }],
    authors: [{ name: "Sarah Watson", slug: "sarah-watson", bio: "International Chess Coach specializing in tactical training." }]
  }
];

export const staticCategories = [
  { slug: "all", name: "All Articles", count: 3 },
  { slug: "beginner", name: "Beginner", count: 1 },
  { slug: "intermediate", name: "Intermediate", count: 1 },
  { slug: "advanced", name: "Advanced", count: 1 }
];
