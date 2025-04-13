
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const SocialMediaLinks: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: "Facebook",
      url: "https://facebook.com/trackify",
      icon: <Facebook className="h-4 w-4" />,
      color: "hover:bg-blue-600 hover:text-white"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/trackify",
      icon: <Twitter className="h-4 w-4" />,
      color: "hover:bg-blue-400 hover:text-white"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/trackify",
      icon: <Instagram className="h-4 w-4" />,
      color: "hover:bg-pink-600 hover:text-white"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/trackify",
      icon: <Linkedin className="h-4 w-4" />,
      color: "hover:bg-blue-700 hover:text-white"
    },
    {
      name: "GitHub",
      url: "https://github.com/trackify",
      icon: <Github className="h-4 w-4" />,
      color: "hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-800"
    },
    {
      name: "YouTube",
      url: "https://youtube.com/trackify",
      icon: <Youtube className="h-4 w-4" />,
      color: "hover:bg-red-600 hover:text-white"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Connect with us</h3>
      <div className="flex flex-wrap gap-2">
        {socialLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            className={`transition-colors ${link.color}`}
            asChild
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              {link.icon}
              <span>{link.name}</span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
