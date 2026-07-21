import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NotePreviewClient from '@/components/NotePreview/NotePreview.client'

type PageProps = {
  params: {
    id: string
  }
}

export default async function NotePreviewPage({ params }: PageProps) {
  const queryClient = new QueryClient()
  const noteId = params.id

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient noteId={noteId} />
    </HydrationBoundary>
  )
}
