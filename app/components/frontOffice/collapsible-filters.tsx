"use client"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { X, Filter, Search, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductBadge } from "@/app/components/frontOffice/ProductCard"

interface CollapsibleFiltersProps {
  availableBadges: ProductBadge[]
  selectedBadges: string[]
  onBadgeToggle: (badgeId: string) => void
  onClearFilters: () => void
  productCount: number
  searchTerm: string
  onSearchChange: (term: string) => void
}

function CollapsibleFilters({
  availableBadges,
  selectedBadges,
  onBadgeToggle,
  onClearFilters,
  productCount,
  searchTerm,
  onSearchChange,
}: CollapsibleFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Overlay per mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 left-0 z-50 rounded-l-none rounded-r-lg bg-marrone-principale hover:bg-marrone-scuro text-white shadow-lg transition-all duration-300 px-3 py-6"
        size="sm"
      >
        <Filter className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Filtri</span>
        <ChevronRight className={cn("w-4 h-4 ml-1 transition-transform duration-300", isOpen && "rotate-180")} />
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-200 transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-marrone-scuro">Filtri</h2>
              <p className="text-sm text-gray-600">{productCount} prodotti</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-marrone-scuro">Cerca prodotti</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Nome prodotto..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 border-marrone-principale/30 focus:border-marrone-principale"
              />
            </div>
          </div>

          {/* Active Filters */}
          {selectedBadges.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-marrone-scuro">Filtri attivi</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-marrone-principale hover:text-marrone-scuro text-xs"
                >
                  Pulisci tutto
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedBadges.map((badgeId) => {
                  const badge = availableBadges.find((b) => b.id === badgeId)
                  return badge ? (
                    <Badge
                      key={badgeId}
                      variant="default"
                      className="bg-marrone-principale text-white cursor-pointer hover:bg-marrone-scuro transition-colors duration-200 text-xs"
                      onClick={() => onBadgeToggle(badgeId)}
                    >
                      {badge.icon && <span className="mr-1">{badge.icon}</span>}
                      {badge.label}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          )}

          {/* Filter Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-marrone-scuro border-b border-gray-200 pb-2">
              Caratteristiche Prodotto
            </h3>
            <div className="space-y-3">
              {availableBadges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 group">
                  <Checkbox
                    id={badge.id}
                    checked={selectedBadges.includes(badge.id)}
                    onCheckedChange={() => onBadgeToggle(badge.id)}
                    className="border-marrone-principale/50 data-[state=checked]:bg-marrone-principale data-[state=checked]:border-marrone-principale"
                  />
                  <label
                    htmlFor={badge.id}
                    className="text-sm font-medium leading-none cursor-pointer text-gray-700 group-hover:text-marrone-principale transition-colors duration-200 flex items-center"
                  >
                    {badge.icon && <span className="mr-2">{badge.icon}</span>}
                    {badge.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full bg-marrone-principale hover:bg-marrone-scuro text-white"
            >
              Applica Filtri
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CollapsibleFilters
