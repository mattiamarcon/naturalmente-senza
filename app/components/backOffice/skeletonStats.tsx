import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Globe, Monitor, Smartphone, Clock, MessageSquare } from "lucide-react"
import React from "react"


// Skeleton per le card delle metriche principali
export const MetricCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-24 bg-gray-200" />
      <Skeleton className="h-4 w-4 rounded bg-gray-200" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-16 mb-2 bg-gray-200" />
      <Skeleton className="h-3 w-20 bg-gray-200" />
    </CardContent>
  </Card>
)

// Skeleton per le card delle statistiche (paesi, OS, dispositivi, browser)
export const StatCardSkeleton = ({ title, icon: Icon }: { title: string; icon?: React.ElementType}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        {Icon ? <Icon className="h-5 w-5 mr-2" /> : <Skeleton className="h-5 w-5 mr-2 rounded bg-gray-200" />}
        {title}
      </CardTitle>
      <Skeleton className="h-4 w-32 bg-gray-200" />
    </CardHeader>
    <CardContent className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <div className="flex items-center space-x-2">
            <Skeleton className="w-20 h-2 rounded-full bg-gray-200" />
            <Skeleton className="h-4 w-12 bg-gray-200" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)

// Skeleton per la sezione durata sessioni
export const SessionDurationSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Clock className="h-5 w-5 mr-2" />
        Durata delle Sessioni
      </CardTitle>
      <CardDescription className="flex items-center">
        Tempo medio di permanenza: <Skeleton className="inline-block h-4 w-16 ml-1 bg-gray-200" />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="text-center space-y-2">
            <Skeleton className="h-8 w-12 mx-auto bg-gray-200" />
            <Skeleton className="h-4 w-16 mx-auto bg-gray-200" />
            <Skeleton className="h-3 w-8 mx-auto bg-gray-200" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Skeleton per la tabella delle recensioni
export const ReviewsTableSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        Gestione Recensioni
      </CardTitle>
      <Skeleton className="h-4 w-64 bg-gray-200" />
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Autore</TableHead>
            <TableHead>Valutazione</TableHead>
            <TableHead>Commento</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead>Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-3 w-32 bg-gray-200" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 bg-gray-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40 bg-gray-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 bg-gray-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8 rounded bg-gray-200"  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

// Componente principale per tutti gli skeleton della dashboard
export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Skeleton per i tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <Skeleton className="h-9 w-20 rounded-md bg-gray-200" />
          <Skeleton className="h-9 w-20 rounded-md bg-gray-200" />
        </div>

        {/* Skeleton per metriche principali */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </div>

        {/* Skeleton per grafici e statistiche */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatCardSkeleton title="Paesi" icon={Globe} />
          <StatCardSkeleton title="Sistemi Operativi" icon={Monitor} />
          <StatCardSkeleton title="Dispositivi" icon={Smartphone} />
          <StatCardSkeleton title="Browser" icon={Globe} />
        </div>

        {/* Skeleton per durata sessioni */}
        <SessionDurationSkeleton />
      </div>
    </div>
  </div>
)

// Skeleton per la sezione recensioni
export const ReviewsSkeleton = () => (
  <div className="min-h-screen bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Skeleton per i tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <Skeleton className="h-9 w-20 rounded-md bg-gray-200" />
          <Skeleton className="h-9 w-20 rounded-md bg-gray-200" />
        </div>

        <ReviewsTableSkeleton />
      </div>
    </div>
  </div>
)
