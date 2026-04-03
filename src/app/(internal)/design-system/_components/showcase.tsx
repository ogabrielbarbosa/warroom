"use client";

import { useState } from "react";
import {
  Zap,
  BarChart3,
  MessageSquare,
  Target,
  Grid3X3,
  Settings,
  Sun,
  Moon,
  Bell,
  ChevronRight,
  Download,
  Plus,
  Trash2,
  Edit,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, InputGroup } from "@/components/ui/input";
import { Textarea, TextareaGroup } from "@/components/ui/textarea";
import { Select, SelectGroup } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/tabs";
import { Label, IconLabel } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { SearchBox } from "@/components/ui/search-box";
import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Tooltip } from "@/components/ui/tooltip";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

/* ── Section wrapper ─────────────────────────────────────── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-mono text-xl font-bold text-foreground tracking-tight border-b border-border pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ── Main Showcase ───────────────────────────────────────── */

export function DesignSystemShowcase() {
  const [isDark, setIsDark] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary" />
            <h1 className="font-mono text-lg font-bold tracking-tight">
              lunaris<span className="text-primary">.</span>design
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl space-y-16 px-8 py-12">
        {/* ─── Color Tokens ──────────────────────────────── */}
        <Section title="Color Tokens">
          <SubSection title="Core">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {[
                { name: "Primary", bg: "bg-primary", fg: "text-primary-foreground" },
                { name: "Secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
                { name: "Destructive", bg: "bg-destructive", fg: "text-white" },
                { name: "Background", bg: "bg-background border border-border", fg: "text-foreground" },
                { name: "Card", bg: "bg-card border border-border", fg: "text-card-foreground" },
                { name: "Muted", bg: "bg-muted", fg: "text-muted-foreground" },
              ].map((c) => (
                <div
                  key={c.name}
                  className={`flex h-20 flex-col items-center justify-center rounded-lg ${c.bg}`}
                >
                  <span className={`text-xs font-mono font-medium ${c.fg}`}>
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </SubSection>
          <SubSection title="Semantic">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { name: "Success", bg: "bg-success", fg: "text-success-foreground" },
                { name: "Warning", bg: "bg-warning", fg: "text-warning-foreground" },
                { name: "Error", bg: "bg-error", fg: "text-error-foreground" },
                { name: "Info", bg: "bg-info", fg: "text-info-foreground" },
              ].map((c) => (
                <div
                  key={c.name}
                  className={`flex h-20 flex-col items-center justify-center rounded-lg ${c.bg}`}
                >
                  <span className={`text-xs font-mono font-medium ${c.fg}`}>
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* ─── Typography ────────────────────────────────── */}
        <Section title="Typography">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Font Primary — JetBrains Mono
              </p>
              <p className="font-mono text-3xl font-bold text-foreground">
                The quick brown fox
              </p>
              <p className="font-mono text-lg text-foreground">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Font Secondary — Geist
              </p>
              <p className="font-sans text-3xl font-bold text-foreground">
                The quick brown fox
              </p>
              <p className="font-sans text-lg text-foreground">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
              </p>
            </div>
          </div>
        </Section>

        {/* ─── Buttons ───────────────────────────────────── */}
        <Section title="Buttons">
          <SubSection title="Variants — Normal">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </SubSection>
          <SubSection title="Variants — Large">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default" size="lg">Default</Button>
              <Button variant="secondary" size="lg">Secondary</Button>
              <Button variant="destructive" size="lg">Destructive</Button>
              <Button variant="outline" size="lg">Outline</Button>
              <Button variant="ghost" size="lg">Ghost</Button>
            </div>
          </SubSection>
          <SubSection title="With Icons">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">
                <Download className="size-4" />
                Download
              </Button>
              <Button variant="secondary">
                <Plus className="size-4" />
                Create
              </Button>
              <Button variant="destructive">
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          </SubSection>
          <SubSection title="Icon Buttons">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default" size="icon"><Zap className="size-4" /></Button>
              <Button variant="secondary" size="icon"><Settings className="size-4" /></Button>
              <Button variant="destructive" size="icon"><Trash2 className="size-4" /></Button>
              <Button variant="outline" size="icon"><Edit className="size-4" /></Button>
              <Button variant="ghost" size="icon"><Bell className="size-4" /></Button>
              <Button variant="default" size="icon-lg"><Zap className="size-5" /></Button>
              <Button variant="secondary" size="icon-lg"><Settings className="size-5" /></Button>
            </div>
          </SubSection>
        </Section>

        {/* ─── Inputs ────────────────────────────────────── */}
        <Section title="Inputs">
          <div className="grid gap-6 sm:grid-cols-2">
            <InputGroup label="Username">
              <Input placeholder="Enter your username" />
            </InputGroup>
            <InputGroup label="Email" description="We'll never share your email.">
              <Input type="email" placeholder="you@example.com" state="filled" defaultValue="user@lunaris.dev" />
            </InputGroup>
            <SelectGroup label="Role">
              <Select>
                <option>Select a role...</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </Select>
            </SelectGroup>
            <SelectGroup label="Status">
              <Select state="filled">
                <option>Active</option>
                <option>Inactive</option>
              </Select>
            </SelectGroup>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextareaGroup label="Description">
              <Textarea placeholder="Write something..." />
            </TextareaGroup>
            <TextareaGroup label="Notes">
              <Textarea state="filled" defaultValue="Once upon a time..." />
            </TextareaGroup>
          </div>
          <SubSection title="Search Box">
            <div className="max-w-sm">
              <SearchBox placeholder="Search commands..." />
            </div>
          </SubSection>
          <SubSection title="Input OTP">
            <InputOTPGroup label="Verification Code" description="Enter the 6-digit code sent to your device.">
              <InputOTP length={6} />
            </InputOTPGroup>
          </SubSection>
        </Section>

        {/* ─── Checkbox & Radio & Switch ─────────────────── */}
        <Section title="Selection Controls">
          <div className="grid gap-8 sm:grid-cols-3">
            <SubSection title="Checkbox">
              <div className="flex flex-col gap-3">
                <Checkbox label="Accept terms and conditions" />
                <Checkbox label="Send me notifications" defaultChecked />
                <Checkbox
                  label="Subscribe to newsletter"
                  description="Get weekly updates about new features."
                />
              </div>
            </SubSection>
            <SubSection title="Radio">
              <RadioGroup name="plan">
                <Radio name="plan" value="free" label="Free" description="Basic features included." />
                <Radio name="plan" value="pro" label="Pro" description="Advanced features unlocked." defaultChecked />
                <Radio name="plan" value="enterprise" label="Enterprise" />
              </RadioGroup>
            </SubSection>
            <SubSection title="Switch">
              <div className="flex flex-col gap-4">
                <Switch label="Dark Mode" defaultChecked />
                <Switch label="Notifications" />
                <Switch label="Auto-save" defaultChecked />
              </div>
            </SubSection>
          </div>
        </Section>

        {/* ─── Cards ─────────────────────────────────────── */}
        <Section title="Cards">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Active Rovers</CardTitle>
                <CardDescription>Currently operational fleet count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-foreground">1,280</span>
                  <Label variant="success">+12%</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation AI v2.3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground leading-relaxed">
                  Enhanced obstacle detection and smoother route planning for rocky terrains.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="default" size="sm">
                  <Zap className="size-3.5" />
                  Install
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aurora Scout</CardTitle>
                <CardDescription>SKU: LS-2029</CardDescription>
              </CardHeader>
              <CardFooter className="justify-between">
                <Button variant="secondary" size="sm">
                  <Search className="size-3.5" />
                  Request
                </Button>
                <Label variant="warning">$45.00</Label>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* ─── Alerts ────────────────────────────────────── */}
        <Section title="Alerts">
          <div className="flex flex-col gap-4">
            <Alert variant="info">
              <AlertTitle>System update available</AlertTitle>
              <AlertDescription>
                A new firmware update is ready for your fleet. Schedule installation at your convenience.
              </AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Mission approved</AlertTitle>
              <AlertDescription>
                Your request to rent the Curiosity-X rover has been confirmed. Deployment scheduled for Sol 482.
              </AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Terrain instability detected</AlertTitle>
              <AlertDescription>
                The selected route crosses an area with loose regolith. Proceed with caution or reroute.
              </AlertDescription>
            </Alert>
            <Alert variant="error">
              <AlertTitle>Communication link lost</AlertTitle>
              <AlertDescription>
                Rover telemetry signal interrupted. Check your base antenna alignment or retry connection.
              </AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* ─── Labels & Badges ───────────────────────────── */}
        <Section title="Labels & Badges">
          <SubSection title="Labels">
            <div className="flex flex-wrap items-center gap-3">
              <Label variant="secondary">Secondary</Label>
              <Label variant="success">Success</Label>
              <Label variant="warning">Warning</Label>
              <Label variant="error">Error</Label>
              <Label variant="info">Info</Label>
            </div>
          </SubSection>
          <SubSection title="Icon Labels">
            <div className="flex flex-wrap items-center gap-3">
              <IconLabel variant="secondary" icon={Settings}>Config</IconLabel>
              <IconLabel variant="success" icon={Target}>Active</IconLabel>
              <IconLabel variant="orange" icon={Zap}>Power</IconLabel>
              <IconLabel variant="violet" icon={BarChart3}>Metrics</IconLabel>
            </div>
          </SubSection>
        </Section>

        {/* ─── Avatar ────────────────────────────────────── */}
        <Section title="Avatars">
          <div className="flex items-center gap-4">
            <Avatar size="sm"><AvatarFallback>AB</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback>EF</AvatarFallback></Avatar>
          </div>
        </Section>

        {/* ─── Progress ──────────────────────────────────── */}
        <Section title="Progress">
          <div className="max-w-md space-y-4">
            <Progress value={25} />
            <Progress value={50} />
            <Progress value={75} />
            <Progress value={100} />
          </div>
        </Section>

        {/* ─── Tabs ──────────────────────────────────────── */}
        <Section title="Tabs">
          <Tabs defaultValue="integrations">
            <TabList>
              <TabTrigger value="integrations">Integrations</TabTrigger>
              <TabTrigger value="billing">Billing</TabTrigger>
              <TabTrigger value="profile">Profile</TabTrigger>
              <TabTrigger value="advanced">Advanced</TabTrigger>
            </TabList>
            <TabContent value="integrations">
              <Card>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Manage your connected services and API integrations.
                  </p>
                </CardContent>
              </Card>
            </TabContent>
            <TabContent value="billing">
              <Card>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View and manage your billing information and invoices.
                  </p>
                </CardContent>
              </Card>
            </TabContent>
            <TabContent value="profile">
              <Card>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Update your profile settings and preferences.
                  </p>
                </CardContent>
              </Card>
            </TabContent>
            <TabContent value="advanced">
              <Card>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Advanced configuration and developer settings.
                  </p>
                </CardContent>
              </Card>
            </TabContent>
          </Tabs>
        </Section>

        {/* ─── Accordion ─────────────────────────────────── */}
        <Section title="Accordion">
          <div className="max-w-lg">
            <Accordion>
              <AccordionItem title="What is Lunaris?" defaultOpen>
                Lunaris is a design system built for mission-critical applications —
                featuring a dark-first aesthetic with precise design tokens.
              </AccordionItem>
              <AccordionItem title="How do I customize tokens?">
                All design tokens are defined in globals.css using CSS custom properties.
                Modify the values in :root (light) or .dark (dark mode) sections.
              </AccordionItem>
              <AccordionItem title="Can I add more components?">
                Yes! The component library is fully extensible. Follow the existing patterns
                in src/components/ui/ to add new components.
              </AccordionItem>
            </Accordion>
          </div>
        </Section>

        {/* ─── Breadcrumb ────────────────────────────────── */}
        <Section title="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Content</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem active>
                Metrics
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>

        {/* ─── Pagination ────────────────────────────────── */}
        <Section title="Pagination">
          <Pagination>
            <PaginationPrevious />
            <PaginationItem>1</PaginationItem>
            <PaginationItem active>2</PaginationItem>
            <PaginationItem>3</PaginationItem>
            <PaginationEllipsis />
            <PaginationItem>12</PaginationItem>
            <PaginationNext />
          </Pagination>
        </Section>

        {/* ─── Tooltip ───────────────────────────────────── */}
        <Section title="Tooltip">
          <div className="flex items-center gap-6">
            <Tooltip content="Hello from Lunaris!" />
            <Tooltip content="Another tooltip" />
          </div>
        </Section>

        {/* ─── Table ─────────────────────────────────────── */}
        <Section title="Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rover</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Battery</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Aurora Scout</TableCell>
                <TableCell><Label variant="success">Active</Label></TableCell>
                <TableCell>Valles Marineris</TableCell>
                <TableCell>87%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Meridian Crawler</TableCell>
                <TableCell><Label variant="warning">Standby</Label></TableCell>
                <TableCell>Olympus Mons</TableCell>
                <TableCell>42%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Polaris Probe</TableCell>
                <TableCell><Label variant="error">Offline</Label></TableCell>
                <TableCell>Hellas Basin</TableCell>
                <TableCell>3%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Titan Explorer</TableCell>
                <TableCell><Label variant="success">Active</Label></TableCell>
                <TableCell>Syrtis Major</TableCell>
                <TableCell>95%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* ─── Dialog ────────────────────────────────────── */}
        <Section title="Dialog">
          <div>
            <Button onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogClose onClick={() => setDialogOpen(false)} />
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>
                  Are you sure you want to proceed? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>
                  Continue
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-8 py-6">
          <p className="text-xs text-muted-foreground font-mono">
            lunaris design system — warroom project
          </p>
        </div>
      </footer>
    </div>
  );
}
