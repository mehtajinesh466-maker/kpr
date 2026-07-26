"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import {
  Trophy,
  Users,
  Globe,
  Target,
  Award,
  BookOpen,
  Clock,
  Heart,
  CheckCircle,
  Play,
  ChevronDown,
  ChevronUp,
  Star,
  Quote,
  Phone,
  Mail,
  MapPin,
  Calendar,
  UsersIcon,
  GraduationCap,
  Brain,
  Shield,
  Zap,
  Crown,
  TrendingUp,
  School,
  Lightbulb,
  TargetIcon,
  Sparkles,
  Puzzle,
  Clock4,
  BrainCircuit,
  Gem,
  Medal,
  Gamepad,
  MessageCircle,
  X,
  Send,
  Bot,
  Mic,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  CalendarDays,
  User,
  ArrowRight,
  Clock3,
} from "lucide-react";
import { InteractiveChessBoard } from "@/components/InteractiveChessBoard";

// Add top-level heading for SEO
{/* Add a visible H1 heading for the homepage */}
<h1 className="text-4xl font-bold text-center my-8 text-gray-900">KPR Chess Academy</h1>
import { Hero } from "@/components/hero";
import { AboutUs } from "@/components/about";
import  CoursesSection  from "@/components/course";
import { Testimonials } from "@/components/testimonial";
import { CompactCTA } from "@/components/cta";
import { WhyChooseUs } from "@/components/whychoose";
import { Achievements } from "@/components/ach";
import { FAQ } from "@/components/faq";

