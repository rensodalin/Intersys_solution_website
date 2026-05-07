import { createFileRoute } from '@tanstack/react-router'
import { CredentialsPage } from '@/components/Certificates/certificates'

export const Route = createFileRoute('/credentials')({
  component: CredentialsPage,
})
