import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { JobHeader } from "./components/job-header";
import { JobFilters } from "./components/job-filters";
import { AIRecommendations } from "./components/ai-recommendations";
import { JobCard } from "./components/job-card";
import {
  listJobListings,
  buildCSRFHeaders,
} from "./ash_rpc";
import type {
  JobCardData,
  PaginatedResult,
} from "./types";
import {
  transformJobListingToCard,
} from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Custom hook for fetching job listings with pagination
function useJobListings(page: number, pageSize: number = 25): {
  data: PaginatedResult<JobCardData> | undefined;
  isLoading: boolean;
  error: Error | null;
} {
  return useQuery({
    queryKey: ["jobListings", page, pageSize],
    queryFn: async (): Promise<PaginatedResult<JobCardData>> => {
      try {
        console.log("Fetching job listings and requirements separately...");

        // Fetch job listings
        const headers = buildCSRFHeaders();
        const jobListingsResult = await listJobListings({
          fields: [
            "id",
            "jobRoleName",
            "jobDescription",
            "companyId",
            {
              jobRequirements: [
                "id",
                "title",
                "requirementText",
                "isRequired",
                "jobListingId",
              ],
            },
          ],
          headers,
        });
        console.log("Job listings result:", jobListingsResult);

        if (!jobListingsResult || !jobListingsResult.success) {
          console.error("Job listings error:", jobListingsResult?.errors);
          throw new Error(
            jobListingsResult?.errors?.map((e) => e.message).join(", ") ||
              "Failed to fetch job listings",
          );
        }

        // Extract data with proper typing
        const jobListingsData = jobListingsResult.data || [];

        console.log("Job listings data:", jobListingsData);

        // Transform and merge the data
        if (Array.isArray(jobListingsData) && jobListingsData.length > 0) {
          const transformedResults: Array<JobCardData> = jobListingsData.map((job) => {
            const jobRequirements = Array.isArray((job as any).jobRequirements)
              ? (job as any).jobRequirements
              : [];

            return transformJobListingToCard(job as any, jobRequirements as any, undefined);
          });

          return {
            results: transformedResults,
            hasMore: false, // For now, since we're not implementing pagination
            count: transformedResults.length,
          };
        }

        return {
          results: [],
          hasMore: false,
          count: 0,
        };
      } catch (error) {
        console.error("Job listings fetch error:", error);
        throw error;
      }
    },
    retry: 1,
    staleTime: 30000, // 30 seconds
  });
}

// Moved JobRequirements UI into components/job-requirements.tsx

// Deprecated local JobListingCard; replaced by components/JobCard

// Pagination component
function Pagination({
  currentPage,
  totalPages,
  hasMore,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number | null;
  hasMore: boolean;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing page {currentPage} {totalPages && `of ${totalPages}`}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasMore}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Main JobListings component
function JobListings() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const { data, isLoading, error } = useJobListings(currentPage, pageSize);
  console.log("JobListings component - data:", data);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/5 to-background">
        <JobHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 bg-muted rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </div>
            </aside>
            <main className="lg:col-span-3 space-y-6">
              <div className="h-32 bg-muted rounded"></div>
              <div className="grid gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                        <div className="h-4 bg-muted rounded w-4/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/5 to-background">
        <JobHeader />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-destructive/30 bg-destructive/10">
            <CardHeader>
              <CardTitle className="text-destructive">
                Error Loading Job Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive/90">{(error as Error).message}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  console.log("JobListings component - data:", data);
  const totalPages = data?.count ? Math.ceil(data.count / pageSize) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 to-background">
      <JobHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <JobFilters />
          </aside>
          <main className="lg:col-span-3 space-y-6">
            <AIRecommendations />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  {"Matching Jobs"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {data?.count ?? data?.results?.length ?? 0}{" "}
                  {" positions found"}
                </p>
              </div>
              <div className="space-y-4">
                {data &&
                data.results &&
                Array.isArray(data.results) &&
                data.results.length > 0 ? (
                  data.results.map((job) => <JobCard key={job.id} job={job} />)
                ) : (
                  <Card className="text-center py-16">
                    <CardHeader>
                      <CardTitle className="text-2xl text-muted-foreground">
                        No Job Listings Found
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        There are currently no job listings available.
                      </p>
                      <Button onClick={() => window.location.reload()}>
                        Refresh Page
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasMore={!!data?.hasMore}
                onPageChange={setCurrentPage}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// App component with QueryClient provider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JobListings />
    </QueryClientProvider>
  );
}

// Mount the app
const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
