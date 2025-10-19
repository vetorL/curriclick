

import React from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { Separator } from "./ui/separator"
import { Input } from "./ui/input"

export function JobFilters() {
   return (
      <Card className="sticky top-24">
         <CardHeader>
            <CardTitle className="text-lg">{"Filters"}</CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="space-y-2">
               <h3 className="font-medium text-sm text-foreground">{"Search"}</h3>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Job title, skills, company..." className="pl-9 h-10 bg-background" />
               </div>
            </div>

            <Separator />

            <div className="space-y-3">
               <h3 className="font-medium text-sm text-foreground">{"Job Type"}</h3>
               <div className="space-y-2">
                  {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                     <div key={type} className="flex items-center gap-2">
                        <Checkbox id={type} />
                        <Label htmlFor={type} className="text-sm text-muted-foreground cursor-pointer">
                           {type}
                        </Label>
                     </div>
                  ))}
               </div>
            </div>

            <Separator />

            <div className="space-y-3">
               <h3 className="font-medium text-sm text-foreground">{"Experience Level"}</h3>
               <div className="space-y-2">
                  {["Entry Level", "Mid Level", "Senior", "Lead"].map((level) => (
                     <div key={level} className="flex items-center gap-2">
                        <Checkbox id={level} />
                        <Label htmlFor={level} className="text-sm text-muted-foreground cursor-pointer">
                           {level}
                        </Label>
                     </div>
                  ))}
               </div>
            </div>

            <Separator />

            <div className="space-y-3">
               <h3 className="font-medium text-sm text-foreground">{"AI Match Score"}</h3>
               <div className="pt-2">
                  <Slider defaultValue={[70]} max={100} step={5} />
                  <p className="text-xs text-muted-foreground mt-2">{"Minimum 70% match"}</p>
               </div>
            </div>

            <Separator />

            <div className="space-y-3">
               <h3 className="font-medium text-sm text-foreground">{"Industry"}</h3>
               <div className="space-y-2">
                  {["Technology", "Finance", "Healthcare", "Education"].map((industry) => (
                     <div key={industry} className="flex items-center gap-2">
                        <Checkbox id={industry} />
                        <Label htmlFor={industry} className="text-sm text-muted-foreground cursor-pointer">
                           {industry}
                        </Label>
                     </div>
                  ))}
               </div>
            </div>
         </CardContent>
      </Card>
   )
}

