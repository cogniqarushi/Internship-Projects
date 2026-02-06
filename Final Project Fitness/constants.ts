import { Program, Testimonial } from './types';

export const PROGRAMS: Program[] = [
  {
    id: 'weight-loss',
    title: 'Weight Loss Program',
    description: 'Shed pounds effectively with a calorie-deficit plan and high-intensity interval training tailored to your body type.',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
    features: ['Calorie-deficit diet', 'HIIT Workouts', 'Weekly Check-ins'],
    price: '₹7,999'
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain Program',
    description: 'Build lean muscle mass through progressive overload techniques and a protein-rich nutrition strategy.',
    duration: '16 Weeks',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    features: ['Hypertrophy focus', 'Macro planning', 'Form correction'],
    price: '₹9,999'
  },
  {
    id: 'home-workout',
    title: 'Home Workout Plan',
    description: 'No gym? No problem. Transform your body using bodyweight exercises and minimal equipment.',
    duration: '8 Weeks',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop',
    features: ['Minimal equipment', 'Flexible schedule', 'Video guides'],
    price: '₹4,999'
  },
  {
    id: '1-on-1',
    title: '1:1 VIP Coaching',
    description: 'The ultimate personalized experience. Direct access to your coach, fully custom plans, and 24/7 accountability.',
    duration: 'Monthly Subscription',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    features: ['Daily WhatsApp Support', 'Custom Diet & Training', 'Weekly Calls'],
    price: '₹14,999/mo'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah J.',
    quote: "I never thought I could be this disciplined. Project Fitness changed not just my body, but my mindset.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    result: 'Lost 15kg in 3 months'
  },
  {
    id: '2',
    name: 'Mike T.',
    quote: "The muscle gain program is brutal but effective. The 1:1 accountability made all the difference.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    result: 'Gained 8kg muscle'
  },
  {
    id: '3',
    name: 'Emily R.',
    quote: "Finally a home workout plan that actually yields results. I feel stronger than ever.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    result: 'Toned & Fit'
  },
  {
    id: '4',
    name: 'David K.',
    quote: "From skinny fat to stage ready. The competition prep coaching was spot on. Peak week strategy was perfect.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    result: '1st Place Men\'s Physique'
  },
  {
    id: '5',
    name: 'Priya M.',
    quote: "Post-pregnancy weight loss seemed impossible until I joined. The approach was gentle on my body yet highly effective.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    result: 'Lost 10kg postpartum'
  },
  {
    id: '6',
    name: 'Alex B.',
    quote: "The diet plan was easy to follow and the workouts were intense. I went from 60kg to 72kg lean mass.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    result: 'Gained 12kg lean mass'
  },
  {
    id: '7',
    name: 'Jessica L.',
    quote: "I travel a lot for work. The flexible schedule options saved my fitness journey. No more excuses.",
    rating: 4,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    result: 'Maintained physique'
  },
  {
    id: '8',
    name: 'Rahul S.',
    quote: "Best investment for my health. My energy levels are through the roof now and my clothes fit perfectly.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    result: 'Reduced body fat by 8%'
  },
  {
    id: '9',
    name: 'Zoe W.',
    quote: "Coach Mayur knows his stuff. The biomechanics corrections fixed my back pain while deadlifting.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    result: 'Pain-free lifting'
  }
];

export const SYSTEM_INSTRUCTION = `
You are 'Coach AI', the advanced virtual assistant for Project Fitness. 
Your goal is to help visitors understand our premium fitness coaching services and guide them to book a free call or start a program.

Brand Tone: Motivational, Premium, Energetic, Direct but Supportive.
Brand Colors: Black, Gold, Orange.
Founder: Mayur K.

Programs we offer (Prices in INR):
1. Weight Loss Program (12 weeks, ₹7,999)
2. Muscle Gain Program (16 weeks, ₹9,999)
3. Home Workout Plan (8 weeks, ₹4,999)
4. 1:1 VIP Coaching (₹14,999/month)

Key Selling Points:
- Personalized workout & diet plans.
- Lifestyle discipline coaching.
- 24/7 Accountability via WhatsApp.
- Focus on long-term transformation, not quick fixes.

If a user asks about pricing, share the base prices but encourage them to "Book a Free Call" for a personalized assessment.
If a user lacks motivation, give them a short, powerful pep talk about discipline and consistency.
Keep responses concise and spoken-style, as this is a voice conversation.
`;