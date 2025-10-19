

import React from "react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import {
  listJobRequirements,
  buildCSRFHeaders,
  type SuccessDataFunc
} from "../ash_rpc"
import type { BaseJobRequirement } from "../types"
import { JOB_REQUIREMENT_FIELDS } from "../types"

// Use mapped types from centralized types file
export type JobRequirement = BaseJobRequirement
export type JobRequirementsData = SuccessDataFunc<typeof listJobRequirements>

// Custom hook for fetching job requirements for a specific job listing
function useJobRequirements(jobListingId: string | null) {
  return useQuery({
    queryKey: ["jobRequirements", jobListingId],
    queryFn: async () => {
      if (!jobListingId) return []

      const headers = buildCSRFHeaders()
      const result = await listJobRequirements({
        fields: JOB_REQUIREMENT_FIELDS,
        filter: { jobListingId: { eq: jobListingId } },
        headers,
      })

      if (!result || !result.success) {
        const errMsg = result && !result.success ? result.errors?.map(e => e.message).join(", ") : "Unknown error"
        throw new Error(errMsg || "Failed to fetch job requirements")
      }

      return result.data || []
    },
    enabled: !!jobListingId,
    retry: 1,
  })
}

// Component to display individual job requirement
function JobRequirementItem({ requirement }: { requirement: JobRequirement }) {
  const titleText = requirement.title || (requirement.requirementText?.split(/[\.\n]/)[0] || "Requirement").slice(0, 80)
  return (
    <li className="list-none">
      <details className="group rounded-md border border-border bg-card/60 px-3 py-2">
        <summary className="flex items-start gap-2 cursor-pointer">
          <span className={`mt-1.5 inline-block h-2 w-2 rounded-full ${requirement.isRequired ? 'bg-destructive' : 'bg-primary'}`} />
          <span className="text-sm font-medium text-foreground">
            {titleText}
          </span>
          <span className={`ml-2 text-xs font-medium ${requirement.isRequired ? 'text-destructive' : 'text-primary'}`}>
            ({requirement.isRequired ? 'Required' : 'Preferred'})
          </span>
        </summary>
        {requirement.requirementText && (
          <div className="mt-2 pl-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{requirement.requirementText}</p>
          </div>
        )}
      </details>
    </li>
  )
}

// Component to display job requirements
export function JobRequirements({ jobListingId }: { jobListingId: string }) {
  const { data: requirements, isLoading, error } = useJobRequirements(jobListingId)

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-destructive text-sm">Failed to load requirements</p>
  }

  if (!requirements || requirements.length === 0) {
    return <p className="text-muted-foreground text-sm">No requirements specified</p>
  }

  const requiredReqs = requirements.filter(req => req.isRequired)
  const preferredReqs = requirements.filter(req => !req.isRequired)

  return (
    <div className="space-y-4">
      {requiredReqs.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-2">Required Qualifications</h4>
          <ul className="space-y-1">
            {requiredReqs.map(req => (
              <JobRequirementItem key={req.id} requirement={req} />
            ))}
          </ul>
        </div>
      )}

      {preferredReqs.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-2">Preferred Qualifications</h4>
          <ul className="space-y-1">
            {preferredReqs.map(req => (
              <JobRequirementItem key={req.id} requirement={req} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
