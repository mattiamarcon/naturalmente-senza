"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { ProductBadge } from "@/app/components/frontOffice/ProductCard"

interface ProductFiltersProps {
  availableBadges: ProductBadge[]
  selectedBadges: string[]
  onBadgeToggle: (badgeId: string) => void
  onClearFilters: () => void
  productCount: number
}

function ProductFilters({
  availableBadges,
  selectedBadges,
  onBadgeToggle,
  onClearFilters,
  productCount,
}: ProductFiltersProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-marrone-scuro">Filtri Prodotti</CardTitle>
          {selectedBadges.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-marrone-principale hover:text-marrone-scuro"
            >
              <X className="w-4 h-4 mr-1" />
              Pulisci
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-600">{productCount} prodotti trovati</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Active filters */}
        {selectedBadges.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-marrone-scuro">Filtri attivi:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedBadges.map((badgeId) => {
                const badge = availableBadges.find((b) => b.id === badgeId)
                return badge ? (
                  <Badge
                    key={badgeId}
                    variant="default"
                    className="bg-marrone-principale text-white cursor-pointer hover:bg-marrone-scuro"
                    onClick={() => onBadgeToggle(badgeId)}
                  >
                    {badge.label}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ) : null
              })}
            </div>
          </div>
        )}

        {/* Filter options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-marrone-scuro">Caratteristiche:</h4>
          <div className="grid gap-3">
            {availableBadges.map((badge) => (
              <div key={badge.id} className="flex items-center space-x-2">
                <Checkbox
                  id={badge.id}
                  checked={selectedBadges.includes(badge.id)}
                  onCheckedChange={() => onBadgeToggle(badge.id)}
                  className="border-marrone-principale data-[state=checked]:bg-marrone-principale"
                />
                <label
                  htmlFor={badge.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-marrone-scuro hover:text-marrone-principale"
                >
                  {badge.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductFilters
