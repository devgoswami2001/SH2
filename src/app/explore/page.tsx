
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, ThumbsUp, MessageSquare, Share2, MoreHorizontal, Edit, Trash2, Send, Loader2, Heart, ArrowLeft, Building } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { AppHeader } from '@/components/layout/AppHeader';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';


// --- Data Structures ---
interface ApiComment {
    id: number;
    comment: string;
    parent: number | null;
    likes_count: number;
    replies_count: number;
    created_at: string;
    user_name: string;
    user_profile_image?: string | null;
    is_liked: boolean;
    can_delete: boolean;
    replies?: ApiComment[];
}

interface ApiPost {
  id: number;
  company_name: string;
  company_logo: string | null;
  content: string;
  image: string | null;
  video: string | null;
  likes_count: number;
  comments: ApiComment[];
  comments_count: number;
  shares_count: number;
  created_at: string;
  is_liked: boolean;
}

interface EmployerSuggestion {
    id: number;
    name: string;
}

const CommentOptions: React.FC<{onDelete: () => void, canDelete: boolean}> = ({onDelete, canDelete}) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted/50 rounded-full">
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
             <DropdownMenuItem onClick={() => alert('Editing comment...')}><Edit className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem>
             {canDelete && (
                <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4"/>Delete
                </DropdownMenuItem>
             )}
        </DropdownMenuContent>
    </DropdownMenu>
);

