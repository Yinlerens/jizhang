"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { CheckCircle2, Sparkles, UserPlus, Loader2, Star, Circle, Triangle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP);

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useGSAP(() => {
    // 3D Card Entrance
    gsap.fromTo(".card-3d", 
      { scale: 0.9, y: -80, opacity: 0, transformPerspective: 900 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        duration: 1.5,
        ease: "power4.out",
      }
    );

    // Content Stagger Entrance
    gsap.from(".gsap-fade-in", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.3,
      ease: "power2.out",
    });

    // Awesome Floating Elements Animation
    gsap.to(".floating-shape", {
      y: "random(-100, 100)",
      x: "random(-100, 100)",
      rotation: "random(-360, 360)",
      scale: "random(0.8, 1.5)",
      duration: "random(10, 20)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 5,
        from: "random"
      }
    });

    // Pulsing Blobs
    gsap.to(".blob-1", { x: "random(-50, 50)", y: "random(-50, 50)", scale: "random(0.9, 1.2)", duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob-2", { x: "random(-60, 60)", y: "random(-60, 60)", scale: "random(0.8, 1.1)", duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob-3", { x: "random(-40, 40)", y: "random(-40, 40)", scale: "random(0.9, 1.3)", duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, { scope: containerRef, dependencies: [success] });

  useGSAP(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    const parallaxBg = container?.querySelector<HTMLElement>(".parallax-bg");
    const parallaxFg = container?.querySelector<HTMLElement>(".parallax-fg");

    if (!card) {
      return;
    }

    gsap.set(card, {
      transformPerspective: 900,
      transformStyle: "preserve-3d",
      transformOrigin: "center center",
      willChange: "transform",
    });

    const bgXTo = parallaxBg ? gsap.quickTo(parallaxBg, "x", { duration: 1, ease: "power2.out" }) : null;
    const bgYTo = parallaxBg ? gsap.quickTo(parallaxBg, "y", { duration: 1, ease: "power2.out" }) : null;
    const fgXTo = parallaxFg ? gsap.quickTo(parallaxFg, "x", { duration: 1, ease: "power2.out" }) : null;
    const fgYTo = parallaxFg ? gsap.quickTo(parallaxFg, "y", { duration: 1, ease: "power2.out" }) : null;
    const cardXTo = gsap.quickTo(card, "x", { duration: 0.8, ease: "power3.out" });
    const cardYTo = gsap.quickTo(card, "y", { duration: 0.8, ease: "power3.out" });
    const cardRotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3.out" });
    const cardRotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = e.clientX / window.innerWidth - 0.5;
      const normalizedY = e.clientY / window.innerHeight - 0.5;
      const x = normalizedX * 40;
      const y = normalizedY * 40;

      bgXTo?.(-x);
      bgYTo?.(-y);
      fgXTo?.(x * 1.5);
      fgYTo?.(y * 1.5);
      cardXTo(x * 0.25);
      cardYTo(y * 0.25);
      cardRotateXTo(-normalizedY * 30);
      cardRotateYTo(normalizedX * 42);
    };

    const resetCard = () => {
      cardXTo(0);
      cardYTo(0);
      cardRotateXTo(0);
      cardRotateYTo(0);
      bgXTo?.(0);
      bgYTo?.(0);
      fgXTo?.(0);
      fgYTo?.(0);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("blur", resetCard);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", resetCard);
      gsap.set(card, { willChange: "auto" });
    };
  }, { scope: containerRef, dependencies: [success], revertOnUpdate: true });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Button click animation
    gsap.to(".register-btn", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      
      // Awesome Error shake animation
      gsap.fromTo(formRef.current, 
        { x: -15, rotation: -2 },
        { x: 15, rotation: 2, duration: 0.08, yoyo: true, repeat: 5, ease: "power1.inOut", clearProps: "all" }
      );
      return;
    }

    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      toast.error("该邮箱已经注册过了，请直接登录。");
      setLoading(false);
      
      // Awesome Error shake animation
      gsap.fromTo(formRef.current, 
        { x: -15, rotation: -2 },
        { x: 15, rotation: 2, duration: 0.08, yoyo: true, repeat: 5, ease: "power1.inOut", clearProps: "all" }
      );
      return;
    }

    // Success explosion effect before state change
    toast.success("注册成功，请检查邮箱完成验证。");
    if (cardRef.current) {
      gsap.to(cardRef.current, { 
        scale: 1.1, 
        opacity: 0, 
        duration: 0.6, 
        ease: "power2.in",
        onComplete: () => {
          setSuccess(true);
          setLoading(false);
        }
      });
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div 
        ref={containerRef}
        className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-teal-950/50 dark:via-zinc-900 dark:to-cyan-950/50 overflow-hidden relative"
      >
        {/* Parallax Background for success */}
        <div className="parallax-bg absolute inset-0 pointer-events-none -z-10">
          <div className="blob-1 absolute top-20 right-20 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 dark:opacity-20" />
          <div className="blob-2 absolute bottom-20 left-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 dark:opacity-20" />
        </div>

        {/* Awesome Floating Shapes */}
        <div className="parallax-fg absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="floating-shape absolute text-emerald-400/30 dark:text-emerald-500/20"
              style={{
                left: `${(i * 29) % 100}%`,
                top: `${(i * 37) % 100}%`,
                scale: ((i * 13) % 10) / 10 + 0.5,
              }}
            >
              {i % 3 === 0 ? <Star className="fill-current w-6 h-6" /> : i % 3 === 1 ? <Circle className="fill-current w-5 h-5" /> : <Triangle className="fill-current w-6 h-6" />}
            </div>
          ))}
        </div>

        <div ref={cardRef} className="card-3d relative z-20 w-full max-w-md">
          <Card className="w-full border-2 border-emerald-200/60 dark:border-emerald-900/40 shadow-2xl shadow-emerald-200/50 dark:shadow-none bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl rounded-[2rem] text-center p-6">
            <CardHeader className="space-y-4 pb-2">
              <div className="mx-auto bg-gradient-to-tr from-emerald-400 to-teal-400 text-white p-4 rounded-full shadow-xl shadow-emerald-300/50 dark:shadow-none w-24 h-24 flex items-center justify-center gsap-fade-in hover:scale-110 transition-transform">
                <CheckCircle2 className="w-12 h-12 animate-bounce" />
              </div>
              <div className="gsap-fade-in">
                <CardTitle className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 tracking-tight">
                  注册成功！
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 font-medium mt-4 text-base">
                  请检查您的邮箱以完成验证。<br />验证完成后即可登录。
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-center pt-8 gsap-fade-in">
              <Link href="/login" className="w-full relative z-30">
                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base shadow-lg shadow-emerald-300/50 dark:shadow-emerald-900/20 transition-all hover:-translate-y-1 overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative">返回登录</span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/50 dark:via-zinc-900 dark:to-pink-950/50 overflow-hidden relative"
    >
      {/* Background decorations - Parallax Background */}
      <div className="parallax-bg absolute inset-0 pointer-events-none -z-10">
        <div className="blob-1 absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 dark:opacity-20" />
        <div className="blob-2 absolute bottom-20 left-10 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 dark:opacity-20" />
        <div className="blob-3 absolute -top-10 left-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 dark:opacity-20" />
      </div>

      {/* Awesome Floating Shapes - Parallax Foreground */}
      <div className="parallax-fg absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="floating-shape absolute text-indigo-400/30 dark:text-indigo-500/20"
            style={{
              left: `${(i * 29) % 100}%`,
              top: `${(i * 37) % 100}%`,
              scale: ((i * 13) % 10) / 10 + 0.5,
            }}
          >
            {i % 3 === 0 ? <Star className="fill-current w-6 h-6" /> : i % 3 === 1 ? <Circle className="fill-current w-5 h-5" /> : <Triangle className="fill-current w-6 h-6" />}
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div ref={cardRef} className="card-3d relative z-20 w-full max-w-md">
        <Card className="w-full border-2 border-indigo-200/60 dark:border-indigo-900/40 shadow-2xl shadow-indigo-200/50 dark:shadow-none bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl rounded-[2rem]">
          <CardHeader className="space-y-4 pb-6 text-center">
            <div className="mx-auto bg-gradient-to-tr from-indigo-400 to-purple-400 text-white p-3 rounded-2xl shadow-xl shadow-indigo-300/50 dark:shadow-none w-14 h-14 flex items-center justify-center gsap-fade-in hover:scale-110 transition-transform transform -rotate-3">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <div className="gsap-fade-in">
              <CardTitle className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 tracking-tight">
                创建账号
              </CardTitle>
              <CardDescription className="text-zinc-500 dark:text-zinc-400 font-medium mt-2">
                加入我们，开启你的财务健康之旅！
              </CardDescription>
            </div>
          </CardHeader>
          
          <form ref={formRef} onSubmit={handleRegister}>
            <CardContent className="space-y-5">
              <div className="space-y-2 gsap-fade-in relative z-30">
                <Label htmlFor="email" className="font-bold text-zinc-700 dark:text-zinc-300 ml-1">邮箱地址</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl h-12 px-4 border-2 border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-900 placeholder:text-zinc-400 caret-indigo-500 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:caret-indigo-300 focus-visible:ring-0 focus-visible:border-indigo-400 font-medium transition-colors hover:border-indigo-300"
                  />
                </div>
              </div>
              
              <div className="space-y-2 gsap-fade-in relative z-30">
                <Label htmlFor="password" className="font-bold text-zinc-700 dark:text-zinc-300 ml-1">密码</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="至少6位字符"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl h-12 px-4 border-2 border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-900 placeholder:text-zinc-400 caret-indigo-500 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:caret-indigo-300 focus-visible:ring-0 focus-visible:border-indigo-400 font-medium transition-colors hover:border-indigo-300"
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-4 gsap-fade-in">
              <Button 
                type="submit" 
                disabled={loading}
                className="register-btn w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-black text-base shadow-lg shadow-indigo-300/50 dark:shadow-indigo-900/20 transition-all hover:-translate-y-1 relative z-30 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center justify-center">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
                  {loading ? "正在注册..." : "立即注册"}
                </span>
              </Button>
              
              <div className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400 relative z-30">
                已有账号？{" "}
                <Link href="/login" className="text-indigo-500 hover:text-indigo-600 font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform">
                  直接登录
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
