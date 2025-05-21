
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string | null;
  features: PricingFeature[];
  buttonText: string;
  popular?: boolean;
  tier: 'free' | 'pro' | 'enterprise';
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  features,
  buttonText,
  popular = false,
  tier
}) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAction = () => {
    if (tier === 'enterprise') {
      // Enterprise contact form would go here
      window.alert('A sales representative will contact you shortly.');
      return;
    }
    
    if (!isAuthenticated) {
      navigate('/login', { state: { tab: 'signup' } });
      return;
    }
    
    // Subscription handling would go here
    if (tier === 'pro') {
      window.alert('Upgrade processing would connect to payment provider');
    } else {
      navigate('/dashboard');
    }
  };

  const isCurrentPlan = user?.subscription === tier;

  return (
    <Card className={`relative flex flex-col ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 rounded-full bg-gradient-primary px-3 py-1 text-xs font-medium text-white">
          Popular
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute top-0 left-0 -translate-y-1/2 translate-x-3 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
          Your Plan
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {price !== null ? (
          <div className="mb-6">
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        ) : (
          <div className="mb-6">
            <span className="text-2xl font-semibold">Custom Pricing</span>
          </div>
        )}
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check
                className={
                  feature.included
                    ? 'mr-2 h-4 w-4 text-primary'
                    : 'mr-2 h-4 w-4 text-muted-foreground opacity-50'
                }
              />
              <span
                className={
                  feature.included ? '' : 'text-muted-foreground'
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleAction}
          className={`w-full ${
            tier === 'enterprise'
              ? 'bg-dark hover:bg-dark-lighter'
              : popular
              ? 'bg-gradient-primary hover:opacity-90'
              : ''
          }`}
          variant={popular ? 'default' : 'outline'}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Current Plan' : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
