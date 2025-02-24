"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Share2, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CHAINS, COSTS } from "@/lib/data";
import LoadingScreen from "@/components/loading-screen";

export default function AirdropDetails() {
  const params = useParams() as { id?: string };
  const id = params?.id;
  const [airdrop, setAirdrop] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setError("Invalid project ID");
      setLoading(false);
      return;
    }

    const fetchAirdrop = async () => {
      try {
        const startTime = Date.now();
        const res = await fetch(`https://halu-db.vercel.app/api/${id}`);

        if (!res.ok) {
          if (res.status === 404) {
            setError("Error 404: Project not found");
            setTimeout(() => {
              router.push("/");
            }, 3000);
          } else {
            throw new Error(`Error ${res.status}: Project not found`);
          }
        } else {
          const data = await res.json();
          setAirdrop(data);
          setError("");
        }

        const elapsedTime = Date.now() - startTime;
        const delay = Math.max(1500 - elapsedTime, 0);
        setTimeout(() => setLoading(false), delay);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAirdrop();
  }, [id, router]);

  if (loading) return <LoadingScreen />; 

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background px-6">
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-6 rounded-lg max-w-md text-center shadow-lg">
          <AlertCircle className="h-8 w-8 mb-2 mx-auto" />
          <h2 className="text-xl font-semibold">{error}</h2>
          <p className="text-muted-foreground mt-2">Redirecting you to the home page...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Project Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background border-b">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <ThemeToggle />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center py-4">
            <div className="relative h-16 w-16 md:h-20 md:w-20">
              <Image
                src={airdrop.image || "/placeholder.svg"}
                alt={airdrop.name || "Airdrop"}
                fill
                className="rounded-2xl object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                  {airdrop.name}
                  {airdrop.isNew && (
                    <span className="text-red-500 text-xs font-semibold align-top">NEW</span>
                  )}
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">{airdrop.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex-1 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {airdrop.description || "No additional details available."}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Backers</h2>
              <p className="text-muted-foreground">{airdrop.backers || "N/A"}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Project Details</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground mb-1">Chain</dt>
                  <dd>
                    <Badge variant="secondary">
                      {airdrop.chain || "Unknown"}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground mb-1">Cost</dt>
                  <dd>
                    <Badge
                      variant="secondary"
                      className={`bg-${COSTS.find((c) => c.name === airdrop.cost)?.color || "gray-500"}`}
                    >
                      {airdrop.cost || "Free"}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground mb-1">Stage</dt>
                  <dd>
                    <Badge
                      variant="secondary"
                      className={airdrop.stage === "Mainnet" ? "bg-emerald-600" : "bg-yellow-600"}
                    >
                      {airdrop.stage || "Unknown"}
                    </Badge>
                  </dd>
                </div>
                {airdrop.addedAt && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Added</dt>
                    <dd className="text-sm">{new Date(airdrop.addedAt).toLocaleDateString()}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-6 flex flex-col gap-3">
                <Button className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
