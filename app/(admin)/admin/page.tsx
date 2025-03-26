"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersIcon, TrophyIcon, StarIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { UserWithRole } from "better-auth/plugins";

interface StatData {
  totalUsers: number;
  totalTeams: number;
  totalScores: number;
  bannedUsers: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<StatData>({
    totalUsers: 0,
    totalTeams: 0,
    totalScores: 0,
    bannedUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch users with authClient
      const usersResponse = await authClient.admin.listUsers({
        query: {
          limit: 1000,
        },
      });

      // Still fetch teams and scores with the API endpoints
      const teamsResponse = await fetch("/api/admin/teams");
      const scoresResponse = await fetch("/api/admin/scores");

      if (!usersResponse.data || !teamsResponse.ok || !scoresResponse.ok) {
        throw new Error(
          "Une erreur est survenue lors de la récupération des statistiques",
        );
      }

      const teamsData = await teamsResponse.json();
      const scoresData = await scoresResponse.json();

      const bannedUsersCount =
        usersResponse.data.users?.filter((user: UserWithRole) => user.banned)
          .length || 0;

      setStats({
        totalUsers: usersResponse.data.total || 0,
        totalTeams: teamsData.pagination?.total || 0,
        totalScores: scoresData.pagination?.total || 0,
        bannedUsers: bannedUsersCount,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Impossible de charger les statistiques");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Tableau de bord administrateur
        </h2>
        <p className="text-muted-foreground">
          Gérez les utilisateurs, les équipes et les scores de
          l&apos;application.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <UsersIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <RefreshCw className="inline-block h-4 w-4 animate-spin" />
              ) : (
                stats.totalUsers
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              {loading ? "" : `${stats.bannedUsers} utilisateurs bannis`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Équipes</CardTitle>
            <TrophyIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <RefreshCw className="inline-block h-4 w-4 animate-spin" />
              ) : (
                stats.totalTeams
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              Équipes en compétition
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scores attribués
            </CardTitle>
            <StarIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <RefreshCw className="inline-block h-4 w-4 animate-spin" />
              ) : (
                stats.totalScores
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              Évaluations soumises
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ratio de participation
            </CardTitle>
            <StarIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading || stats.totalUsers === 0 || stats.totalTeams === 0 ? (
                <RefreshCw className="inline-block h-4 w-4 animate-spin" />
              ) : (
                `${Math.round((stats.totalScores / (stats.totalUsers * stats.totalTeams)) * 100)}%`
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              Des évaluations possibles
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Accédez rapidement aux fonctionnalités administratives principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              <Link href="/admin/users" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  Gérer les utilisateurs
                </Button>
              </Link>

              <Link href="/admin/teams" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <TrophyIcon className="mr-2 h-4 w-4" />
                  Gérer les équipes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guide administrateur</CardTitle>
            <CardDescription>
              Instructions pour gérer efficacement l&apos;application
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <p>
              • <strong>Utilisateurs</strong> - Vous pouvez bannir les
              utilisateurs en cas de comportement inapproprié.
            </p>
            <p>
              • <strong>Équipes</strong> - La suppression d&apos;une équipe
              supprimera tous les scores associés.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