// Enhanced AI Chatbot Component
function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean; timestamp: Date; id: string }>
  >([
    {
      text: "Hi there! This is your virtual Chess Assistant from KPR Chess Academy! How may I assist you?",
      isUser: false,
      timestamp: new Date(),
      id: "1",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Enhanced AI response generator
  const generateAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();

    // Course information
    if (
      message.includes("beginner") ||
      message.includes("start") ||
      message.includes("basic")
    ) {
      return {
        text: "Our **Beginner Program** is perfect for new players:\n\n• Learn chess fundamentals & rules\n• Basic tactics and strategies\n• Piece development principles\n• 2 classes per week (1 hour each)\n• Small groups (max 6 students)\n• Monthly progress assessments\n\nWould you like details about enrollment?",
        quickReplies: ["Enrollment Process", "Schedule Demo"],
      };
    }

    if (
      message.includes("intermediate") ||
      message.includes("advanced") ||
      message.includes("level")
    ) {
      return {
        text: "We offer **progressive programs**:\n\n**Intermediate Level**:\n• Advanced tactics & combinations\n• Opening principles\n• Middle game planning\n\n**Advanced Level**:\n• Tournament preparation\n• Endgame mastery\n• Positional understanding\n\nAll courses include personalized coaching and regular evaluations.",
        quickReplies: [
          "Coach Qualifications",
          "Success Stories",
          "Tournament Prep",
        ],
      };
    }

    if (
      message.includes("coach") ||
      message.includes("trainer") ||
      message.includes("teacher")
    ) {
      return {
        text: "Our coaching team includes:\n\n• **FIDE-rated coaches** (2000+ ELO)\n• **Certified chess instructors**\n• **State & National level players**\n• Average **8+ years** teaching experience\n• Specialized in child development through chess\n\nAll coaches undergo rigorous training in our teaching methodology.",
        quickReplies: ["Meet Our Coaches", "Teaching Method", "Success Rate"],
      };
    }

    if (
      message.includes("schedule") ||
      message.includes("time") ||
      message.includes("when")
    ) {
      return {
        text: "**Class Schedule**:\n\n**Weekdays**: 4 PM - 8 PM\n**Weekends**: 9 AM - 6 PM\n\n**Batch Timings**:\n• Morning: 9 AM - 12 PM\n• Afternoon: 4 PM - 6 PM\n• Evening: 6 PM - 8 PM\n\nWe offer flexible timing options and both online/offline classes. New batches start every month!",
        quickReplies: ["Book Demo", "Weekend Batches", "Online Classes"],
      };
    }

    if (
      message.includes("enroll") ||
      message.includes("join") ||
      message.includes("admission")
    ) {
      return {
        text: "**Enrollment Process**:\n\n1. **Free Demo Class** - Experience our teaching\n2. **Skill Assessment** - Determine right level\n3. **Batch Selection** - Choose convenient timing\n4. **Documentation** - Complete registration\n5. **Welcome Kit** - Get started!\n\nReady to begin your chess journey?",
        quickReplies: ["Book Demo Now", "Contact Number", "Location Details"],
      };
    }

    if (
      message.includes("location") ||
      message.includes("address") ||
      message.includes("where")
    ) {
      return {
        text: "**KPR Chess Academy Locations**:\n\n🏠 **Mylapore Center**:\nNear Amma Hotel, Alamelu Mangapuram, Chennai, Tamil Nadu\n\n🏠 **Branch**:\nNo-10, Balaji Dental Clinic, Rajesh Nagar, 4th Cross Street, Chennai, Tamil Nadu\n\n**Phone**: +91 99419 87881",
        quickReplies: ["Contact Number", "School Programs", "Online Classes"],
      };
    }

    // Default response
    return {
      text: "I'd be happy to help you with that! At KPR Chess Academy, we specialize in structured chess education with proven results. Could you tell me more about what you're looking for?\n\nYou can ask about:\n• Course details & levels\n• Coaching methodology\n• Fees & schedule\n• Enrollment process\n• Student achievements",
      quickReplies: ["Beginner Course", "Coach Info", "Location"],
    };
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
      id: Date.now().toString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsLoading(false);
      const aiResponse = generateAIResponse(inputMessage);

      const botMessage = {
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        id: (Date.now() + 1).toString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const suggestedQuestions = [
    "What are your beginner courses?",
    "Who are the coaches?",
    "What's the class schedule?",
    "How to enroll?",
  ];

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && !isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mb-4 w-80 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Chess Assistant</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Online • Ready to help
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-lg">−</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-blue-50/30">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className="flex flex-col max-w-[85%]">
                        <div
                          className={`rounded-2xl p-3 ${
                            message.isUser
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">
                            {message.text}
                          </p>
                        </div>
                        <div
                          className={`text-xs text-gray-500 mt-1 ${
                            message.isUser ? "text-right" : "text-left"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>

                        {/* Quick Replies for bot messages */}
                        {!message.isUser &&
                          message.id === messages[messages.length - 1].id && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {generateAIResponse("").quickReplies?.map(
                                (reply, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleQuickReply(reply)}
                                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors border border-blue-200"
                                  >
                                    {reply}
                                  </button>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Suggested Questions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-gray-500 mb-2">
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(question)}
                        className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about chess programs..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-blue-600 text-white rounded-xl p-3 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[44px]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Powered by KPR Chess Academy • Your chess journey starts here
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized Chat */}
        <AnimatePresence>
          {isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-4 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-semibold">Chess Assistant</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsMinimized(false)}
                    className="w-6 h-6 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-sm">□</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                We're here to help with your chess journey!
              </p>
              <button
                onClick={() => setIsMinimized(false)}
                className="w-full mt-2 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Chat
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Button - Only show when chat is NOT open */}
        {!isOpen && !isMinimized && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <MessageCircle className="w-6 h-6 text-white" />

            {/* Notification dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
            />
          </motion.button>
        )}
      </div>
    </>
  );
}

// Blog Preview Section Component
function BlogPreviewSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Mastering Chess Openings: A Beginner's Guide",
      excerpt:
        "Learn the fundamental principles of chess openings and how to build a solid foundation for your games. Discover common traps and winning strategies.",
      author: "GM Rajesh Kumar",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Learning",
      image: "📚",
      featured: true,
    },
    {
      id: 2,
      title: "How Chess Improves Cognitive Skills in Children",
      excerpt:
        "Scientific evidence shows chess enhances memory, concentration, and problem-solving abilities. Learn how structured chess training benefits academic performance.",
      author: "Dr. Priya Sharma",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "Research",
      image: "🧠",
      featured: false,
    },
    {
      id: 3,
      title: "Tournament Preparation: From Local to National Level",
      excerpt:
        "Comprehensive guide on preparing for chess tournaments. Includes mental preparation, physical fitness, and strategic planning tips from our champion coaches.",
      author: "IM Ankit Verma",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "Tournament",
      image: "🏆",
      featured: false,
    },
    {
      id: 4,
      title: "The Psychology of Chess: Building Mental Toughness",
      excerpt:
        "Explore the mental aspects of chess and learn techniques to handle pressure, manage time, and maintain focus during critical moments in your games.",
      author: "GM Sneha Reddy",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Psychology",
      image: "💭",
      featured: false,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <GlowingOrb color="blue" size={300} position={{ x: 10, y: 20 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Latest Insights
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Chess{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Blog
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert articles, training tips, and insights from our coaches to
            help you improve your game
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Post */}
          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ThreeDCard className="h-full bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
                          {post.image}
                        </div>
                        <div>
                          <span className="inline-block bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium mb-2">
                            Featured
                          </span>
                          <div className="text-sm text-blue-600 font-medium">
                            {post.category}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>

                        {/* <Link 
                        href={`/blog/${post.id}`}
                        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link> */}
                      </div>
                    </div>
                  </CardContent>
                </ThreeDCard>
              </motion.div>
            ))}

          {/* Recent Posts */}
          <div className="space-y-6">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <ThreeDCard className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group hover:border-blue-200 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                          {post.image}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {post.readTime}
                            </span>
                          </div>

                          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>

                          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>By {post.author}</span>
                            <span>
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </ThreeDCard>
                </motion.div>
              ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/blog">
            <Button
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-6 rounded-xl transition-all duration-300 group"
            >
              <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Explore All Articles
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
// Success Stories Section Component
function SuccessStoriesSection() {
  const successStories = [
    {
      id: 1,
      name: "Lucas Chen",
      age: 12,
      achievement: "Regional Under-12 Champion 2024",
      story:
        "When Lucas first joined us, he was hesitant about competitive play. Through personalized coaching and regular practice sessions, he developed the confidence to compete and ultimately clinched the regional championship title.",
      rating: 5,
      duration: "18 months",
      image:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=150&h=150&fit=crop&crop=face",
      category: "Rising Star",
    },
    {
      id: 2,
      name: "Sophia Martinez",
      age: 15,
      achievement: "National Youth Games Finalist",
      story:
        "Sophia's analytical skills blossomed with our program. She went from local competitions to representing her state at the national level, impressing everyone with her creative opening strategies.",
      rating: 5,
      duration: "2 years",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
      category: "National Competitor",
    },
  ];

  return (
    <section className="py-6 sm:py-14 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-200/60 shadow-sm">
            <Trophy className="w-4 h-4 text-blue-600" />
            Real Student Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Our Students{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Make Moves
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how dedicated players from around the world are achieving their
            chess goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-blue-300 overflow-hidden">
                <CardContent className="p-5">
                  {/* Header with real photo */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove(
                              "hidden"
                            );
                          }}
                        />
                        <div className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Trophy className="w-2 h-2 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">
                        {story.name}
                      </h3>
                      <p className="text-sm text-gray-500">Age {story.age}</p>
                      <div className="flex mt-1">
                        {Array.from({ length: story.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Achievement badge */}
                  <div className="mb-3">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium border border-blue-200">
                      {story.category}
                    </span>
                  </div>

                  {/* Content */}
                  <p className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                    {story.achievement}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {story.story}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Clock3 className="w-3 h-3" />
                      {story.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          {/* <Link href="/testimonials">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Read All Success Stories
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link> */}
        </motion.div>
      </div>
    </section>
  );
}

// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}



// Floating Chess Pieces with Trail
function AnimatedChessPiece({
  icon: Icon,
  delay = 0,
  position,
}: {
  icon: any;
  delay?: number;
  position: { x: number; y: number };
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        y: [0, -20, -40, -60],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 2,
      }}
    >
      <Icon className="w-8 h-8 text-purple-500/40" />
    </motion.div>
  );
}

// 3D Card Effect Component
function ThreeDCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu transition-all duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Particle Background
function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          animate={{
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

// Glowing Orb
function GlowingOrb({
  color = "blue",
  size = 200,
  position = { x: 50, y: 50 },
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-xl opacity-20`}
      style={{
        width: size,
        height: size,
        left: `${position.x}%`,
        top: `${position.y}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

// Image Components with Creative Layouts
function ChessTrainingScene() {
  return (
    <div className="relative w-full h-80">
      <div className="absolute inset-0 rounded-3xl" />

      {/* Main chess board */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <InteractiveChessBoard />
      </div>

      {/* Floating elements */}
      {/* Floating elements */}
      <motion.div
        className="absolute left-10 top-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <BrainCircuit className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <p className="text-xs font-semibold text-gray-800">
          Strategic Thinking
        </p>
      </motion.div>

      <motion.div
        className="absolute right-12 top-16 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Puzzle className="w-4 h-4 text-purple-600 flex-shrink-0" />
        <p className="text-xs font-semibold text-gray-800">Problem Solving</p>
      </motion.div>

      <motion.div
        className="absolute left-8 bottom-12 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Clock4 className="w-4 h-4 text-green-600 flex-shrink-0" />
        <p className="text-xs font-semibold text-gray-800">Time Management</p>
      </motion.div>
    </div>
  );
}

function StudentAchievementShowcase() {
  return (
    <div className="relative w-full h-80">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-3xl border border-amber-200/20 backdrop-blur-sm" />

      {/* Trophy display */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        >
          <Trophy className="w-20 h-20 text-amber-500" />
        </motion.div>
      </div>

      {/* Achievement badges */}
      <motion.div
        className="absolute left-8 top-8 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border"
        whileHover={{ scale: 1.1 }}
      >
        <Medal className="w-8 h-8 text-blue-500" />
      </motion.div>

      <motion.div
        className="absolute right-10 top-12 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border"
        whileHover={{ scale: 1.1 }}
      >
        <Crown className="w-8 h-8 text-purple-500" />
      </motion.div>

      <motion.div
        className="absolute left-12 bottom-8 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border"
        whileHover={{ scale: 1.1 }}
      >
        <Gem className="w-8 h-8 text-green-500" />
      </motion.div>

      <motion.div
        className="absolute right-8 bottom-12 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border"
        whileHover={{ scale: 1.1 }}
      >
        <Award className="w-8 h-8 text-red-500" />
      </motion.div>
    </div>
  );
}

function CoachingSessionVisual() {
  return (
    <div className="relative w-full h-80">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-3xl border border-emerald-200/20 backdrop-blur-sm" />

      {/* Mentor and student visualization */}
      <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2">
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border text-center"
          whileHover={{ scale: 1.05 }}
        >
          <GraduationCap className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <p className="font-semibold text-gray-800">Expert Coach</p>
          <p className="text-sm text-gray-600">FIDE Rated</p>
        </motion.div>
      </div>

      <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2">
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <p className="font-semibold text-gray-800">Dedicated Student</p>
          <p className="text-sm text-gray-600">Personalized Learning</p>
        </motion.div>
      </div>

      {/* Connection line */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 transform -translate-y-1/2"
        style={{ width: "40%" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />

      {/* Sparkles */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Sparkles className="w-8 h-8 text-yellow-400" />
      </motion.div>
    </div>
  );
}

// FAQ Component with Enhanced Design
function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What age groups do you train?",
      answer:
        "We cultivate chess skills in students from age 5 to adults, with specialized programs tailored for children, teens, and adult learners to match their cognitive development and learning objectives.",
    },
    {
      question: "Is prior chess knowledge required?",
      answer:
        "No prior experience needed. Our beginner program systematically builds from fundamentals and has transformed complete novices into competitive tournament players within 12 months of structured training.",
    },
    {
      question: "Are classes online or offline?",
      answer:
        "We offer both online sessions with interactive digital boards and in-person classes at our academy premises. Hybrid learning options are also available for flexible scheduling.",
    },
    {
      question: "What is the batch size?",
      answer:
        "Group sessions maintain a maximum 6:1 student-to-coach ratio for personalized attention. Private 1-on-1 mentoring is available for focused, individualized training programs.",
    },
    {
      question: "How is progress tracked?",
      answer:
        "Through systematic evaluations, tournament performance analysis, ELO rating progression, and comprehensive monthly progress reports shared with parents/guardians.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <ParticleBackground />
      {/* <GlowingOrb color="purple" size={300} position={{ x: 10, y: 20 }} />
      <GlowingOrb color="blue" size={250} position={{ x: 90, y: 80 }} /> */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4 border border-gray-200/60">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Need Help? We've Got Answers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our chess programs and methodology
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ThreeDCard className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-0">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors rounded-2xl group"
                    aria-expanded={openFAQ === index}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-semibold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </ThreeDCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced Testimonial Component
function TestimonialSection() {
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Parent of Regional Champion",
    content:
      "The personalized coaching approach helped my son grow from a curious beginner to a confident tournament player. The progress he's made in just 18 months is incredible.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    achievement: "Son won Regional Under-12 Championship",
  },
  {
    name: "Marcus Rodriguez",
    role: "Software Engineer",
    content:
      "As someone who works in tech, I've found that the strategic thinking skills I've developed here directly translate to better problem-solving at work. The adult learning program is perfectly paced.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    achievement: "Improved strategic decision-making",
  },
  {
    name: "Dr. Emily Watson",
    role: "School Principal",
    content:
      "We've integrated their chess program across three of our schools. The cognitive benefits we're seeing in students' academic performance are remarkable. It's more than just chess—it's building future leaders.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    achievement: "Implemented school-wide chess program",
  },
];
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/20">
            <Quote className="w-4 h-4 text-amber-300" />
            Real Stories, Real Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              Students & Parents
            </span>
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands who have discovered the joy and benefits of chess
            through our proven teaching methods
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-amber-400/30 overflow-hidden">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400 mr-1"
                      />
                    ))}
                  </div>

                  {/* Quote Icon */}
                  <Quote className="w-6 h-6 text-amber-300/40 mb-4" />

                  {/* Content */}
                  <p className="text-white/90 mb-6 leading-relaxed text-sm">
                    "{testimonial.content}"
                  </p>

                  {/* Achievement Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full font-medium border border-amber-500/30">
                      {testimonial.achievement}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-600">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove(
                              "hidden"
                            );
                          }}
                        />
                        <div className="hidden w-full h-full bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-blue-200 text-xs truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/testimonials">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Read More Stories
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function kprChessAcademyHome() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "KPR Chess Academy",
    url: "https://www.kprchessacademy.com",
    logo: "https://www.kprchessacademy.com/logo.png",
    description:
      "Premier chess academy in Chennai (Mylapore & Pallikaranai) offering structured chess education for all age groups and skill levels under Founder TV Kumar.",
    foundingDate: "2020",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 99419 87881",
      contactType: "Customer Service",
      areaServed: "Global",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "285",
    },
  };

  // Floating chess pieces positions
  const floatingPieces = [
    { icon: Gamepad, position: { x: 10, y: 20 }, delay: 0 },
    { icon: Crown, position: { x: 85, y: 15 }, delay: 1 },
    { icon: Zap, position: { x: 15, y: 70 }, delay: 2 },
    { icon: Trophy, position: { x: 90, y: 65 }, delay: 3 },
  ];

  return (
    <>
      <Head>
        <title>
          KPR Chess Academy | Structured Chess Education in Chennai
        </title>
        <meta
          name="description"
          content="KPR Chess Academy offers professional chess coaching in Mylapore and Pallikaranai, Chennai. Join our structured training programs for all age groups and skill levels."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="KPR Chess Academy - Empowering Minds Through Chess"
        />
        <meta
          property="og:description"
          content="Structured chess training fostering analytical thinking and academic excellence."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-white overflow-x-hidden w-full">
        <header>
          <Navbar />
          <Hero/>
          <AboutUs/>
          <CoursesSection/>
          <Achievements/>
          <Testimonials/>
          <WhyChooseUs/>
          <FAQ/>
          <CompactCTA/>
        </header>

  

        <Footer />

        {/* AI Chatbot */}
        <AIChatbot />
      </div>
    </>
  );
}
