
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { AppHeader } from '@/components/layout/AppHeader';

interface CompanyPost {
  id: string;
  companyName: string;
  companyLogoUrl: string;
  dataAiHintLogo: string;
  postImageUrl?: string;
  dataAiHintPost?: string;
  postText: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
}

const companyPostsData: CompanyPost[] = [
  {
    id: 'post1',
    companyName: 'Innovatech Solutions Ltd.',
    companyLogoUrl: 'https://placehold.co/48x48.png?text=IS',
    dataAiHintLogo: "company logo initial",
    postImageUrl: 'https://placehold.co/350x190.png',
    dataAiHintPost: "office team",
    postText: 'Exciting news! We are expanding our frontend team. Looking for passionate #React developers to join us on groundbreaking projects. #FrontendDev #Hiring',
    likes: 125,
    comments: 18,
    shares: 7,
    timeAgo: '2h ago'
  },
  {
    id: 'post2',
    companyName: 'ConnectSphere Inc.',
    companyLogoUrl: 'https://placehold.co/48x48.png?text=CS',
    dataAiHintLogo: "company logo initial",
    postImageUrl: 'https://placehold.co/350x190.png',
    dataAiHintPost: "marketing campaign",
    postText: 'Our latest digital marketing campaign just launched! Check out how we are leveraging #AI to boost engagement. #DigitalMarketing #AIinMarketing #Innovation',
    likes: 230,
    comments: 45,
    shares: 15,
    timeAgo: '5h ago'
  },
  {
    id: 'post3',
    companyName: 'PixelPerfect Studios',
    companyLogoUrl: 'https://placehold.co/48x48.png?text=PP',
    dataAiHintLogo: "company logo initial",
    postImageUrl: 'https://placehold.co/350x190.png',
    dataAiHintPost: "design studio",
    postText: "We're thrilled to share a sneak peek of our new mobile app interface, designed with user experience at its core. What do you think? #UIDesign #UX #ProductDesign",
    likes: 180,
    comments: 30,
    shares: 10,
    timeAgo: '1d ago'
  },
];

const CompanyPostCard: React.FC<{ post: CompanyPost, isDesktop?: boolean }> = ({ post, isDesktop }) => {
  const renderPostText = (text: string) => {
    const parts = text.split(/(#\w+)/g);
    return parts.map((part, index) =>
      part.startsWith('#') ? (
        <span key={index} className="text-primary hover:underline cursor-pointer">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <Card className={cn(
        "bg-card/90 backdrop-blur-md shadow-lg overflow-hidden border border-border/30 rounded-xl dark:bg-slate-800/60",
        isDesktop ? "max-w-xl mx-auto" : "mb-3.5"
    )}>
      <CardHeader className="flex flex-row items-center gap-3 p-3 md:p-4">
        <Avatar className="h-10 w-10 border-2 border-primary/40">
          <AvatarImage src={post.companyLogoUrl} alt={post.companyName} data-ai-hint={post.dataAiHintLogo} />
          <AvatarFallback>{post.companyName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="text-sm md:text-base font-semibold text-foreground leading-tight">{post.companyName}</p>
          <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-sm md:text-base text-foreground px-3 md:px-4 pb-2.5 leading-normal">
          {renderPostText(post.postText)}
        </p>
        {post.postImageUrl && (
          <Image
            src={post.postImageUrl}
            alt="Post image"
            width={isDesktop ? 680 : 375}
            height={isDesktop ? 380 : 210}
            data-ai-hint={post.dataAiHintPost || "company post"}
            className="w-full object-cover aspect-video"
          />
        )}
      </CardContent>
       <div className="px-3 md:px-4 py-2 text-xs md:text-sm text-muted-foreground flex justify-between items-center border-t border-border/30">
        <div className="flex items-center gap-1.5">
            <ThumbsUp className="h-4 w-4 text-primary/70" />
            <span>{post.likes}</span>
        </div>
        <div className="flex items-center gap-2">
            <span>{post.comments} Comments</span>
            <span>&middot;</span>
            <span>{post.shares} Shares</span>
        </div>
      </div>
      <CardFooter className="p-0 grid grid-cols-3 border-t border-border/30">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-none flex-1 h-9 md:h-11 text-xs md:text-sm items-center justify-center gap-1.5 border-r border-border/30">
              <ThumbsUp className="h-4 w-4" /> Like
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-none flex-1 h-9 md:h-11 text-xs md:text-sm items-center justify-center gap-1.5 border-r border-border/30">
              <MessageCircle className="h-4 w-4" /> Comment
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-none flex-1 h-9 md:h-11 text-xs md:text-sm items-center justify-center gap-1.5">
              <Share2 className="h-4 w-4" /> Share
          </Button>
      </CardFooter>
    </Card>
  );
};

const ExploreContent: React.FC<{isDesktop?: boolean}> = ({ isDesktop }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredPosts = companyPostsData.filter(post => 
      post.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.postText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
        <div className="h-full w-full flex flex-col">
            <div className={cn(
                "p-3 border-b border-border/50 bg-background sticky top-0 z-[5]",
                isDesktop && "p-4"
            )}>
              <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search companies, posts, or #hashtags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn(
                        "w-full h-9 pl-9 pr-3 text-xs rounded-md bg-muted border-border/50 focus:bg-background focus:border-primary/50",
                        isDesktop && "h-11 text-sm pl-10"
                    )}
                  />
              </div>
            </div>
            <ScrollArea className="flex-grow bg-muted/20 dark:bg-slate-800/40">
                <div className={cn("p-2", isDesktop && "p-6 space-y-6")}>
                    {filteredPosts.map(post => (
                        <CompanyPostCard key={post.id} post={post} isDesktop={isDesktop} />
                    ))}
                    {filteredPosts.length === 0 && (
                        <div className="text-center text-muted-foreground p-10">
                        <p>No posts match your search.</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};


export default function ExplorePage() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileAppLayout activeView="explore" pageTitle="Explore Companies">
          <ExploreContent />
        </MobileAppLayout>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col h-screen bg-background">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          <ExploreContent isDesktop={true} />
        </main>
      </div>
    </>
  );
}
