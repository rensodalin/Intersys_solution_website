import { createFileRoute } from '@tanstack/react-router'
import { Warranty } from '@/components/Warranty/Warranty'

export const Route = createFileRoute('/warranty')({
    component: Warranty,
})