const CommentView: React.FC<{ comment: ApiComment; onLike: () => void; onDelete: () => void }> = 
({ comment, onLike, onDelete }) => {

    return (
        <div className="flex gap-2.5 my-3">
            <Avatar className="h-7 w-7">
                 <AvatarImage src={comment.user_profile_image || undefined} alt={comment.user_name} />
                <AvatarFallback>{comment.user_name.substring(0,1)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <div className="bg-muted/70 dark:bg-slate-700/50 rounded-lg px-3 py-1.5 text-sm">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-foreground text-xs">{comment.user_name}</p>
                        {comment.can_delete && (
                            <CommentOptions 
                                onDelete={onDelete} 
                                canDelete={comment.can_delete}
                            />
                        )}
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{comment.comment}</p>
                </div>
                <div className="flex items-center gap-3 px-2 mt-1">
                    <button onClick={onLike} className={cn("text-xs font-semibold hover:text-primary", comment.is_liked ? "text-primary" : "text-muted-foreground")}>
                        {comment.is_liked ? 'Liked' : 'Like'} ({comment.likes_count})
                    </button>
                    <span className="text-xs text-muted-foreground/80">{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                </div>
            </div>
        </div>
    );
};

const CompanyPostCard: React.FC<{ post: ApiPost; isDesktop?: boolean; onUpdatePost: (updatedPost: ApiPost) => void; }> = 
({ post: initialPost, isDesktop, onUpdatePost }) => {
  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(2);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);
  
  const handleLikePost = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const originalPost = {...post};
    const updatedPost = { ...post, is_liked: !post.is_liked, likes_count: post.is_liked ? post.likes_count - 1 : post.likes_count + 1 };
    onUpdatePost(updatedPost);
    
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/jobseeker/company-posts/${post.id}/like/`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (!response.ok) throw new Error("Like failed");
    } catch (err) {
        onUpdatePost(originalPost);
        toast({ title: "Error", description: "Failed to like post.", variant: "destructive" });
    }
  };

  const fetchComments = useCallback(async () => {
    if (post.comments?.length > 0) { 
        setShowComments(true);
        return;
    } 
    setIsLoadingComments(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      toast({ title: "Error", description: "You must be logged in to view comments.", variant: "destructive" });
      setIsLoadingComments(false);
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/jobseeker/comments/?post_id=${post.id}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch comments.");
      const data = await response.json();
      const updatedPost = {...post, comments: data.results || []};
      onUpdatePost(updatedPost);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsLoadingComments(false);
    }
  }, [post.id, post, onUpdatePost, toast]);

  const handleToggleComments = () => {
    const newShowState = !showComments;
    setShowComments(newShowState);
    if (newShowState && !post.comments) { 
        fetchComments();
    }
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() && !isSubmittingComment) {
        setIsSubmittingComment(true);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            toast({ title: "Error", description: "You must be logged in to comment.", variant: "destructive" });
            setIsSubmittingComment(false);
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/jobseeker/company-posts/${post.id}/comment/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                body: JSON.stringify({ comment: commentText })
            });
            
            if (!response.ok) throw new Error('Failed to post comment.');
            const newComment = await response.json();

            const updatedPost = { ...post, comments: [newComment, ...(post.comments || [])], comments_count: post.comments_count + 1 };
            onUpdatePost(updatedPost);
            
            setCommentText('');
            if (!showComments) setShowComments(true);
            toast({ title: "Success", description: "Comment posted." });
        } catch(err) {
             toast({ title: "Error", description: "Failed to post comment.", variant: "destructive" });
        } finally {
            setIsSubmittingComment(false);
        }
    }
  };

  const handleLikeComment = async (commentId: number) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const originalPost = {...post};
    const updatedPost = {
        ...post,
        comments: (post.comments || []).map(c => 
            c.id === commentId ? { ...c, is_liked: !c.is_liked, likes_count: c.is_liked ? c.likes_count - 1 : c.likes_count + 1 } : c
        )
    };
    onUpdatePost(updatedPost);

    try {
        await fetch(`http://127.0.0.1:8000/api/v1/jobseeker/comments/${commentId}/like/`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
    } catch (err) {
        onUpdatePost(originalPost);
        toast({ title: "Error", description: "Failed to like comment.", variant: "destructive" });
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;
    
    const originalPost = {...post};
    const updatedPost = { ...post, comments: (post.comments || []).filter(c => c.id !== commentId), comments_count: post.comments_count - 1 };
    onUpdatePost(updatedPost);

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/jobseeker/comments/${commentId}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (!response.ok) throw new Error('Failed to delete comment.');
        toast({ title: "Success", description: "Comment deleted." });
    } catch (err) {
        onUpdatePost(originalPost);
        toast({ title: "Error", description: "Failed to delete comment.", variant: "destructive" });
    }
  };

  const handleShare = async () => {
    const shareData = {
        title: `Post by ${post.company_name}`,
        text: post.content,
        url: window.location.href // Or a direct link to the post if available
    };
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.error("Error sharing:", error);
        }
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url).then(() => {
            toast({ title: "Link Copied!", description: "Post URL copied to your clipboard." });
        }).catch(err => {
            console.error("Could not copy text: ", err);
            alert("Could not copy link to clipboard.");
        });
    } else {
        alert("Sharing is not supported on this browser.");
        console.log("Clipboard API not available");
    }
  };

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
  
  const comments = post.comments || [];
  const visibleComments = showComments ? comments.slice(0, visibleCommentsCount) : [];
  const hasMoreComments = comments.length > visibleCommentsCount;

  return (
    <Card className={cn(
        "bg-card/90 backdrop-blur-md shadow-lg overflow-hidden border border-border/30 rounded-xl dark:bg-slate-800/60",
        isDesktop ? "max-w-xl mx-auto" : "mb-3.5"
    )}>
      <CardHeader className="flex flex-row items-center gap-3 p-3 md:p-4">
        <Avatar className="h-10 w-10 border-2 border-primary/40">
          <AvatarImage src={post.company_logo || undefined} alt={post.company_name} />
          <AvatarFallback>{post.company_name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="text-sm md:text-base font-semibold text-foreground leading-tight">{post.company_name}</p>
          <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-sm md:text-base text-foreground px-3 md:px-4 pb-2.5 leading-normal">
          {renderPostText(post.content)}
        </p>
        {post.image && (
          <Image
            src={post.image}
            alt="Post image"
            width={isDesktop ? 600 : 375}
            height={isDesktop ? 340 : 210}
            data-ai-hint={"company post"}
            className="w-full object-cover aspect-[16/9]"
          />
        )}
      </CardContent>
       <div className="px-3 md:px-4 py-2 text-xs md:text-sm text-muted-foreground flex justify-between items-center border-t border-border/30">
        <div className="flex items-center gap-1.5">
            <Heart className={cn("h-4 w-4", post.is_liked ? "text-red-500 fill-current" : "text-primary/70")}/>
            <span>{post.likes_count}</span>
        </div>
        <button onClick={handleToggleComments} className="flex items-center gap-2 hover:text-primary transition-colors">
            <span>{post.comments_count} Comments</span>
            <span>&middot;</span>
            <span>{post.shares_count} Shares</span>
        </button>
      </div>
      <CardFooter className="p-0 grid grid-cols-3 border-t border-border/30">
          <Button onClick={handleLikePost} variant="ghost" size="sm" className={cn("rounded-none flex-1 h-9 md:h-11 text-xs md:text-sm items-center justify-center gap-1.5 border-r border-border/30", post.is_liked ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-primary/10 hover:text-primary")}>
              <ThumbsUp className="h-4 w-4" /> {post.is_liked ? 'Liked' : 'Like'}
          </Button>
          <Button onClick={handleToggleComments} variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-none flex-1 h-9 md:h-11 text-xs md:text-sm items-center justify-center gap-1.5 border-r border-border/30">
              <MessageSquare className="h-4 w-4" /> Comment
          </Button>
          <Button onClick={handleShare} variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-none flex-1 h-9 md:h-11 text-xs md:text-sm items-center justify-center gap-1.5">
              <Share2 className="h-4 w-4" /> Share
          </Button>
      </CardFooter>

      {showComments && (
        <div className="p-3 md:p-4 border-t border-border/30">
          <div className="flex gap-2.5 items-start">
             <Avatar className="h-7 w-7"><AvatarImage src="https://placehold.co/32x32.png?text=U" alt="User" data-ai-hint="current user"/></Avatar>
             <div className="relative flex-grow">
                <Input placeholder="Add a comment..." className="h-8 text-xs rounded-full pr-9" value={commentText} onChange={(e) => setCommentText(e.target.value)} disabled={isSubmittingComment} />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-8 w-8 text-primary rounded-full" onClick={handleCommentSubmit} disabled={isSubmittingComment}>
                  {isSubmittingComment ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4"/>}
                </Button>
             </div>
          </div>
          <Separator className="my-3"/>
          {isLoadingComments ? (
             <div className="flex justify-center py-4"><Loader2 className="h-6 w-6 animate-spin text-primary"/></div>
          ) : visibleComments.length > 0 ? (
            visibleComments.map(comment => <CommentView key={comment.id} comment={comment} onLike={() => handleLikeComment(comment.id)} onDelete={() => handleDeleteComment(comment.id)} />)
          ) : (
             <p className="text-xs text-muted-foreground text-center py-2">No comments yet. Be the first to comment!</p>
          )}

          {hasMoreComments && (
             <Button variant="link" size="sm" className="text-xs w-full mt-2" onClick={() => setVisibleCommentsCount(prev => prev + 5)}>
                View more comments
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

const ExploreContent: React.FC<{isDesktop?: boolean}> = ({ isDesktop }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState<ApiPost[]>([]);
    const [suggestions, setSuggestions] = useState<EmployerSuggestion[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const router = useRouter();
    const { toast } = useToast();

    const fetchPosts = useCallback(async () => {
        setIsLoadingPosts(true);
        setError(null);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setError("Please log in to see the feed.");
            setIsLoadingPosts(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/jobseeker/company-posts/', {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            if (!response.ok) throw new Error("Failed to fetch posts.");
            
            const data = await response.json();
            setPosts(data.results || []);

        } catch (err: any) {
            setError(err.message || "An error occurred.");
        } finally {
            setIsLoadingPosts(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleUpdatePost = useCallback((updatedPost: ApiPost) => {
        setPosts(currentPosts => 
            currentPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
        );
    }, []);

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        if (searchTerm.trim().length > 0) {
            setIsLoadingSuggestions(true);
            debounceTimeout.current = setTimeout(async () => {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) return;
                try {
                    const res = await fetch(`http://127.0.0.1:8000/api/v1/jobseeker/search/employers/?name=${searchTerm}`, {
                         headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setSuggestions(data);
                    }
                } catch (e) {
                    console.error("Failed to fetch suggestions:", e);
                } finally {
                    setIsLoadingSuggestions(false);
                }
            }, 300);
        } else {
            setSuggestions([]);
        }

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [searchTerm]);

    const handleSuggestionClick = (companyId: number) => {
        router.push(`/company/${companyId}`);
        setSearchTerm('');
        setSuggestions([]);
    }

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
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn(
                        "w-full h-9 pl-9 pr-3 text-xs rounded-md bg-muted border-border/50 focus:bg-background focus:border-primary/50",
                        isDesktop && "h-11 text-sm pl-10"
                    )}
                  />
                  {searchTerm && (
                    <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-md shadow-lg z-10">
                        {isLoadingSuggestions && <div className="p-2 text-center text-xs text-muted-foreground">Loading...</div>}
                        {!isLoadingSuggestions && suggestions.length > 0 && (
                            suggestions.map(suggestion => (
                                <div key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.id)} className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer">
                                    <Building className="h-4 w-4 text-primary/70"/>
                                    <span className="text-sm">{suggestion.name}</span>
                                </div>
                            ))
                        )}
                        {!isLoadingSuggestions && suggestions.length === 0 && searchTerm && (
                             <div className="p-2 text-center text-xs text-muted-foreground">No matching companies found.</div>
                        )}
                    </div>
                  )}
              </div>
            </div>
            <ScrollArea className="flex-grow bg-muted/20 dark:bg-slate-800/40">
                <div className={cn("p-2", isDesktop && "p-6 space-y-6")}>
                    {isLoadingPosts ? (
                        <div className="flex items-center justify-center p-10"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>
                    ) : error ? (
                        <Alert variant="destructive"><AlertCircle className="h-4 w-4"/><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
                    ) : (
                        posts.map(post => (
                            <CompanyPostCard 
                              key={post.id} 
                              post={post} 
                              isDesktop={isDesktop}
                              onUpdatePost={handleUpdatePost}
                            />
                        ))
                    )}
                    {!isLoadingPosts && !error && posts.length === 0 && (
                        <div className="text-center text-muted-foreground p-10">
                        <p>No posts to display. Follow some companies to see their updates here!</p>
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
