import React from "react";
import "../styles/landing.css";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import features from "../data/features";
import FeatureCard from "../components/FeatureCard";

const Landing = () => {
  return (
    <div className="landing-page bg-gradient-to-br from-accent via-background to-secondary">
      <section className="hero-section">
        <div className="hero-section-container">
          <BookOpen className="h-16 w-16 text-primary" />
          <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
            Welcome to BookMates
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Join a community of passionate readers who track their books, share
            discoveries, and connect over the stories that move them. Your
            reading journey starts here.
          </p>
          <div className="signup-login-buttons">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              <Link to="/signup">Start Your Journey</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="features-section">
        <div className="features-section-container">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-primary">
            Everything You Need for Your Reading Life
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover powerful features designed to enhance your reading
            experience and connect you with fellow book lovers.
          </p>
          <div className="features-cards">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                cardTitle={feature.title}
                cardDescription={feature.description}
                cardIcon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="testomonial-section bg-primary/5">
        <div className="testimonial-section-content"></div>
      </section>
      <div className="invitation-section"></div>
      <div className="footer-section bg-muted"></div>
    </div>
  );
};

export default Landing;
