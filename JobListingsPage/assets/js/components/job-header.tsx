

import React from "react"
import { Sparkles } from "lucide-react"

export function JobHeader() {
   return (
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
         <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-2xl font-bold">
                     <Sparkles className="h-7 w-7 text-primary" />
                     <span className="text-foreground">TalentMatch</span>
                  </div>
               </div>
            </div>
         </div>
      </header>
   )
}

