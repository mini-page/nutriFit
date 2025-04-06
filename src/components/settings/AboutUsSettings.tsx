
import React from 'react';
import { Instagram, Github, Linkedin, Send, Image, Youtube } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AboutUsSettings = () => {
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/ug_5711', username: '@ug_5711' },
    { name: 'Github', icon: Github, link: 'https://github.com/mini-page', username: 'mini-page' },
    { name: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/umanggupta5711', username: 'umanggupta5711' },
    { name: 'Telegram', icon: Send, link: 'https://t.me/raghav5711', username: '@raghav5711' },
    { name: 'Snapchat', icon: Image, link: 'https://snapchat.com/add/raghav5711143', username: '@raghav5711143' },
    { name: 'YouTube', icon: Youtube, link: '#', username: 'Umang Gupta' },
  ];
  
  const faqs = [
    {
      question: "How do I track my water intake?",
      answer: "Navigate to the Water section from the dashboard or sidebar. Use the plus and minus buttons to log your water intake throughout the day."
    },
    {
      question: "Can I customize my dashboard?",
      answer: "Yes! Go to Settings > Appearance > Customize Dashboard to select which trackers and quick actions appear on your dashboard."
    },
    {
      question: "How do I set my nutrition goals?",
      answer: "Go to the Nutrition page and use the settings icon to adjust your daily calorie and nutrient targets."
    },
    {
      question: "Is my data saved automatically?",
      answer: "Yes, all your tracking data is automatically saved to your local device. For a backup, you can export your data from Settings > Data & Privacy."
    },
    {
      question: "How can I track my fitness goals?",
      answer: "Use the Goals section to create specific, measurable fitness goals. Track your progress in the Exercise section."
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-lg font-medium mb-4">About Trackify</h3>
        <p className="text-muted-foreground mb-6">
          Hello, I'm <strong>Umang</strong>, also known as Raghav & <strong>mini-page</strong>. As a student, my mission is to help others lead healthier, more organized lives. 
          I am dedicated to building simple yet effective tools that guide users through their daily routines, 
          ensuring they stay on the right track and live a balanced life. With Trackify, we aim to bring simplicity 
          and effectiveness to your daily tracking needs.
        </p>
        
        <Separator className="my-6" />
        
        <h4 className="font-medium mb-4">Connect With Us</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <social.icon className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="font-medium text-sm">{social.name}</p>
                <p className="text-xs text-muted-foreground">{social.username}</p>
              </div>
            </a>
          ))}
        </div>
        
        <Separator className="my-6" />
        
        <h4 className="font-medium mb-4">Frequently Asked Questions</h4>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AboutUsSettings;
