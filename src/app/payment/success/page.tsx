'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect with a sync flag so the dashboard knows to poll for the update
          router.push('/subscription?check_sync=true');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-animated p-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20 dark:opacity-10"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg z-10"
      >
        <Card className="bg-card/80 backdrop-blur-xl shadow-2xl border border-border/30 rounded-3xl overflow-hidden text-center">
          <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
          <CardHeader className="pt-10 pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-foreground">Payment Successful!</CardTitle>
            <p className="text-muted-foreground mt-2">Welcome to the Pro Tier of HyreSense.</p>
          </CardHeader>
          
          <CardContent className="px-8 pb-10 space-y-6">
            <div className="bg-muted/40 rounded-2xl p-6 space-y-4 border border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                  Confirmed <Sparkles className="h-3 w-3" />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Access Level</span>
                <span className="font-semibold text-foreground">HyreSense Pro</span>
              </div>
              <div className="pt-2 border-t border-border/50 text-xs text-muted-foreground leading-relaxed">
                Your account features have been upgraded. You now have unlimited job swipes, AI-powered profile reviews, and priority listing in applications.
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
              <Clock className="h-4 w-4 animate-pulse" />
              <span>Redirecting to subscriptions in {countdown} seconds...</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <style jsx global>{`
        @keyframes pulse_slow_bg {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .bg-gradient-animated {
          background: linear-gradient(-45deg, hsl(var(--background)) 30%, hsl(var(--primary)/0.05) 50%, hsl(var(--accent)/0.05) 70%, hsl(var(--background)) 90%);
          background-size: 400% 400%;
          animation: pulse_slow_bg 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
