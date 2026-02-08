import SignupForm from "../components/SignupForm";
import { BookOpen } from "lucide-react";

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-page-content">
        <div className="signup-page-title">
          <BookOpen className="h-12 w-12 text-primary" />
          <h1>BookMates</h1>
          <p>Join our community of book lovers!</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
