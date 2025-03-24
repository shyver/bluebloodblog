"use client"

import { useState } from "react"
import { BarChart, FileText, Home, Image, Menu, Settings, ThumbsUp, Trophy, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger, SheetTitle } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

export function MobileAdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const handleButtonClick = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} >
      <SheetTrigger className="md:hidden">
        <Menu className="h-6 w-6 md:hidden" />
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader className="flex h-14 items-center px-4">

            <SheetTitle>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="h-6 w-6 rounded-full bg-primary"></span>
            <span className="text-lg font-bold">BlueBlood</span>
          </Link>
            </SheetTitle>

        </SheetHeader>
        <Separator />
        <div className="flex flex-col w-full">
          <Button asChild className={`text-black justify-start ${isActive("/dashboard") ? "bg-[#f5f5f5]" : "bg-white"}`} onClick={handleButtonClick}>
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>

          <Button asChild className={`text-black justify-start ${isActive("/dashboard/profile") ? "bg-[#f5f5f5]" : "bg-white"}`} onClick={handleButtonClick}>
            <Link href="/dashboard/profile">
              <Settings className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </Button>

          <Button asChild className={`text-black justify-start ${isActive("/dashboard/articles") ? "bg-[#f5f5f5]" : "bg-white"}`} onClick={handleButtonClick}>
            <Link href="/dashboard/articles">
              <FileText className="h-4 w-4" />
              <span>Articles</span>
            </Link>
          </Button>

          <Button asChild className={`text-black justify-start ${isActive("/dashboard/users") ? "bg-[#f5f5f5]" : "bg-white"}`} onClick={handleButtonClick}>
            <Link href="/dashboard/users">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </Link>
          </Button>

          <Button asChild className={`text-black justify-start ${isActive("/dashboard/insights") ? "bg-[#f5f5f5]" : "bg-white"}`} onClick={handleButtonClick}>
            <Link href="/dashboard/insights">
              <BarChart className="h-4 w-4" />
              <span>Insights</span>
            </Link>
          </Button>

          <Button asChild className={`text-black justify-start ${isActive("/dashboard/reactions") ? "bg-[#f5f5f5]" : "bg-white"}`} onClick={handleButtonClick}>
            <Link href="/dashboard/reactions">
              <ThumbsUp className="h-4 w-4" />
              <span>Reactions</span>
            </Link>
          </Button>

          <Button asChild className={`text-black justify-start ${isActive("/dashboard/badges") ? "bg-[#f5f5f5]" : "bg-white"}`} onClick={handleButtonClick}>
            <Link href="/dashboard/badges">
              <Trophy className="h-4 w-4" />
              <span>Badges</span>
            </Link>
          </Button>

          <Button asChild className={`text-black justify-start ${isActive("/dashboard/ads") ? "bg-[#f5f5f5]" : "bg-white"}`} onClick={handleButtonClick}>
            <Link href="/dashboard/ads">
              <Image className="h-4 w-4" />
              <span>Ads</span>
            </Link>
          </Button>
        </div>
        <Separator />
      </SheetContent>
      <SheetFooter />
    </Sheet>
  )
}