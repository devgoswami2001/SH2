'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, RefreshCcw, AlertTriangle, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentFailurePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <div className="h-2 bg-gradient-to-r from-red-400 to-orange-500"></div>
          <CardHeader className="pt-10 pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-foreground">Payment Failed</CardTitle>
            <p className="text-muted-foreground mt-2">Something went wrong during the transaction.</p>
          </CardHeader>
          
          <CardContent className="px-8 pb-10 space-y-6">
            <div className="bg-red-50/50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-200/50 dark:border-red-800/30 text-left">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-300">Important Note:</p>
                  <p className="text-xs text-red-700/80 dark:text-red-400/80 leading-relaxed">
                    If your money was deducted, it will be automatically refunded within 7-10 business days. You can try again using a different payment method or contact your bank.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="w-full h-12 text-base font-semibold group bg-foreground text-background transition-all">
                <Link href="/subscription">
                  <RefreshCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" /> 
                  Try Again
                </Link>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline" size="lg" className="h-12 text-sm">
                  <Link href="/contact">
                    <MessageSquare className="mr-2 h-4 w-4" /> Support
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="h-12 text-sm">
                  <Link href="/job-feed">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back Home
                  </Link>
                </Button>
              </div>
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
