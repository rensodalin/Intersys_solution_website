import { createFileRoute } from '@tanstack/react-router'
import { TechnicalTips } from '@/components/TechnicalTips/TechnicalTips'

export const Route = createFileRoute('/technical-tips')({
  component: TechnicalTips,
})
