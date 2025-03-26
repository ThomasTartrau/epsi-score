"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BanIcon, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "../_types/user.types";
import { BanUserModal } from "./ban-user-modal";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onActionComplete: () => void;
}

export function UsersTable({
  users,
  isLoading,
  onActionComplete,
}: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBanModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mt-6 mb-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  <RefreshCw className="mr-2 inline-block h-5 w-5 animate-spin" />
                  Chargement...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        user.banned
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800",
                      )}
                    >
                      {user.banned ? "Banni" : "Actif"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={user.banned ? "default" : "destructive"}
                      size="sm"
                      onClick={() => handleOpenBanModal(user)}
                    >
                      <BanIcon className="mr-2 h-4 w-4" />
                      {user.banned ? "Débannir" : "Bannir"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <BanUserModal
        user={selectedUser}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onActionComplete={onActionComplete}
      />
    </>
  );
}
