export interface SeedArticle {
  title: string;
  excerpt: string;
  fullContent: string;
  category: string;
  readTimeMinutes: number;
  publishDate: string;
  author: string;
  authorBio: string;
  image: string;
  views: number;
  featured: boolean;
  tags: string[];
}

export const seedArticles: SeedArticle[] = [
  {
    title: "The Sicilian Defense: Understanding the Dragon Variation",
    excerpt:
      "Dive deep into one of chess's most aggressive responses to 1.e4. Learn the key ideas, typical pawn structures, and attacking plans for both sides in this complex opening.",
    fullContent:
      "The Sicilian Dragon is one of the most feared and respected variations in chess. Black fianchettoes the bishop on g7 and aims for a kingside attack while White often castles queenside and launches a pawn storm on the kingside.",
    category: "openings",
    readTimeMinutes: 12,
    publishDate: "2024-12-18",
    author: "GM Alex Thompson",
    authorBio: "Sicilian Defense specialist, author of 'Mastering the Dragon'",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/050/364/609/small/a-black-chess-piece-is-on-a-checkered-board-with-other-pieces-surrounding-it-concept-of-strategy-and-competition-as-the-king-is-the-most-important-piece-on-the-board-photo.jpg",
    views: 2341,
    featured: true,
    tags: ["sicilian", "dragon", "openings", "theory"],
  },
  {
    title: "The Art of the Greek Gift Sacrifice",
    excerpt:
      "Master one of chess's most beautiful tactical motifs. Learn when and how to sacrifice your bishop on h7 to launch a devastating attack against the castled king.",
    fullContent:
      "The Greek Gift sacrifice (Bxh7+) is one of chess's most classic and effective attacking patterns. When the conditions are right, this sacrifice can lead to a quick checkmate or a decisive material advantage.",
    category: "tactics",
    readTimeMinutes: 8,
    publishDate: "2024-12-15",
    author: "WGM Maria Rodriguez",
    authorBio: "Tactics trainer and attacking player",
    image: "https://i2.pickpik.com/photos/979/274/351/chess-chess-men-game-chess-pieces-thumb.jpg",
    views: 1876,
    featured: true,
    tags: ["tactics", "sacrifice", "attack", "greek-gift"],
  },
  {
    title: "Carlsen vs. Caruana 2018: The Battle of Endgame Precision",
    excerpt:
      "Analyze the legendary World Championship match where 12 consecutive draws were broken by Carlsen's endgame mastery in the rapid tiebreaks.",
    fullContent:
      "The 2018 World Chess Championship between Magnus Carlsen and Fabiano Caruana will be remembered as one of the most closely fought title matches in history, decided ultimately by rapid tiebreaks.",
    category: "analysis",
    readTimeMinutes: 15,
    publishDate: "2024-12-12",
    author: "GM David Chen",
    authorBio: "Chess analyst and commentator",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/054/645/248/small/chess-pieces-on-a-chess-board-with-a-white-king-photo.jpg",
    views: 3124,
    featured: true,
    tags: ["world-championship", "carlsen", "caruana", "endgame"],
  },
  {
    title: "Rook Endgames: The Lucena and Philidor Positions",
    excerpt:
      "Master two of the most fundamental rook endgame positions that every serious chess player must know. These positions occur frequently in practical play.",
    fullContent:
      "Rook endgames are the most common type of endgame in chess, and understanding the Lucena and Philidor positions is essential for every tournament player.",
    category: "endgames",
    readTimeMinutes: 10,
    publishDate: "2024-12-08",
    author: "IM Sarah Johnson",
    authorBio: "Endgame specialist and chess coach",
    image:
      "https://png.pngtree.com/thumb_back/fw800/background/20251009/pngtree-chess-in-the-daytime-board-and-pieces-game-room-photo-image_19809843.webp",
    views: 1654,
    featured: false,
    tags: ["endgames", "rook-endgames", "lucena", "philidor"],
  },
  {
    title: "The Queen's Gambit Declined: Main Lines and Plans",
    excerpt:
      "Explore one of the most solid and reliable responses to 1.d4. Learn the key strategic ideas and typical plans for both sides in this classical opening.",
    fullContent:
      "The Queen's Gambit Declined is a cornerstone of classical chess opening theory. Black accepts a slightly passive but very solid position in exchange for long-term strategic chances.",
    category: "openings",
    readTimeMinutes: 14,
    publishDate: "2024-12-05",
    author: "GM Robert Williams",
    authorBio: "1.d4 specialist and opening theoretician",
    image:
      "https://png.pngtree.com/thumb_back/fw800/background/20251009/pngtree-chess-in-the-daytime-board-and-pieces-game-room-photo-image_19809843.webp",
    views: 1987,
    featured: false,
    tags: ["queens-gambit", "openings", "strategy", "classical"],
  },
  {
    title: "Fischer vs. Spassky 1972: Game of the Century",
    excerpt:
      "Revisit the most famous chess match in history. Analyze the psychological warfare, brilliant moves, and historical context of this Cold War showdown.",
    fullContent:
      "The 1972 World Chess Championship in Reykjavik was more than just a chess match — it was a cultural phenomenon that brought chess to the forefront of global attention.",
    category: "analysis",
    readTimeMinutes: 18,
    publishDate: "2024-12-01",
    author: "GM Michael Brown",
    authorBio: "Chess historian and author",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/054/645/248/small/chess-pieces-on-a-chess-board-with-a-white-king-photo.jpg",
    views: 4231,
    featured: true,
    tags: ["fischer", "spassky", "world-championship", "history"],
  },
  {
    title: "Knight Outposts: Dominating the Board",
    excerpt:
      "Learn how to create and exploit knight outposts to gain a strategic advantage. A well-placed knight can be more powerful than a bishop in closed positions.",
    fullContent:
      "A knight outpost is a square where a knight cannot be attacked by enemy pawns and exerts maximum influence over the board.",
    category: "strategy",
    readTimeMinutes: 9,
    publishDate: "2024-11-28",
    author: "IM Jennifer Lee",
    authorBio: "Positional chess specialist and coach",
    image:
      "https://png.pngtree.com/thumb_back/fw800/background/20251009/pngtree-chess-in-the-daytime-board-and-pieces-game-room-photo-image_19809843.webp",
    views: 1456,
    featured: false,
    tags: ["strategy", "knights", "outposts", "positional"],
  },
  {
    title: "The Power of Pawn Breaks",
    excerpt:
      "Discover how timely pawn breaks can transform your position, open lines for your pieces, and create weaknesses in your opponent's camp.",
    fullContent:
      "Pawn breaks are strategic pawn moves that change the nature of the position by opening files, diagonals, or creating new weaknesses.",
    category: "strategy",
    readTimeMinutes: 11,
    publishDate: "2024-11-25",
    author: "GM Daniel Martinez",
    authorBio: "Dynamic player known for aggressive pawn play",
    image: "https://i2.pickpik.com/photos/979/274/351/chess-chess-men-game-chess-pieces-thumb.jpg",
    views: 1678,
    featured: false,
    tags: ["strategy", "pawn-breaks", "middlegame", "planning"],
  },
  {
    title: "Anand's Immortal: Topalov vs. Anand 2010",
    excerpt:
      "Analyze one of Vishwanathan Anand's most brilliant attacking games from his World Championship match against Veselin Topalov.",
    fullContent:
      "Game 4 of the 2010 World Chess Championship between Vishwanathan Anand and Veselin Topalov featured one of the most spectacular attacking games in modern chess.",
    category: "analysis",
    readTimeMinutes: 13,
    publishDate: "2024-11-22",
    author: "GM Priya Sharma",
    authorBio: "Attacking chess specialist and commentator",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/054/645/248/small/chess-pieces-on-a-chess-board-with-a-white-king-photo.jpg",
    views: 2876,
    featured: false,
    tags: ["anand", "topalov", "attack", "world-championship"],
  },
  {
    title: "Bishop Pair: How to Exploit the Advantage",
    excerpt:
      "Learn how to maximize the power of having two bishops against bishop and knight or two knights. The bishop pair is a long-term advantage that can be decisive.",
    fullContent:
      "The bishop pair is one of the most important strategic advantages in chess, especially in open positions with play on both flanks.",
    category: "strategy",
    readTimeMinutes: 10,
    publishDate: "2024-11-18",
    author: "GM Thomas Wilson",
    authorBio: "Strategic player known for endgame technique",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/068/353/570/small/a-chessboard-with-black-and-white-chess-pieces-arranged-in-a-strategic-configuthe-arrangement-of-the-pieces-suggests-a-strategic-game-position-with-the-kings-facing-each-other-in-the-middle-photo.jpg",
    views: 1543,
    featured: false,
    tags: ["strategy", "bishop-pair", "advantage", "endgame"],
  },
  {
    title: "The King's Indian Attack: A Universal System for White",
    excerpt:
      "Master this flexible system that can be played against virtually any black setup. Perfect for players who want a reliable weapon without massive theory.",
    fullContent:
      "The King's Indian Attack (KIA) is a system-based approach for White that focuses on piece development and kingside attacking chances.",
    category: "openings",
    readTimeMinutes: 12,
    publishDate: "2024-11-15",
    author: "GM Christopher Davis",
    authorBio: "System openings specialist and coach",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/050/364/609/small/a-black-chess-piece-is-on-a-checkered-board-with-other-pieces-surrounding-it-concept-of-strategy-and-competition-as-the-king-is-the-most-important-piece-on-the-board-photo.jpg",
    views: 1765,
    featured: false,
    tags: ["kings-indian", "openings", "system", "fischer"],
  },
  {
    title: "Zwischenzug: The In-Between Move",
    excerpt:
      "Master the art of the intermediate move - a tactical resource that can turn the tables in complex positions by changing the move order.",
    fullContent:
      "A Zwischenzug (German for in-between move) is a tactical resource where you insert an unexpected move before continuing your main plan.",
    category: "tactics",
    readTimeMinutes: 8,
    publishDate: "2024-11-12",
    author: "WGM Lisa Chen",
    authorBio: "Tactics trainer and puzzle creator",
    image: "https://www.shutterstock.com/image-photo/chess-piece-womans-hand-on-600nw-2463856077.jpg",
    views: 1987,
    featured: false,
    tags: ["tactics", "zwischenzug", "intermediate", "calculation"],
  },
  {
    title: "Kasparov's Immortal: The Game That Redefined Chess",
    excerpt:
      "Analyze Garry Kasparov's breathtaking victory over Veselin Topalov in 1999, considered by many to be the greatest chess game ever played.",
    fullContent:
      "The 1999 game between Garry Kasparov and Veselin Topalov in Wijk aan Zee is widely regarded as one of the greatest chess games ever played.",
    category: "analysis",
    readTimeMinutes: 16,
    publishDate: "2024-11-08",
    author: "GM Richard Taylor",
    authorBio: "Chess historian and Kasparov expert",
    image: "https://atlas-content-cdn.pixelsquid.com/assets_v2/230/2304478333074674991/jpeg-600/G03.jpg",
    views: 5123,
    featured: true,
    tags: ["kasparov", "topalov", "immortal", "combination"],
  },
  {
    title: "Pawn Endgames: Key Principles and Must-Know Positions",
    excerpt:
      "Master the fundamentals of pawn endgames. Learn the critical positions that every tournament player should know by heart.",
    fullContent:
      "Pawn endgames are the most basic yet most important type of endgame. Mastering opposition, triangulation, and key squares is essential.",
    category: "endgames",
    readTimeMinutes: 11,
    publishDate: "2024-11-05",
    author: "GM Andrew Clark",
    authorBio: "Endgame specialist and author of 'Endgame Manual'",
    image:
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hlc3N8ZW58MHx8MHx8fDA%3D",
    views: 1432,
    featured: false,
    tags: ["endgames", "pawn-endgames", "opposition", "fundamentals"],
  },
  {
    title: "The Traxler Counterattack: A Bold Response to the Fried Liver",
    excerpt:
      "Learn this aggressive countergambit in the Two Knights Defense that turns the tables on White's ambitious attack.",
    fullContent:
      "The Traxler (or Wilkes-Barre) Variation is one of the most exciting and dangerous responses to the Fried Liver Attack in the Two Knights Defense.",
    category: "openings",
    readTimeMinutes: 9,
    publishDate: "2024-11-01",
    author: "GM Kevin Johnson",
    authorBio: "Sharp openings specialist and tactician",
    image: "https://www.shutterstock.com/image-photo/chess-piece-womans-hand-on-600nw-2463856077.jpg",
    views: 1876,
    featured: false,
    tags: ["traxler", "two-knights", "counterattack", "tactics"],
  },
];

export const seedCategories = [
  { name: "Openings", slug: "openings" },
  { name: "Tactics", slug: "tactics" },
  { name: "Strategy", slug: "strategy" },
  { name: "Analysis", slug: "analysis" },
  { name: "Endgames", slug: "endgames" },
  { name: "Training", slug: "training" },
  { name: "Psychology", slug: "psychology" },
];
