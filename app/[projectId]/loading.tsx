export default function ProjectLoading() {  // Function name remains unique
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-32 rounded-lg bg-muted" />
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <div className="h-8 w-1/4 rounded bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 rounded bg-muted" />
                  <div className="h-4 rounded bg-muted" />
                  <div className="h-4 w-2/3 rounded bg-muted" />
                </div>
              </div>
              <div className="h-64 rounded-lg bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }