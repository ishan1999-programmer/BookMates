import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../styles/landing.css";

const FeatureCard = ({ cardTitle, cardDescription, cardIcon:IconComponent}) => {
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-card">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <IconComponent className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-primary mb-3">{cardTitle}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {cardDescription}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
