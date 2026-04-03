"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  ChevronRight,
} from "lucide-react";

export function DashboardContent() {
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Here&apos;s your mission overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Active Rovers</CardDescription>
            <CardTitle className="flex items-baseline gap-2 text-2xl">
              1,280
              <Label variant="success" className="text-[10px]">
                <TrendingUp className="size-3" />
                +12%
              </Label>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Missions</CardDescription>
            <CardTitle className="flex items-baseline gap-2 text-2xl">
              245.1k
              <Label variant="info" className="text-[10px]">
                <TrendingUp className="size-3" />
                +8.2%
              </Label>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Avg. Response</CardDescription>
            <CardTitle className="flex items-baseline gap-2 text-2xl">
              12.8s
              <Label variant="warning" className="text-[10px]">
                <TrendingDown className="size-3" />
                -3.1%
              </Label>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Uptime</CardDescription>
            <CardTitle className="flex items-baseline gap-2 text-2xl">
              99.9%
              <Label variant="success" className="text-[10px]">
                <Activity className="size-3" />
                stable
              </Label>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Progress section */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>
            Resource utilization across active systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {[
              { label: "CPU Usage", value: 67 },
              { label: "Memory", value: 82 },
              { label: "Storage", value: 45 },
              { label: "Network", value: 91 },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="font-mono text-foreground font-medium">
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest rover mission updates</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View all
            <ChevronRight className="size-3.5" />
          </Button>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rover</TableHead>
              <TableHead>Mission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                rover: "Aurora Scout",
                mission: "Terrain Mapping #482",
                status: "success" as const,
                statusLabel: "Complete",
                duration: "4h 23m",
                location: "Valles Marineris",
              },
              {
                rover: "Meridian Crawler",
                mission: "Sample Collection #295",
                status: "warning" as const,
                statusLabel: "In Progress",
                duration: "1h 47m",
                location: "Olympus Mons",
              },
              {
                rover: "Polaris Probe",
                mission: "Communication Relay #108",
                status: "error" as const,
                statusLabel: "Failed",
                duration: "0h 12m",
                location: "Hellas Basin",
              },
              {
                rover: "Titan Explorer",
                mission: "Geological Survey #721",
                status: "success" as const,
                statusLabel: "Complete",
                duration: "6h 55m",
                location: "Syrtis Major",
              },
              {
                rover: "Nebula Seeker",
                mission: "Atmospheric Analysis #44",
                status: "info" as const,
                statusLabel: "Queued",
                duration: "—",
                location: "Jezero Crater",
              },
            ].map((row) => (
              <TableRow key={row.rover}>
                <TableCell className="font-medium font-mono">
                  {row.rover}
                </TableCell>
                <TableCell>{row.mission}</TableCell>
                <TableCell>
                  <Label variant={row.status}>{row.statusLabel}</Label>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3" />
                    {row.duration}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {row.location}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
