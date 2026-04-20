import { useEffect } from "react";
import { BookOpen, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import features from "../data/features";
import FeatureCard from "../components/FeatureCard";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const Landing = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.accountDeletionSuccess) {
      toast.success("Your account has been permanently deleted", {
        position: "top-center",
      });
    }
  }, [location.state?.accountDeletionSuccess]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary">
      <section className="pt-[100px] mb-[100px] px-4">
        <div className="flex flex-col gap-5 items-center text-center max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
          <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight">
            Welcome to BookMates
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-5xl xl:max-w-6xl leading-relaxed">
            Join a community of passionate readers who track their books, share
            discoveries, and connect over the stories that move them. Your
            reading journey starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            >
              <Link to="/signup">Start Your Journey</Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-6 sm:px-8 py-3 text-base sm:text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="pb-10 px-4">
        <div className="flex flex-col gap-5 items-center text-center max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Everything You Need for Your Reading Life
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-4xl xl:max-w-5xl">
            Discover powerful features designed to enhance your reading
            experience and connect you with fellow book lovers.
          </p>

          {/* 🔥 Now actually uses width */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

      {/* TESTIMONIAL */}
      <section className="bg-primary/5 px-4">
        <div className="flex flex-col items-center text-center gap-6 sm:gap-7 py-10 sm:py-12 max-w-6xl xl:max-w-7xl mx-auto">
          <Quote className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />

          <h1 className="text-lg sm:text-2xl md:text-3xl font-medium text-primary leading-relaxed italic max-w-5xl xl:max-w-6xl">
            "BookMates has completely transformed how I discover and track my
            reading. The community is incredibly welcoming, and I've found so
            many amazing books through other readers' recommendations!"
          </h1>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary"
              />
            ))}
          </div>

          <p className="text-muted-foreground text-sm sm:text-lg italic">
            - Ishan T., BookMates Community Member
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-8 px-4">
        <div className="flex flex-col gap-5 items-center text-center py-10 sm:py-12 max-w-6xl xl:max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Ready to Begin Your Reading Adventure?
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground max-w-4xl xl:max-w-5xl">
            Join thousands of readers who are already tracking their books,
            sharing their thoughts, and discovering their next great read.
          </p>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
          >
            <Link to="/signup">Join BookMates Today</Link>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <section className="bg-muted px-4">
        <div className="flex flex-col gap-4 items-center text-center py-6 max-w-7xl xl:max-w-[1600px] mx-auto">
          <div className="flex gap-2 items-center">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <p className="text-base sm:text-lg font-semibold text-primary">
              BookMates
            </p>
          </div>

          <p className="text-muted-foreground text-sm sm:text-base">
            © 2026 BookMates. Building a community of readers, one book at a
            time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
